/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicImage extends LitElement {
  static get properties() {
    return {
      uri: {
        type: String,
        value: ''
      }
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 
          ${applic.$.css.apply('--typo--noselect')} }

        img {
          height: 100%;
          width: 100%;
        }

      </style>
          
      <img src="${this.uri}">
    `;
  }

  constructor() {
    super();
  }

}

customElements.define('applic-image', ApplicImage);
