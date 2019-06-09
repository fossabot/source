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

          ${css.apply('--typo')} 
        }

        :host([inert]) {
          pointer-events: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        :host(:not([inert])) {
          pointer-events: auto;
          -moz-user-select: auto;
          -webkit-user-select: auto;
          -ms-user-select: auto;
          user-select: auto;
        }


        :host(:not([typo])),
        :host([typo="body"]) {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          letter-spacing: 0.25px;
          text-decoration: inherit;
          text-transform: inherit;
        }

        :host([typo="hint"]) {
          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
          letter-spacing: 0.4px;
          text-decoration: inherit;
          text-transform: inherit;
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
