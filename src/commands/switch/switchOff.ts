/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as process from 'child_process';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { execCmd } from '../..';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch', 'switchOff');

export type SwitchSwitchOffResult = {
  path: string;
};

export default class SwitchSwitchOff extends SfCommand<SwitchSwitchOffResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    package: Flags.string({
      summary: messages.getMessage('description'),
      char: 'x',
      required: true,
      exists: true,
    }),
  };

  public async deactivate(): Promise<void> {
    // deactivate trigger
    const switchCommand1 =
      "find . -type f -name \"*.trigger-meta.xml\" -exec sed -i '' 's/<status>Active<\\/status>/<status>Inactive<\\/status>/g' {} +";
    // deactiivate flow, process builder
    const switchCommand2 =
      "find . -type f -name \"*.flowDefinition-meta.xml\" -exec sed -i '' 's/<activeVersionNumber>[0-9]*<\\/activeVersionNumber>/<activeVersionNumber>0<\\/activeVersionNumber>/g' {} +";

    // deactivate validatiion rule
    const switchCommand3 =
      "find . -type f -name \"*.validationRule-meta.xml\" -exec sed -i '' 's/<active>true<\\/active>/<active>false<\\/active>/g' {} +";
    // deactivate workflow rule
    const switchCommand4 =
      "find . -type f -name \"*.workflow-meta.xml\" -exec sed -i '' 's/<active>true<\\/active>/<active>false<\\/active>/g' {} +";

    await this.sh(switchCommand1);
    await this.sh(switchCommand2);
    await this.sh(switchCommand3);
    await this.sh(switchCommand4);
    this.log(
      'All Active statuses switched to Inactive and all true values of the <active> tag switched to false in XML files'
    );
  }

  public async run(): Promise<SwitchSwitchOffResult> {
    const { flags } = await this.parse(SwitchSwitchOff);

    await this.deactivate();
    const deployCommand = `sf project deploy start --manifest ${flags.package}`;
    await execCmd(deployCommand, { async: true });

    return {
      path: '/Users/ngocphan/salesforce-plugins/plugin-switch/src/commands/switch/switchOff.ts',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private async sh(cmd: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      process.exec(cmd, { maxBuffer: 2097152 }, (err, stdout, stderr) => {
        if (err) {
          reject({ err });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
}
