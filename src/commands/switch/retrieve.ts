/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { setTimeout } from 'timers/promises';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { execCmd,ExecCmdResult } from '../..';


Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch-np', 'switch.retrieve');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class SwitchRetrieve extends SfCommand<ExecCmdResult<any>> {
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

  public static readonly requiresProject = true;
  public static requiresUsername = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(): Promise<ExecCmdResult<any>> {
    await execCmd('sf org display user', { async: true });
    const { flags } = await this.parse(SwitchRetrieve);

    const result = await execCmd(`sf project retrieve start --manifest ${flags.package}`, { async: true });
    this.log(result.shellOutput);

    await setTimeout(3000);

    await execCmd('git add .', { async: true });
    this.log('git add .');

    await setTimeout(1000);

    await execCmd('git commit -m "initial state"', { async: true});
    this.log('git commit -m "original state"');

    return result;
  }
}


