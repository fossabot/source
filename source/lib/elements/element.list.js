/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';

class ApplicList extends LitElement {
  static get properties() {
    return {
      name: ''
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} 
        
          padding: 10px 0px; 
          width: 100%; }

        ::slotted(.applic.list-divider) {
          height: 1px;
          background: #d6d6d6;

          margin: 10px 20px;
        }

      </style>

      <slot></slot>
    `;
  }
  constructor() {
    super();
  }
}

customElements.define('applic-list', ApplicList);
