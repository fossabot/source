/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {ApplicCloud} from './applic-cloud.js';

import {dropHandler} from './applic-drop-handler.js';
import {stateHandler} from './applic-state-handler.js';
import {storageHandler} from './applic-storeage-handler.js';

export class ApplicBehaviour {
  constructor() {
    this.dH = new dropHandler();
    this.sH = new stateHandler();
    this.storage = new storageHandler();

    applic.cloudManager = new ApplicCloud();
    applic.user = actionHandler.bind(this);
  }
}

function actionHandler(nonce) {
  switch (nonce) {
    case 'edit:show':
      applic.set('state.view', 'edit');
      break;
    case 'grid:show':
      applic.set('state.view', 'grid');
      break;

    case 'edit:close':
    case 'grid:close':
      applic.set('state.view', 'thumbnail');
      break;

    case 'dropbox:oauth2':
      applic.cloudManager.oauth2();
      break;
    case 'dropbox:revoke':
      applic.cloudManager.revoke();
      break;
  }
}


