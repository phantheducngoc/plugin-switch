/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { execCmd } from '../..';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-switch', 'switch.retrieve');

export type SwitchRetrieveResult = {
  path: string;
};

export default class SwitchRetrieve extends SfCommand<SwitchRetrieveResult> {
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

  public async run(): Promise<SwitchRetrieveResult> {
    await execCmd('sf org display user', { async: true });
    const { flags } = await this.parse(SwitchRetrieve);
    this.log(flags.package);
    await execCmd(`sf project retrieve start --manifest ${flags.package}`, { async: true });
    setTimeout(() => {
      this.log('delay');
    }, 3000);
    await execCmd('git add .', { async: true });

    return {
      path: '/Users/ngocphan/salesforce-plugins/plugin-switch/src/commands/switch/retrieve.ts',
    };
  }
}
