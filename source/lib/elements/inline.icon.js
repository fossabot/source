/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../pattern/dom.style.js';


class ApplicIcon extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${css.apply('--layout--sizing--content-box')} 
          ${css.apply('--layout--inline')} 

          ${css.apply('--typo--nowrap')} 
          ${css.apply('--typo--noselect')} 
        
          font-family: 'Material Icons Sharp';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          direction: ltr;
        
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
        }

      </style>

      <slot></slot>

    `;
  }

  constructor() {
    super();

  }

  firstUpdated() { }

}

customElements.define('applic-icon', ApplicIcon);
