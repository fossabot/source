/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import './utils/applic.polyfill.js';

import { applicUtils } from './utils/applic.utils.js';

import { ApplicState } from './essentials/essential.state.js'
import { ApplicStore } from './essentials/essential.store.js'
import { ApplicEvent } from './essentials/essential.event.js'

import { ApplicLocalization } from './essentials/pwa.localization.js'
import { ApplicServiceWorkers } from './essentials/pwa.service-workers.js'
import { ApplicAdd2HomeScreen } from './essentials/pwa.add2-homescreen.js'

self.applic = new class {
  audit() { console.info(...arguments); }
  debug() { console.debug(...arguments); }
  validated() { return !this.store.get('applic:validated').pending; }
  path(path) { return `${applic.location.rootPath.replace(/\/$/, "")}${path}`; }
  devlop() { return -1 != self.location.href.indexOf('localhost'); }
};

applic.__proto__.utils = applicUtils;

applic.utils.object.concat(applic.__proto__, {
  created: Date.now(),
  rendered: false,

  location: { 
    rootPath: applic.devlop() ? './' : '/nightly/' 
  },

  localization: {
    indexPath: '/resources/lang/localize-index.json' 
  }

});

applic.utils.object.concat(applic.__proto__, {
  essentials: {
    event: new ApplicEvent(),
    state: new ApplicState(),
    store: new ApplicStore()
  }

});

applic.utils.object.concat(applic.__proto__, {
  on: applic.essentials.event.on,
  dispatch: applic.essentials.event.dispatch,

  state: {
    get: applic.essentials.state.get,
    set: applic.essentials.state.set
  },

  store: {
    get: applic.essentials.store.get,
    set: applic.essentials.store.set
  }

});

applic.utils.object.concat(applic.__proto__, {
  pwa: {
    localize: new ApplicLocalization(),
    sw: new ApplicServiceWorkers(),
    a2hs: new ApplicAdd2HomeScreen()
  }

});

applic.utils.object.concat(applic.__proto__, {
  localize: applic.pwa.localize.get.bind(applic.pwa.localize),
  request: (nonce, params) => {
    return applic.dispatch.bind(null, nonce, params)
  }
});

requestAnimationFrame(() => {
  applic.__proto__.rendered = true;
})
