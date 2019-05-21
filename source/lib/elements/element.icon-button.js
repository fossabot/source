/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicIconBtn extends LitElement {
  static get properties() {
    return {
      size: '',

      icon: {
        type: String,
        value: '',
        attribute: 'icon'
      },
      iconActive: {
        type: String,
        value: '',
        attribute: 'icon-active'
      },

      toggle: {
        type: Boolean,
        value: false
      },
      active: {
        type: Boolean,
        value: false
      }
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
 
        :host([size="dense"]) {
          height: 28px;
          width: 28px; }
 
        applic-icon { 
          color: #7a7a7a; }

        :host([tune="accent"]) applic-icon {
          color: #ff9569; }

        :host([toggle][active]) * {
          color: var(--theme-color);
        }
        
      </style>

      ${this.toggle && this.active ? html`
        <applic-icon name="${this.iconActive}" size="${this.size}"></applic-icon>
      ` : html`
        <applic-icon name="${this.icon}" size="${this.size}"></applic-icon>
      `}
    `;
  }
  constructor() {
    super();
    this.setAttribute('aria-role', 'button');

  }

  updated() {
     
  }

}

customElements.define('applic-icon-button', ApplicIconBtn);
