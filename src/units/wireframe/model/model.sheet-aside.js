/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { html } from 'lit-html';
import { css } from '../wireframe.style.js';

export const model = function () {
  return html`
    <style>
      ${css.include('applic::bar')}

      ._navigation-header {
        ${css.apply('--layout--sizing--border-box')} 

        margin: -60px 0 0 -30px;
        padding: 60px 0 0 30px;

        border-bottom: 1px solid #d6d6d6;
        background: #f4f4f4; }

      ._name {
        ${css.apply('--layout--sizing--border-box')} 
        ${css.apply('--layout--horizontal')} 
        ${css.apply('--layout--center')} 
        ${css.apply('--layout--felx-none')} 

        ${css.apply('--typo')}

        font-size: 13px;
        line-height: 22px;
        font-weight: 500;
        letter-spacing: -0.18px;
        text-transform: uppercase;
        
        color: #636364;

        padding: 0px 8px 0 24px; }

    </style>  

    <div class="_navigation-header applic bar">
      <div class="applic bar-row">
        <div class="applic bar-section align-start"></div>
      </div>

      <div class="applic bar-row">
        <div class="applic bar-section align-start">
          <span class="_name">Contrast Tool</span>
        </div>
      </div>

    </div>

    <applic-scrollable class="_navigation"> 
      <applic-list>
        ${this.section.map(_section => html`
          <applic-list-item ?active="${_section.active}"
            @click="${this.call('section:select', { nonce: _section.nonce })}">

            <applic-icon name="folder_open" slot="graphic"></applic-icon>
            <span>${_section.name}</span>
            <span slot="meta">0</span>

            ${1 < this.section.length ? html`
              <applic-icon-button icon="close" size="dense" slot="action" @click="${this.call('section:remove', { nonce: _section.nonce })}">
                <applic-hint>Close "${_section.name}"</applic-hint>
              </applic-icon-button>
            `: ''}
          </applic-list-item>
        `)}
        
        <applic-list-item @click="${this.call('section:create')}">
          <applic-icon name="add" slot="graphic"></applic-icon>
          <span>New Collection</span>
        </applic-list-item>

        <div class="applic list-divider"></div>

      </applic-list>
     
    </applic-scrollable>

  `
}
