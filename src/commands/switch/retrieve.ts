/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { setTimeout } from 'node:timers/promises';
import { Messages } from '@salesforce/core';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { execCmd } from '../..';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch-np', 'switch.retrieve');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class SwitchRetrieve extends SfCommand<void> {
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

  public static readonly requiresProject = true;
  public static requiresUsername = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(): Promise<void> {
    await execCmd('sf org display user', { async: true });
    const { flags } = await this.parse(SwitchRetrieve);

    const result = await execCmd(`sf project retrieve start --manifest ${flags.package}`, { async: true });
    this.log(result.shellOutput);

    await setTimeout(3000);

    await execCmd('git add .', { async: true });
    this.log('git add .');

    await setTimeout(1000);

    await execCmd('git add -A', { async: true });
    const status = await execCmd('git diff --cached --quiet || echo CHANGES', { async: true });

    if (status.shellOutput.includes('CHANGES')) {
      await execCmd('git commit -m "initial state"', { async: true });
      this.log('git commit -m "initial state"');
    } else {
      this.log('No changes to commit.');
    }

    if (!result.jsonOutput) this.log(result.shellOutput);
  }
}
