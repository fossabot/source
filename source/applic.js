/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

console.info('applic:loaded', `${Date.now() - applic.created}ms`);
Promise.resolve().then(import('./applic.lazies.js'));

const init = () => {
  applic.instance = new class {
    constructor() {
      // console.info('applic:ready', `${Date.now() - applic.created}ms`);
      applic.$.link();
    }
  };
};

if (!!applic.$) init();
else self.addEvent('applic-wireframe:ready', init);
