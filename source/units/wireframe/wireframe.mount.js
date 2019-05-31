/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';

import { model } from './models/all-models.js';
import { css } from './wireframe.style.js'

import './segments/segment.editor.js';
import './segments/segment.guides.js';

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicMount extends LitElement {
  static get properties() {
    return { };
  }

  render() {
    return html`
      <style>  
        :host, :host * { ${css.apply('--layout--sizing--content-box')} }
        :host {
          ${css.apply('--stance--fixed')}
          ${css.apply('--stance--fit')}
          ${css.apply('--layout--vertical')}
         
          left: 76px;

          ${css.apply('--typo')}
          ${css.apply('--typo--noselect')}

          opacity: 1;
          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1); }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host([unresolved]) { pointer-events: none !important; }
        :host([startup]) * { transition: none !important; }

        .applic.primary-card {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--flex')}

          overflow: hidden;

          background: #ffffff; 
          border-radius: 8px 0px 0px 0px;
          border-top: 1px solid #e1e4e8;
          border-left: 1px solid #e1e4e8; }
      
        .applic.sheet-card {
          ${css.apply('--stance--absolute')}
          ${css.apply('--layout--flex-none')}

          padding: 0px 0px;
          margin: 0px 0px 0px -78px;
          width: 78px; }

      </style>
      
      <div class="applic primary-card">
    		<applic-editor></applic-editor>
      </div>

      <div class="applic sheet-card">
      </div>

    `;
  }

  constructor() {
    super();

    this.css = css;
    if (!!applic.rendered) {
      this.setAttribute('unresolved', '');
    };

    applic.$ = this;
  }

  resolve() {
    applic.utils.buffer(() => {
      this.removeAttribute('unresolved');
      applic.utils.buffer(this.removeAttribute.bind(this, 'startup'));
      console.debug("applic-wireframe:resolved");
    });
  }

  firstUpdated() {
    this.resolve();
    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);
  }

  updated() {

  }

  model(_nonce) {
    return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
  };

  call(_type, _params) {
    return () => {
      console.log(_type, _params)
      switch (_type) {
        case 'event:nonce':
          // Do somthing
          break;
      

      }
    }
  };

}

customElements.define('applic-mount', ApplicMount);
