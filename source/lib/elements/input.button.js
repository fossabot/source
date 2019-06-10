/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../pattern/dom.style.js';


class ApplicButton extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${css.apply('--stance--realtive')} 
          ${css.apply('--layout--sizing--border-box')} 
          ${css.apply('--layout--flex-none')} 
          ${css.apply('--layout--horizontal')} 
          ${css.apply('--layout--center-center')} 

          height: 36px;
          padding: 8px;
        }

        :host {
          border: none;
          border-radius: 4px;
          height: 32px;
          padding: 0 16px;

          transition-duration: 120ms;
          transition-property: background-color, color, box-shadow, border;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

          cursor: pointer;

          font-family: system-ui, BlinkMacSystemFont, 'Roboto', arial, sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        :host([type="primary"]) {
          background-color: rgb(var(--CR600-rgb));
          color: white;
        }

        :host([type="secondary"]) {
          background-color: white;
          border: 1px solid rgb(var(--GG300-rgb));
          color: rgb(var(--CR600-rgb));
          outline: none;
        }

        :host([type="secondary"]:focus) {
          border-color: rgb(var(--CR100-rgb));
        }

        :host([type="secondary"]:hover) {
          background-color: rgba(var(--CR500-rgb), 0.03);
          border-color: rgb(var(--CR100-rgb));
        }
        :host([type="secondary"]:active) {
          background-color: white;
          border-color: white;
          box-shadow: 
            0 1px 2px 0 rgba(var(--GG800-rgb), 0.3), 
            0 3px 6px 2px rgba(var(--GG800-rgb), 0.15);

        }

        :host([disabled]) {
          pointer-events: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        :host([type="primary"][disabled]) {
          background-color: rgb(var(--GG100-rgb));
          color: rgb(var(--GG600-rgb));
        }
        :host([type="secondary"][disabled]) {
          border-color: rgb(var(--GG100-rgb));
          color: rgb(var(--GG600-rgb));
        }
        
      </style>

      <slot></slot>

    `;
  }

  static get properties() {
    return {
      disabled: {
        type: Boolean,
      }
    }
  }


  constructor() {
    super();

    this.setAttribute('role', 'button')
  }

  firstUpdated() {
    this.addEventListener('click', () => {
      this.blur()
    })

  }

  updated() {
    !this.disabled ?
      this.setAttribute('tabindex', '0') :
      this.setAttribute('tabindex', '-1')
  }

}

customElements.define('applic-button', ApplicButton);
