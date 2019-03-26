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
      uri: { type: String },
      aspect: { type: String }
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--stance--relative')} 
          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 
        
          width: 100%; }

        :host([aspect="1:1"]) {
          padding-bottom: 100%;
        }
   
        img {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--fit')} 
          
          height: 100%;
          width: 100%;

          object-fit: contain;
          overflow: hidden; 
          pointer-events: none; }

      </style>
          
      ${!!this.uri && this.uri != '' ? html`<img src="${this.uri}">`: ''}
      
    `;
  }

  constructor() {
    super();
  }

  updated() { }

}

customElements.define('applic-image', ApplicImage);
