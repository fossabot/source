/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { cssMixins } from '../../lib/pattern/mixins/all-mixins.js';
import { cssModules } from '../../lib/pattern/modules/all-modules.js';

const _getMixin = (_nonce) => {
  const _temp = document.createElement('template');

  _temp.innerHTML = (() => {
    if (!cssMixins[_nonce]) return `/* ${_nonce} is not defined */`
    else return cssMixins[_nonce](css)
    .replace(/\s{2,}/g, ' ');
  })()

  return _temp;
};

const _getModule = (_nonce) => {
  const _temp = document.createElement('template');

  _temp.innerHTML = (() => {
    if (!cssModules[_nonce]) return `/* ${_nonce} is not defined */`
    else return cssModules[_nonce](css)
      .replace(/\s{2,}/g, ' ');
  })()

  return _temp;
};

self.css = { apply: _getMixin, include: _getModule }
