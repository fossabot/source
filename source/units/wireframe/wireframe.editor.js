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

          padding: 24px 24px 0px;
        }   
        .applic.list-header {
          border-bottom: 1px solid rgb(var(--GG100-rgb));
          margin: 0px 24px;
        }   

      </style>

    <slot name="editor:start"></slot> 

    <div class="applic list-header"></div>

    <applic-scrollable>

      <div class="applic list">
        ${this.graphics.map((graphic) => html`
          <applic-editor-item nonce="${graphic.nonce}">
          </applic-editor-item>
        `)}
      </div>
      
      <slot name="editor:end"></slot> 

    </applic-scrollable>

    `;
  }

  constructor() {
    super();

    this.graphics = [];
    applic.on('applic-graphics:changed', () => {
      this.graphics = applic.utils.arrayify(applic.graphics)
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
          ${css.apply('--layout--center')}
          ${css.apply('--layout--flex-none')}

          border-bottom: 1px solid rgb(var(--GG100-rgb));
          padding: 0px 0px 24px;
          margin: 0px 0px 24px;
        }
      
        .item.image {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--center-center')}
          width: 96px;

          margin: 4px;
          background-color: rgb(var(--GG100-rgb));
        }

        .item.image:after {
          content: "";
          display: block;
          padding-bottom: calc(100% + 24px);
        }

        .item.image > img {
          ${css.apply('--stance--absolute')}
          ${css.apply('--stance--pin--top')}
          height: calc(100% - 24px);
          width: 100%;
          object-fit: contain;
        }

        .item.image > div {
          ${css.apply('--stance--absolute')}
          ${css.apply('--stance--pin--bottom')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--center-center')}
          height: 24px;
        }

        .item.image.is-large {
          width: 196px;
          max-width: calc(50% - 8px);
        }

        .item.image.is-small {
          width: 72px;
        }

        .item.details {
          ${css.apply('--layout--vertical')}

          padding: 8px;
          margin: 0px;

          width: 416px;
          max-width: 100%;
        }

        .item.body {
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--wrap')}

          max-width: 416px;

          padding: 4px 4px;
          margin: -8px 0px;
        }

        .item.body-frames {
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--wrap')}
          max-width: 100%;
        }

        @media (min-width: 720px) {
          :host {
            ${css.apply('--layout--horizontal')}
            ${css.apply('--layout--start')}
          }

          .item.details {
            ${css.apply('--layout--vertical')}

            border-right: 1px solid rgb(var(--GG100-rgb));
            padding: 8px 24px 8px 0px;
            margin: 0px 16px 0px 0px;
            width: 240px;
            height: 100%;
          }

          .item.body {
            max-width: 100%;
          }
        }

      </style>

      <div class="item details">
        <input type="text" value="${this.detail.name}">
      </div>

      <div class="item body">
        <div class="item image is-large">
          <div><applic-span typo="hint">Source</applic-span></div>
          <img src="${this.uri}">
        </div>
        <div class="item image is-large">
          <div><applic-span typo="hint">Output</applic-span></div>
          <img src="${this.uri}">
        </div>

        <div class="item body-frames">
          ${this.frames.map(frame => html`
            <div class="item image is-small">
              <div><applic-span typo="hint">${frame.duration}ms</applic-span></div>
              <img src="${frame.uri}">
            </div>
          `)}
        </div>
      </div>

    `;
  }

  constructor() {
    super();

    this.uri = ''
    this.frames = []
    this.detail = {
      name: ''
    }

    applic.on('applic-graphics:changed', this._update.bind(this));
  }

  _update()  {
    const _graphic =applic.graphics[this.nonce];

    this.uri = _graphic.origin.uri;
    this.frames = _graphic.frames;
    this.detail = {
      name: _graphic.origin.name
    };
      
    this.requestUpdate();
  }

  firstUpdated() { 
    this._update()
  }
  updated() {
  
  }

}

customElements.define('applic-editor-item', ApplicEditorItem);
