/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { exec as cpExec } from 'node:child_process';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { execCmd } from '../..';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch-np', 'switch.switchOff');

export default class SwitchSwitchOff extends SfCommand<void> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    package: Flags.file({
      summary: messages.getMessage('flags.package.summary'), // <- use flags.package.summary
      char: 'x',
      required: true,
      exists: true,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(SwitchSwitchOff);

    await this.deactivate();
    const deployCommand = `sf project deploy start --manifest ${flags.package}`;
    const result = await execCmd(deployCommand, { async: true });
    this.log(result.shellOutput);
  }

  private async runSerial(cmds: string[]): Promise<void> {
    for (const c of cmds) {
      // eslint-disable-next-line no-await-in-loop
      await this.sh(c);
    }
  }

  private async deactivate(): Promise<void> {
    const sedInPlace = "sed -i ''";
    // deactivate trigger
    const cmds: string[] = [
      // Triggers: <status>Active</status> -> <status>Inactive</status>
      `find . -type f -name "*.trigger-meta.xml" -exec ${sedInPlace} 's/<status>Active<\\/status>/<status>Inactive<\\/status>/g' {} +`,
      // Flow Definitions: <activeVersionNumber>n</activeVersionNumber> -> 0
      `find . -type f -name "*.flowDefinition-meta.xml" -exec ${sedInPlace} 's/<activeVersionNumber>[0-9]*<\\/activeVersionNumber>/<activeVersionNumber>0<\\/activeVersionNumber>/g' {} +`,
      // Validation Rules: <active>true</active> -> false
      `find . -type f -name "*.validationRule-meta.xml" -exec ${sedInPlace} 's/<active>true<\\/active>/<active>false<\\/active>/g' {} +`,
      // Workflow Rules: <active>true</active> -> false
      `find . -type f -name "*.workflow-meta.xml" -exec ${sedInPlace} 's/<active>true<\\/active>/<active>false<\\/active>/g' {} +`,
    ];

    await this.runSerial(cmds);
    this.log(
      'All Active statuses switched to Inactive and all true values of the <active> tag switched to false in XML files',
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private async sh(cmd: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      cpExec(cmd, { maxBuffer: 2097152 }, (err, stdout, stderr) => {
        if (err) {
          reject({ err });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
}
