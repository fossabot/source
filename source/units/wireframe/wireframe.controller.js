/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../../lib/pattern/dom.style.js';

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicController extends LitElement {
  static get properties() {
    return { };
  }

  render() {
    return html`
      <style>  
        :host, :host * { ${css.apply('--layout--sizing--border-box')} }

        :host {
          ${css.apply('--stance--absolute')}
          ${css.apply('--stance--pin-bottom')}
          ${css.apply('--layout--vertical')}
         
          opacity: 1;
          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1); }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host([unresolved]) { pointer-events: none !important; }
        :host([startup]) * { transition: none !important; }

        .applic.perma-banner {
          ${css.apply('--stance--absolute')}
          ${css.apply('--stance--pin--bottom')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--center-center')}
          ${css.apply('--layout--flex-none')}

          height: 48px;
          width: 100%;
          max-width: 560px;
          border: 1px solid #e1e4e8;
          border-radius: 24px;

          margin: 0px auto;
          background: #ffffff;
        }
      
      </style>
    
      
      <div class="applic perma-banner">
        <slot></slot>

      </div>

    `;
  }

  constructor() {
    super();

  }

  firstUpdated() { }

  updated() { }

}

customElements.define('applic-controller', ApplicController);
