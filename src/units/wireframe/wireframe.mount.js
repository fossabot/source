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
import './wireframe.grid.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicMount extends LitElement {
  static get properties() {
    return {
      layout: {
        type: Object, value: { }
      },
    };
  }

  render() {
    return html`
      <style>
        ${css.include('applic::bar')}

        :host {
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')}

          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1);
          overflow: hidden; }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host(:not([startup])) [hide-on-startup] { opacity: 1; transition: opacity 120ms 20ms cubic-bezier(0.4, 0.0, 1, 1); }
        :host([startup]) [hide-on-startup] { opacity: 0; transition: opacity 0ms 0ms;  }

        ._sheet-wrap {
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--horizontal')}
          ${this.css.apply('--layout--flex')}   } 

        applic-side-side {  }

        ._body-wrap {
          z-index: 0;
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')} 
          ${this.css.apply('--layout--flex')} } 

        ._side-sheet { 
          --side-sheet--width: 320px;
          z-index: 4; }
        ._body-side-sheet {  
          --side-sheet--width: 280px; }
     

        ._body-main {  
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')} 
          ${this.css.apply('--layout--flex--none')} 

          height: 100%;
          width: 100%;
        } 

        ._body-header {
          z-index: 3;
          
          margin: -60px -30px 0 -30px;
          padding: 60px 30px 0 30px;

          border-bottom: 1px solid #d6d6d6;
          background: #fafafa; }

      </style>

      <div class="_sheet-wrap">
        <applic-side-sheet class="_side-sheet" align="start"
          ?persistent="${this.layout.breakpoint >= 3}">
          ${this.model('wireframe-sheet:nav')}
        </applic-side-sheet>
   
        <div class="_body-wrap">
          <div class="_body-header applic bar">
            <div class="applic bar-row">
              <div class="applic bar-section align-start">

                <applic-icon-button icon="notes">
                  <applic-hint>Toggle navigation</applic-hint>
                </applic-icon-button>

              </div>
            </div>
          </div>

          <div class="_sheet-wrap">
            <div class="_body-main">
              <applic-scrollable class="_body-inner">
                ${this.model('wireframe-main:inner')}
              </applic-scrollable>
            </div>

            <applic-side-sheet class="_body-side-sheet" align="end"
              ?persistent="${this.layout.breakpoint >= 2}">              
              <applic-scrollable class="_body-aside">
                ${this.model('wireframe-main:aside')}
              </applic-scrollable>
            </applic-side-sheet>

          </div>
        </div>
      </div>


      ${this.model('wireframe-overlay:dev')}

    `;
  }

  constructor() {
    super();

    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');

    this.section = [];
    this.graphic = [];

    applic.on('applic:updated', this._update.bind(this))

    self.addEventListener('resize', this._resize.bind(this), { passive: true });
    this._resize(); 
  }

  _resize() {
    const _breakpoint = (() => {
      const _width = self.innerWidth;
      let _size = 0;

      if (_width > 480) _size++;
      if (_width > 720) _size++;
      if (_width > 1320) _size++;

      return _size;
    })();

    if (!this.layout || this.layout.breakpoint != _breakpoint) {
      this.layout = { breakpoint: _breakpoint };
    };
    
  };

 


  firstUpdated() {
    applic.utils.buffer(() => { 
      this.removeAttribute('startup'); 
      this.removeAttribute('unresolved');
    });

    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);
  }

  updated() {
    // console.log(this.layout)
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
