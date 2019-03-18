/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import './lib/utils/polyfill.js'

import './units/applic-event.js'
import './units/applic-state.js'

import './units/behaviour/applic.behaviour.js'
// lazy // import './units/processing/applic.processing.js'

console.info('applic:loaded', `${Date.now() - applic.created}ms`);

new class {
  constructor() {
    if (!!applic.$) this._init();
    else self.addEventListener('applic-wireframe:ready', this._init.bind(this));
  }

  _init() {
    applic.dispatch('applic:init');
    
    Promise.resolve().then(() => {

      console.debug('applic:ready', `${Date.now() - applic.created}ms`);
      
      applic.$.link();
      applic.dispatch('applic:ready');
    });
  }

};

applic.__proto__.nonce = () => {
  let nonce = ''; const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 24; i++) {
    nonce += s.charAt(Math.floor(Math.random() * s.length));
  };
  return nonce;
};
