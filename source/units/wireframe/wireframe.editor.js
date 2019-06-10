/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../../lib/pattern/dom.style.js';

class ApplicEditor extends LitElement {
  static get properties() {
    return { };
  }

  render() {
    return html`
      <style>  
        :host, :host * { ${css.apply('--layout--sizing--border-box')} }

        :host {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex-auto')}

          background: #ffffff;
        }

        .applic.list {
          ${css.apply('--layout--flex-auto')}
          ${css.apply('--layout--vertical')}'
        }
      
      </style>

    <applic-scrollable>
      <slot></slot> 
      <slot name="editor:start"></slot> 

      <div class="applic list">
      
      </div>

      <slot name="editor:end"></slot> 
    </applic-scrollable>

    `;
  }

  constructor() {
    super();

  }

  firstUpdated() { }

  updated() { }

}

customElements.define('applic-editor', ApplicEditor);
