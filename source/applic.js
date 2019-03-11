/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import './lib/utils/polyfill.js'

console.info('applic:loaded', `${Date.now() - applic.created}ms`);

const init = () => {
  applic.instance = new class {
    constructor() {
      console.debug('applic:ready', `${Date.now() - applic.created}ms`);

      Promise.resolve().then(() => {
        applic.$.link();
      });
    }
  };
};


if (!!applic.$) init();
else self.addEventListener('applic-wireframe:ready', init);
