/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { module as bar } from './module.bar.js';

const cssModules = {};
const addModules = (object, template) => {
  if (!object) return object;
  Object.keys(object).map((nonce) => {
    cssModules[nonce] = object[nonce];
  });
};

addModules(bar);

export { cssModules };
