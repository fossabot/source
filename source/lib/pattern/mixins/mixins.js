/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {mixins as typo} from './typography/typography.js';
import {mixins as icon} from './typography/iconography.js';

import {mixins as elevation} from './wireframe/elevation.js';
import {mixins as layout} from './wireframe/layout.js';
import {mixins as stance} from './wireframe/stance.js';

const cssMixins = {};
const addMixins = (object, template) => {
  if (!object) return object;
  Object.keys(object).map((nonce) => {
    cssMixins[nonce] = object[nonce];
  });
};

addMixins(typo);
addMixins(icon);

addMixins(elevation);
addMixins(layout);
addMixins(stance);

export {cssMixins};
