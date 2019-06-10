/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import './lib/elements/all-elements.js'
import { html, render } from 'lit-html';
import { css } from './lib/pattern/dom.style.js';

import './units/wireframe/wireframe.mount.js'
import './units/wireframe/wireframe.editor.js'

import './units/behaviour/applic.behaviour.js'

const _template = html`
  <style>
    html {
      --CR100-rgb: 255,134,127;
      --CR500-rgb: 255, 82, 82;
      --CR600-rgb: 255, 82, 82;

      --dark-mode-bg-rgb: 50, 54, 57;
      --GG050-rgb: 248, 249, 250;
      --GG100-rgb: 241, 243, 244;
      --GG200-rgb: 232, 234, 237;
      --GG300-rgb: 218, 220, 224;
      --GG400-rgb: 189, 193, 198;
      --GG500-rgb: 154, 160, 166;
      --GG600-rgb: 128, 134, 139;
      --GG700-rgb: 95, 99, 104;
      --GG800-rgb: 60, 64, 67;
      --GG900-rgb: 32, 33, 36;
      --GB050-rgb: 232, 240, 254;
      --GB100-rgb: 210, 227, 252;
      --GB200-rgb: 174, 203, 250;
      --GB300-rgb: 138, 180, 248;
      --GB400-rgb: 102, 157, 246;
      --GB500-rgb: 66, 133, 244;
      --GB600-rgb: 26, 115, 232;
      --GB700-rgb: 25, 103, 210;
      --GB800-rgb: 24, 90, 188;
      --GB900-rgb: 23, 78, 166;
      --GB400-dark-rgb: 107, 165, 237;
      --GB600-dark-rgb: 37, 129, 223;
      --GR050-rgb: 252, 142, 230;
      --GR100-rgb: 250, 210, 207;
      --GR200-rgb: 246, 174, 169;
      --GR300-rgb: 242, 139, 130;
      --GR400-rgb: 238, 103, 92;
      --GR500-rgb: 234, 67, 53;
      --GR600-rgb: 217, 48, 37;
      --GR700-rgb: 197, 34, 31;
      --GR800-rgb: 179, 20, 18;
      --GR900-rgb: 165, 14, 14;
      --GR500-dark-rgb: 230, 106, 94;
      --GR600-dark-rgb: 211, 59, 48;
      --GR800-dark-rgb: 180, 27, 26;
    }

    #devNotice {
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center-center')}

      background-color: rgb(var(--CR600-rgb)); } 
    
    #devNotice * { color: white; } 

    #applicDetails, 
    #applicTools { 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--wrap')} 
      padding: 20px 20px; } 

    #applicDetails > *,
    #applicTools > * { margin: 0px 4px; } 

    .applic.spacer { 
      ${css.apply('--layout--flex-auto')} 
      margin: 0px !important; }

  </style>

  <applic-mount>
    <applic-editor> 

      <div slot="editor:start"
        id="applicTools">
        <applic-button type="secondary"
          @click="${applic.request('applic-request:import', { type: 'file' })}">
          ${applic.localize('editor:import-new-files')}
        </applic-button>
        <applic-button type="secondary"
          @click="${applic.request('applic-request:import', { type: 'directory' })}">
          ${applic.localize('editor:import-new-directory')}
        </applic-button>
        <div class="applic spacer"></div>
        <applic-button type="primary" disabled
          @click="${applic.request('applic-request:package', { range: 'all' })}">
          ${applic.localize('editor:export-all')}
        </applic-button>
      </div>
      
      <div slot="editor:empty-state"
        style="max-width: 480px; box-sizing: border-box;">
        <applic-span typo="title">${applic.localize('dev:nightly-caption')}</applic-span><br>
        <applic-span typo="body">${applic.localize('dev:nightly-sub-caption')}</applic-span>
      </div> 

      <div slot="editor:end" id="applicDetails">
        <div>
          <applic-span typo="hint" inert>Tool by Rikkun Brouwers</applic-span><br>
        </div>

        <div class="applic spacer"></div>
        ${applic.utils.arrayify(applic.localization.all).map(lang => html`
          <applic-span typo="hint" ?highlight="${applic.lang == lang.nonce}">
            <a href="./#/?apply.prefrences=lang:${lang.nonce}">${lang.name}</a>
          </applic-span>
        `)}
      </div>
    </applic-editor>

    <div id="devNotice">
      <applic-span typo="hint">${applic.localize('dev:notice')}</applic-span><br>
    </div>

  </applic-mount>
`;

render(_template, document.body)

// <applic-checkbox>
//   <applic-span class="caption">Checkbox</applic-span>
//   <applic-span class="sub-caption">
//     With a longer subtitle that wraps to another line
//   </applic-span>
// </applic-checkbox>

// <applic-button>
//   <applic-span slot="caption">Button</applic-span>
// </applic-button>

// <applic-icon-button>
//   <applic-icon slot="icon">menu</applic-icon>
// </applic-icon-button>
