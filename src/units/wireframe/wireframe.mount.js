/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';

import { model } from './model/all-models.js';

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
       ${model('wireframe:mount')}
      ${model('wireframe:body')}
    `
  }

  constructor() {
    super();

    applic.on('applic:updated', this._update.bind(this))
  }

  _selectSection(_event) {
    applic.call('section:show', {
      nonce: this._findAttribute(_event.target, 'section-nonce')
    })
  }
  _removeSection(_event) {
    applic.call('section:remove', {
      nonce: this._findAttribute(_event.target, 'section-nonce')
    })
  }
  _removeGraphic(_event) {
    applic.call('graphic:remove', {
      nonce: this._findAttribute(_event.target, 'graphic-nonce')
    })
  }

  _findAttribute(_node, _attribute) {
    while (_node) {
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

      // for (const _map of this.shadowRoot.querySelectorAll('dom-repeat')) {
      //   if (_map.render) _map.render()
      // }
      // console.log('applic-wireframe:mount-update')

      this._render = false;
    });

  }

  _set(_path, _value) {
    this.set(_path, null)
    Promise.resolve().then(this.set.bind(this, _path, _value))
  }

}

self.customElements.define('applic-mount', ApplicMount);