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
        <template>
          <div section-nonce$="[[node.nonce]]">
            [[node.nonce]]
            <button on-click="selectSection">select</button>
            <button on-click="removeSection">remove</button>
          </div>
        </template>
      </dom-repeat>

      <h4>graphic</h4>
      <dom-repeat items="{{graphic}}" as="node">
        <template>
          <div graphic-nonce$="[[node.nonce]]">
            <span>[[node.blob]]</span>
            <img src$="[[node.uri]]">
            <button on-click="removeGraphic">remove</button>
            <br>
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

  selectSection(_event) {
    applic.call('section:show', {
      nonce: this._findAttribute(_event.target, 'section-nonce')
    })
  }
  removeSection(_event) {
    applic.call('section:remove', {
      nonce: this._findAttribute(_event.target, 'section-nonce')
    })
  }
  removeGraphic(_event) {
    applic.call('graphic:remove', {
      nonce: this._findAttribute(_event.target, 'graphic-nonce')
    })
  }

  _findAttribute(_node, _attribute) {
    while(_node) {
      if (_node.hasAttribute(_attribute)) break;
      _node = _node.parentElement;
    };
    return _node ? _node.getAttribute(_attribute) : null;
  }


  _update() {
    if (this._render) return;
    this._render = true;

    applic.utils.buffer(() => {
      this._set('section', applic.section.get('*'))
      this._set('graphic', applic.graphic.get('*'))


      // console.log('applic-wireframe:mount-update')

      this._render = false;
    });
  }

  _set(_path, _value) {
    this.set(_path, null)
    Promise.resolve().then(this.set.bind(this, _path, _value) )
  }

}

self.customElements.define('applic-mount', ApplicMount);