/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import './lib/utils/applic.utils.js'
import './lib/utils/applic.polyfill.js'

import './units/applic-event.js'
// import './units/applic-state.js'

import './lib/elements/all-elements.js'
import './units/wireframe/wireframe.mount.js'

// applic.utils.buffer(async () => {
//    await import('./applic.js');
//    await import('./applic.lazies.js');
// })

applic.$ = document.querySelector('applic-mount');
