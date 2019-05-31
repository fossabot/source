/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import './units/behaviour/applic.behaviour.js';

import './lib/utils/applic.utils.js';
import './lib/utils/applic.polyfill.js';

import './units/applic-event.js';
import './units/applic-state.js';
import './units/applic-location.js';
import './units/applic-a2hs.js';

import './applic.wireframe.js';

applic.validated = () => {
  return !applic.state.get('applic:validated').pending;
}

applic.state.set('applic:validated', { pending: true });
applic.state.set('local:cache', {});
applic.state.set('local:preferences', {
  'view': 'all'
});

applic.state.keep('applic:validated');
applic.state.keep('local:preferences');
applic.state.keep('local:cache');
applic.state.clean();


console.info('applic:loaded', `${Date.now() - applic.created}ms`);

Promise.resolve().then(async () => {
  await import('./applic.lazies.js');
});