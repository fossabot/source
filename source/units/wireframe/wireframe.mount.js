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

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicMount extends LitElement {
  static get properties() {
    return {
      layout: {
        type: Object, value: {}
      },
    };
  }

  render() {
    return html`
      <style>
        ${css.include('applic::bar')}

        :host {
          --applic-line--width: 1px;
          --applic-line--color: rgba(0,0,0,.12);
          --applic-line: var(--applic-line--width) solid var(--applic-line--color);
          --applic-line--none: 0px solid var(--applic-line--color);
        }

        :host {
          ${css.apply('--stance--fixed')}
          ${css.apply('--stance--fit')}
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--horizontal')}
  
          ${css.apply('--typo--noselect')}

          background: #2C2F33;
          margin: 28px 0px 0px 0px;

          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1);
          overflow: hidden; }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }

        ._applic-body {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex')}

          background: #fff;
          border-radius: ${!!applic.a2hs.active ? '4px 0px 0px 0px': '0px'};
          overflow: hidden;
        }


        ._applic-body-inner {
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex')}
        }

        ._applic-banner {
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex--none')}
        }
        
      </style>


      ${this.model('wireframe:toolbar')}
      ${this.model('wireframe:navigation')}

      <div class="_applic-body">
        <div class="_applic-banner applic bar">
          <div class="applic bar-row dense">
            <div class="applic bar-section align-start">
            
            </div>
            <div class="applic bar-section align-end">
              <button>tune</button>
            </div>

          </div>
        </div>

        <div class="_applic-body-inner">

        </div>

      </div>

      </div>


    `;
  }

  constructor() {
    super();

    this._options = {
      navigation: {
        hide: false
      }

    }

    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');

    this._selected = [];

    // applic.on('applic:updated', this.requestUpdate.bind(this))
    applic.on('applic:updated', this._update.bind(this))

    self.addEventListener('resize', this._resize.bind(this), { passive: true });
    this._resize();
  }

  _resize() {
    const _width = self.innerWidth;
    _width < 620 ?
      this.setAttribute('dense', '') :
      this.removeAttribute('dense');
  };

  _update() {

  }

  firstUpdated() {
    applic.utils.buffer(() => {
      this.removeAttribute('startup');
      this.removeAttribute('unresolved');
      this.addEventListener('transitionend', () => {

      }, { once: true })
    });

    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);
  }

  updated() {

  }

  call(_type, _params) {
    return () => {
      switch (_type) {
        case 'event:nonce':
          // Do somthing
          break;
      

      }
    }
  };

}

customElements.define('applic-mount', ApplicMount);
