/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

setPassiveTouchGestures(true);
setRootPath(applic.rootPath);

class ApplicMount extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

      </style>

    `;
  }

  constructor() {
    super();

    applic.on('applic:updated', this._update.bind(this))
  }

  static get properties() {
    return { };
  }

  static get observers() {
    return [ ];
  }

  _update() {
    console.log('_update')
  }

}

self.customElements.define('applic-mount', ApplicMount);