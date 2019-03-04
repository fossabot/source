/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {cssModules} from './modules/modules.js';
import {cssMixins} from './mixins/mixins.js';

self.css = {};
self.css.include = (cssNonce) => {
  const cls = cssModules[cssNonce];
  return cls ? cls().replace(/\s+/g, ' ') : '';
};

self.css.apply = (cssNonce) => {
  const mix = cssMixins[cssNonce];
  return mix ? mix().replace(/\s+/g, ' ') : '';
};
