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

import './wireframe.graphic.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicMount extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')}

          ${this.css.apply('--layout--vertical')}

          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1);
        }

        :host([unresolved]) {
          opacity: 0; 
          transition: opacity 0ms 0ms;
        } 

        ._sheet-wrap {
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--horizontal')}

          height: 100%;
          width: 100%; } 

        ._sheet-wrap applic-side-side { z-index: 1; }

        ._body-wrap {
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--vertical')} 
          ${this.css.apply('--layout--flex')} } 

      </style>

      <div class="_sheet-wrap">
        <applic-side-sheet open persistent>
          ${this.model('wireframe:sheet-aside')}
        </applic-side-sheet>

        <div class="_body-wrap">
          ${this.model('wireframe:body')}
        </div>
      </div>


    `;
  }

  constructor() {
    super();

    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) {
      this.setAttribute('unresolved', '')
    }

    this.section = [];
    this.graphic = [];

    applic.on('applic:updated', this._update.bind(this))
  }

  firstUpdated() {
    if (this.hasAttribute('unresolved')) applic.utils.buffer(() =>{
      this.removeAttribute('unresolved');

    });

    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);
  }


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
