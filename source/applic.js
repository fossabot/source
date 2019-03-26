/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import './lib/utils/applic.utils.js'
import './lib/utils/applic.polyfill.js'

import './units/applic-event.js'
import './units/applic-state.js'

import './units/behaviour/applic.behaviour.js'
// is lazy // import './units/processing/applic.processing.js'

console.info('applic:loaded', `${Date.now() - applic.created}ms`);

new class {
  constructor() {
    applic.dispatch('applic:init');

    console.debug('applic:ready', `${Date.now() - applic.created}ms`);


    applic.dispatch('applic:ready');

    if (applic.$) { applic.$.link() }
    else setTimeout(applic.$.link, 200);
  }

};
