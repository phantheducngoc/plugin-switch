/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { execCmd,ExecCmdResult } from '../..';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch-np', 'switch.switchOn');

export default class SwitchSwitchOn extends SfCommand<ExecCmdResult<any>> {
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

  public async run(): Promise<ExecCmdResult<any>> {
    const { flags } = await this.parse(SwitchSwitchOn);

    this.log('git restore .');
    await execCmd('git restore .', { async: true });

    const deployCommand = `sf project deploy start --manifest ${flags.package}`;
    const result = await execCmd(deployCommand, { async: true });
    this.log(result.shellOutput);
    return result;
  }
}
