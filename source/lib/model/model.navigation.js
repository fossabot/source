/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';
// import { html } from 'lit-element';

export const model = function() {
  return html`
    <style>
      ${this.css.include('applic::bar')}

      ._navigation-header {
        ${this.css.apply('--layout--sizing--border-box')} 

        margin: -60px 0 0 -30px;
        padding: 60px 0 0 30px;

        border-bottom: 1px solid #e6e6e6;
        background: #f4f4f4; }

      ._name {
        ${this.css.apply('--layout--sizing--border-box')} 
        ${this.css.apply('--layout--horizontal')} 
        ${this.css.apply('--layout--center')} 
        ${this.css.apply('--layout--felx-none')} 

        ${this.css.apply('--typo')}

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
        <div class="applic bar-section align-end">
        ${this.get('narrow') ? '' : html`
          <applic-icon-button icon="${this.get('sheet.persistent') ? 'chevron_left' : 'chevron_right'}"
            @click="${this.call('navigation:toggle-persistence')}">
          </applic-icon-button>
        `}

        </div>

      </div>
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
          <span class="_name">Contrast Tool</span>
        </div>
      </div>
    </div>

    <applic-scrollable class="_navigation">
     
    </applic-scrollable>

  `
}
