/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';

import { model } from './models/all-models.js';
import { css } from './wireframe.style.js'

import './segments/segment.editor.js';
import './segments/segment.guides.js';

class ApplicStartup extends LitElement {
  static get properties() {
    return {
      layout: {
        type: Object, value: {}
      },
    };
  }

  render() {
    return html`
      <style>  
        ${css.include('applic::bar')}
        ${css.include('applic::button')}
        ${css.include('applic::checkbox')}

        :host, :host * { ${css.apply('--layout--sizing--content-box')} }
        :host {
          z-index: 50;
          ${css.apply('--stance--fixed')}
          ${css.apply('--stance--fit')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--center-center')}
  
          opacity: 1;

          background: rgba(0,0,0, .5);
          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1); }

        :host([unresolved]) { opacity: 0; transition: opacity 50ms 0ms cubic-bezier(0.4, 0.0, 1, 1); }
        :host([unresolved]) { pointer-events: none !important; }
        :host([startup]) { transition: none !important; }

        .startup.card {
          ${css.apply('--layout--flex-none')}
          ${css.apply('--layout--vertical')}
          width: 480px;
          background: #ffffff;
          overflow: hidden;

          border-radius: 8px;
          border: 1px solid #dadce0;
        }

        @media (max-width: 480px) { 
          .startup.card {
            height: 100vh;
            width: 100vw;

            border-radius: 0px;
            border: 1px solid #dadce0;
          }
        }

        .startup.header {
          background: #f1f3f4;

          height: 210px;
          border-bottom: 1px solid #dadce0;
          margin: 0px 0px 16px 0px;
        }

        .startup.inner,
        .startup.addon {
          ${css.apply('--layout--flex-none')}
          ${css.apply('--layout--vertical')}

          padding: 16px 16px;
        }
        
        .startup.actions {
          ${css.apply('--layout--flex-none')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--center')}
          ${css.apply('--layout--end-justified')}

          padding: 0px 8px 16px;
        }

        .startup.title { 
          ${css.apply('--typo--body1')}
          margin: 0px 0px 8px;
        }
        .startup.body { 
          ${css.apply('--typo--body2')}
        }

      </style>


      <div class="startup mockup">
        <div class="startup card">
          <div class="startup inner">
            <span class="startup body">
            </span>
          </div>
          
          <div class="applic flex-spacer"></div>

          <div class="startup actions">
            <div class="applic flex-spacer"></div>


            <button class="applic button"
              @click="${this.skip}">
              <span>Continue to Site</span>
            </button>
            <button class="applic button is-primary"
              @click="${this.validated}">
              <span>Setup</span>
            </button>

          </div>
        </div>

      </div>

    `;
  }

  constructor() {
    super();

    this._waiting

    this._persistentStorage = {
      title: 'Persistent Storage',
      description: 'This allows you to quickly export your graphics, without going over a zip file.',
      requesting: false,
      supported: !!navigator.webkitPersistentStorage,
      request: this._requestStorage.bind(this),
      cancel: this._cancelStorage.bind(this)
    }

    this._funtions = [
      this._persistentStorage
    ]

    this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');
  }

  validated() {
    applic.state.set('applic:validated', {
      polyfills: 'none',
      date: Date.now()
    });

    this.setAttribute('unresolved', '');
  }
  
  skip() {
    this.setAttribute('unresolved', '');
  }

  _requestStorage() {
    navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 10, (allowed_storage) => {
      if (!allowed_storage || allowed_storage <= 0) {

      } else {
        window.webkitRequestFileSystem(window.PERSISTENT, 1024 * 1024 * 10, this._resolveStorage.bind(this));
      }
    })
  }

  _cancelStorage() {

  }

  _resolveStorage() {

  }

  firstUpdated() {
    applic.utils.buffer(() => {
      if (applic.validated()) return;
      this.removeAttribute('unresolved');
      this.removeAttribute('startup');
    })
  }
  updated() { }

}

customElements.define('applic-startup', ApplicStartup);
