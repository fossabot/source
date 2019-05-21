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


          --wireframe-toolbar--dense: 36px;
          --wireframe-toolbar--large: 112px;

          --wireframe-nav--dense: 78px;
          --wireframe-nav--large: 220px;

          --wireframe-card: 640px;
          --wireframe-card--margin: calc((100vw 
            - var(--wireframe-nav--large)
            - var(--wireframe-card)) / 2);
        }

        :host {
          ${css.apply('--stance--fixed')}
          ${css.apply('--stance--fit')}
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--horizontal')}
  
          ${css.apply('--typo--noselect')}

          background: #2C2F33;
          pointer-events: none;
          
          min-width: 890px;
          overflow-x: auto;

          margin: var(--wireframe-toolbar--dense) 0px 0px 0px;
          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1); }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host([startup]) * { transition: none !important; }
        :host * { pointer-events: all; }



        ._applic-body {
          z-index: 2;
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--flex')}

          margin: calc(0px - var(--applic-line--width)) 0px 0px 0px;
          transition: margin 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        :host([is-guide]) ._applic-body {
          margin: 0px var(--wireframe-card--margin) 0px;
        }

        ._applic-body-inner {
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex-none')}

          min-height: calc(100vh - var(--wireframe-toolbar--dense));
          width: calc(100vw - var(--wireframe-nav--dense));
          margin: calc(0px - var(--applic-line--width)) auto 0px 0px;

          border-radius: 6px 0px 0px 0px;
          background: #fff;

          transition: 
            margin 250ms cubic-bezier(0.4, 0.0, 0.2, 1),
            min-height 250ms cubic-bezier(0.4, 0.0, 0.2, 1),
            width 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }
      

        :host([is-guide]) ._applic-body-inner{
          border-radius: 6px 6px 6px 6px;
          width: var(--wireframe-card);
          min-height: calc(100vh - 112px);
          margin: calc(var(--wireframe-toolbar--large) - 56px) 0px 0px 0px;
        }
        
        ._applic-banner {
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex--none')}
        }

      </style>


      ${this.model('wireframe:toolbar')}
      
      <div class="_applic-body">
        ${this.model('wireframe:navigation')}
        
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

    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');

    this._selected = [];

    // applic.on('applic:updated', this.requestUpdate.bind(this))
    applic.on('applic-state:changed', this._update.bind(this))
    applic.on('applic:updated', this._update.bind(this))
    this._update();

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
    const _state = applic.get('*');
    this.viewmode = _state.location && _state.location.path[0] == 'guide' ? 'guide' : 'editor';

    this.requestUpdate();
  }

  firstUpdated() {
    applic.utils.buffer(() => {
      this.removeAttribute('unresolved');
      setTimeout(() => {
        this.removeAttribute('startup');
      }, 500);
    });

    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);
  }

  updated() {
    this.viewmode == 'guide' ?
      this.setAttribute('is-guide', '') :
      this.removeAttribute('is-guide');

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
