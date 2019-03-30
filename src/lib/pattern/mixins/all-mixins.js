/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import {mixins as typo} from './mixin.typography.js';
import {mixins as elevation} from './mixin.elevation.js';
import {mixins as layout} from './mixin.layout.js';
import {mixins as stance} from './mixin.stance.js';

const cssMixins = {};
const addMixins = (object, template) => {
  if (!object) return object;
  Object.keys(object).map((nonce) => {
    cssMixins[nonce] = object[nonce];
  });
};

addMixins(typo);
addMixins(elevation);
addMixins(layout);
addMixins(stance);

export {cssMixins};
