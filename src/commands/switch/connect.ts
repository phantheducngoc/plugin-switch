/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, AuthInfo, Connection } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('plugin-switch-np', 'switch.connect');

export default class ConnectOrg extends SfCommand<void> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    username: Flags.string({
      summary: this.summary,
      char: 'u',
      required: true,
    }),
  };

  public async run(): Promise<void> {
    // parse the provided flags
    const { flags } = await this.parse(ConnectOrg);

    this.log(`Connecting to ${flags.username}...`);

    // Initialize the authorization for the provided username
    const authInfo = await AuthInfo.create({ username: flags.username });

    // Create a connection to the org
    const connection = await Connection.create({ authInfo });
    this.log(`Connected to ${flags.username} (${authInfo.getFields().orgId}) with API version ${connection.version}`);
    this.log(`${authInfo.getFields().instanceUrl}`);
  }
}
