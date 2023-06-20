/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { expect, test } from '@oclif/test';

describe('sf switch switchOff', () => {
  test
    .stdout()
    .command(['sf switch switchOff', '--package', 'manifest/package.xml'])
    .it('sf switch switchOff --package manifest/package.xml', (ctx) => {
      expect(ctx.stdout).to.contain('hello manifest/package.xml');
    });
});
