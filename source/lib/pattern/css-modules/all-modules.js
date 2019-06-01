/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { module as bar } from './style-module.bar.js';
import { module as button } from './style-module.button.js';

const cssModules = {};
const addModules = (object, template) => {
  if (!object) return object;
  Object.keys(object).map((nonce) => {
    cssModules[nonce] = object[nonce];
  });
};

addModules(bar);
addModules(button);

export { cssModules };
