/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { expect, test } from '@oclif/test';

describe('sf switch retrieve', () => {
  test
    .stdout()
    .command(['sf switch retrieve', '--package', 'manifest/package.xml'])
    .it('sf switch retrieve --package manifest/package.xml', (ctx) => {
      expect(ctx.stdout).to.contain('manifest/package.xml');
    });
});
