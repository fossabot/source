/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

import { model } from './model/all-models.js';
import { css } from './wireframe.style.js'

class ApplicMount extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')}

          ${this.css.apply('--layout--vertical')}
          
        }

      </style>

      ${this.model('wireframe:body')}
    `;
  }

  constructor() {
    super();

    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };


    this.section = [];
    this.graphic = [];

    applic.on('applic:updated', this._update.bind(this))
  }

  firstUpdated() { }


  call(_type, _params) {
    return () => {
      switch (_type) {
        case 'section:select':
          applic.section.select(_params.nonce)
          break;
        case 'section:remove':
          applic.section.remove(_params.nonce)
          break;
        case 'section:create':
          applic.section.create()
          break;

        case 'graphic:remove':
          applic.graphic.remove(_params.nonce)
          break;

      }
    }
  };

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
    this[_path] = _value;
    this.requestUpdate();
    // this.set(_path, null)
    // Promise.resolve().then(this.set.bind(this, _path, _value))
  }

}

customElements.define('applic-mount', ApplicMount);
