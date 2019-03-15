/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { html } from 'lit-html';
// import { html } from 'lit-element';

export const model = function () {
  return html`
    <style>
      ${this.css.include('applic::bar')}

      ._body-header {
        ${this.css.apply('--layout--sizing--border-box')} 

        margin: -60px -30px 0 -30px;
        padding: 60px 30px 0 30px;

        border-bottom: 1px solid #e6e6e6;
        background: #fafafa; }

    </style>  

    <div class="_body-header applic bar">
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
          ${this.get('sheet.persistent') ? '': html`
            <applic-icon-button icon="notes"
              @click="${this.call('navigation:toggle')}">
            </applic-icon-button>
          `}            
 
        </div>
      </div>
    </div>

    <applic-scrollable class="_body">
      <code>
        ${JSON.stringify(this.state, '', 4)}
      </code>

    </applic-scrollable>

  `
}
