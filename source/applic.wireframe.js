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
      --CR50-rgb: 255, 234, 234;
      --CR100-rgb: 255, 203, 203;
      --CR200-rgb: 255, 169, 169;
      --CR300-rgb: 255, 134, 134;
      --CR400-rgb: 255, 108, 108;
      --CR500-rgb: 255, 82, 82;
      --CR600-rgb: 255, 75, 75;
      --CR700-rgb: 255, 65, 65;
      --CR800-rgb: 255, 56, 56;
      --CR900-rgb: 255, 40, 40;

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
    }

    #applicDetails, 
    #applicTools { 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--end')} 
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
      
      <div slot="editor:end" id="applicDetails">
        <div>
          <applic-span typo="hint">${applic.localize('applic-detail:caption')}</applic-span><br>
          <applic-span typo="hint">${applic.localize('applic-detail:sub-caption')}</applic-span><br>
        </div>
        <div class="applic spacer"></div>

        ${applic.utils.arrayify(applic.localization.all).map(lang => html`
          <applic-span typo="hint" ?highlight="${applic.lang == lang.nonce}">
            <a href="./#/?apply.prefrences=lang:${lang.nonce}">${lang.name}</a>
          </applic-span>
        `)}
      </div>
    </applic-editor>

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


applic.utils.buffer(async () => {
  await import('./applic.lazies.js')
})