/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';
import { css } from './wireframe.style.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicGrid extends LitElement {
  static get properties() {
    return { 
      nonce: { type: String }
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--wrap')}

          ${css.apply('--layout--sizing--border-box')}

          width: 100%;

          margin: 0px 0px;
          padding: calc(8px / 2); 
        }

      </style>

      <slot></slot>
    `;
  }

  constructor() {
    super();
    applic.on('applic:changed', this.updated.bind(this));
  }

  firstUpdated() {
  
  }
  updated() {
   
  }

}

customElements.define('applic-gid', ApplicGrid);
