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
          ${css.apply('--layout--vertical')}

          padding: 0px 24px;
        } 

        .applic.list-item {

          padding: 16px 0px;
        } 
      
      </style>

    <applic-scrollable>
      <slot name="editor:start"></slot> 

      <div class="applic list">
        ${this.graphics.length ? this.graphics.map((graphic) => html`
          <applic-editor-item nonce="${graphic.nonce}">
          </applic-editor-item>
        `) : html`
          <slot name="editor:empty-state"></slot>  
        `}
      </div>
      
      <slot name="editor:end"></slot> 

    </applic-scrollable>

    `;
  }

  constructor() {
    super();

    this.graphics = [];
    applic.on('applic-graphics:changed', () => {
      this.requestUpdate();
    });
  }

  firstUpdated() { }
  updated() { }

}

customElements.define('applic-editor', ApplicEditor);


class ApplicEditorItem extends LitElement {
  static get properties() {
    return {
      nonce: {
        type: String,
        value: ''
      },

    };
  }

  render() {
    return html`
      <style>  
        :host, :host * { ${css.apply('--layout--sizing--border-box')} }

        :host {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex-none')}
        }
      
      </style>

      applic-editor-item ${this.nonce}

    `;
  }

  constructor() {
    super();

  }

  firstUpdated() { }
  updated() { }

}

customElements.define('applic-editor-item', ApplicEditorItem);
