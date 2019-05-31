/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';

import { model } from '../models/all-models.js';
import { css } from '../wireframe.style.js'

class ApplicMount extends LitElement {
  static get properties() {
    return { };
  }

  render() {
    return html`
      <style>
        :host, :host * { ${css.apply('--layout--sizing--content-box')} }

        :host {
          ${css.apply('--layout--flex')}
        }

        .editor.grid {
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--wrap')}

          padding: 4px;  
        }

        .editor.tile {
          ${css.apply('--layout--horizontal')}

          height: 96px;
          width: 320px;
          max-width: 100%;

          margin: 4px;

          border: 1px solid #e1e4e8;
        }

        .editor.tile-canery {
          ${css.apply('--stance--relative')}
          ${css.apply('--layout--flex-none')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--center-center')}

          height: 80px;
          width: 80px;
          margin: 8px;

          background: #e1e4e8;
        }

        .editor.tile-canery > * {
          max-width:100%;
          max-height:100%;
        }

        .editor.tile-detail {
          ${css.apply('--layout--flex')}

          border-left: 1px solid #e1e4e8;

          margin: 8px 8px 8px 0px;
          padding: 0px 0px 0px 8px;
          overflow: hidden;
        }

        .editor.tools {
          ${css.apply('--layout--vertical')}

          padding: 0px 8px 2px;
        } 
        .editor.tools > * {
          padding: 8px 0px 0px;
        } 

      </style>

      <applic-scrollable>
        <div class="editor tools">
          <input @change="${this._onFiles}" type="file" multiple=""></input>
        </div>

        <div class="editor grid">
          ${this.graphics.map((node) => html`
            <div class="editor tile" tabindex="0">
              <div class="editor tile-canery">
                <img src="${node.source.uri}"></img>
              </div>
              <div class="editor tile-detail">
                <span>${node.nonce}</span>
              </div>
            </div>
          `)}
          


        </div>
      </applic-scrollable>

    `;
  }

  constructor() {
    super();

    this.graphics = [];

    applic.on('applic-state:changed', () => {
      const _files = applic.state.get('applic:files');


      this.graphics = applic.utils.arrayify(_files);
      this.requestUpdate();
    });

  }

  _onFiles(event) {
    applic.import.catched(event.target.files, {
      sheet: '000'
    });
  }

  firstUpdated() { }

  updated() { }

}

customElements.define('applic-editor', ApplicMount);
