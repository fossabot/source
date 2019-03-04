/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {modules as typo} from './typography/typography.js';
import {modules as button} from './wireframe/applic-button.js';
import {modules as icon} from './wireframe/applic-icon.js';
import {modules as bar} from './wireframe/applic-bar.js';
import {modules as backdrop} from './wireframe/applic-backdrop.js';
import {modules as outline} from './wireframe/applic-outline.js';
import {modules as overline} from './wireframe/applic-overline.js';

const cssModules = {};
const addModules = (object, template) => {
  if (!object) return object;
  Object.keys(object).map((nonce) => {
    cssModules[nonce] = object[nonce];
  });
};

addModules(typo);
addModules(button);
addModules(icon);
addModules(bar);
addModules(backdrop);
addModules(outline);
addModules(overline);

export {cssModules};
