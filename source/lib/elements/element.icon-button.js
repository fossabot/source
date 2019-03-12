/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicIconBtn extends LitElement {
  static get properties() {
    return {
      icon: ''
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          height: 40px;
          width: 40px; 
        
          cursor: pointer; }

        :host([size="narrow"]) {
          height: 40px;
          width: 28px; }
 
        applic-icon { 
          color: #7a7a7a; }

        :host([tune="accent"]) applic-icon {
          color: #ff9569; }
        
      </style>

      <applic-icon name="${this.icon}"></applic-icon>
    `;
  }
  constructor() {
    super();
    this.setAttribute('aria-role', 'button');
  }
}

customElements.define('applic-icon-button', ApplicIconBtn);
