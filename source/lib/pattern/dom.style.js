/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { cssMixins } from './css-mixins/all-mixins.js';
import { cssModules } from './css-modules/all-modules.js';

const _getMixin = (_nonce) => {
  if (!cssMixins[_nonce]) return `/* ${_nonce} is not defined */`
  else return cssMixins[_nonce](css)
    .replace(/\s{2,}/g, ' ');
};

const _getModule = (_nonce) => {
  if (!cssModules[_nonce]) return `/* ${_nonce} is not defined */`
  else return cssModules[_nonce](css)
    .replace(/\s{2,}/g, ' ');
};

export const css = { apply: _getMixin, include: _getModule}
