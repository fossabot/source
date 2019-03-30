/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';

setPassiveTouchGestures(true);
setRootPath(applic.rootPath);

class ApplicMount extends PolymerElement {
  static get properties() {
    return {
      section: Array,
      graphic: Array,
    };
  }

  static get observers() {
    return [];
  }

  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

      </style>

      <h4>section</h4>
      <dom-repeat items="{{section}}" as="node">
        <template><button>[[node.nonce]]</button></template>
      </dom-repeat>

      <h4>graphic</h4>
      <dom-repeat items="{{graphic}}" as="node">
        <template>
          <div>
            [[node.nonce]]
          </div>
        </template>
      </dom-repeat>

    `;
  }

  constructor() {
    super();

    applic.on('applic:updated', this._update.bind(this))
  }



  _update() {
    this.section = applic.section.get('*');
    this.graphic = applic.graphic.get('*');

    console.log(this.graphic)
    // console.log('applic-wireframe:mount-update')
  }

}

self.customElements.define('applic-mount', ApplicMount);