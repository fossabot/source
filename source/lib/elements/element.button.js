/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';

class ApplicBtn extends LitElement {
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

          ${applic.$.css.apply('--typo')} 

          font-size: 12px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.9px;
          text-decoration: none;
          text-transform: uppercase;
          
          height: 40px;
          padding: 0 10px; 
        
          cursor: pointer; }

        :host([dense]) {
          height: 30px; }

        :host([tune="accent"]) {
          color: #ff9569; }

      </style>

      <slot></slot>
    `;
  }
  constructor() {
    super();
    this.setAttribute('aria-role', 'button');
  }
}

customElements.define('applic-button', ApplicBtn);
