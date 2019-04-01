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

class ApplicGraphic extends LitElement {
  static get properties() {
    return { 
      nonce: { type: String }
    };
  }

  render() {
    return html`
      <style>
        applic-image {
          height: 100%; 
          width: 100%; 
        }
      </style>

      ${this._frameUri != '' ? html`
        <applic-image uri="${this._frameUri || ''}" class="_grid-item--graphic"></applic-image>
      `: ''}

    `;
  }

  constructor() {
    super();

  }

  firstUpdated() {
  
  }
  updated() {
    // console.log('grafic', this.nonce)

  }

}

customElements.define('applic-graphic', ApplicGraphic);
