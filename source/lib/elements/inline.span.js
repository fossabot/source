/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../pattern/dom.style.js';


class ApplicSpan extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${css.apply('--layout--sizing--content-box')} 
          ${css.apply('--layout--inline')} 
        
          font-family: 'Roboto', sans-serif;
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

customElements.define('applic-span', ApplicSpan);
