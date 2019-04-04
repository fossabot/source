/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { model as mainAside } from './model.main-aside.js';
import { model as mainInner } from './model.main-inner.js';
import { model as navAside } from './model.sheet-aside.js';

import { model as devOverlay } from './model.dev-overlay.js';

export const model = {
   'wireframe-main:aside': mainAside,
   'wireframe-main:inner': mainInner,
   'wireframe-sheet:nav': navAside,

   'wireframe-overlay:dev': devOverlay,
};
