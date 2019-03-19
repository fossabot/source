/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { html } from 'lit-html';

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

      ._body {
        background: #f4f4f4; }

    </style>  

    <div class="_body-header applic bar">
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
 
          ${this.get('narrow') ? html`
            <applic-icon-button icon="notes"
              @click="${this.call('navigation:toggle')}">
            </applic-icon-button>
          ` : html`
            <applic-icon-button icon="${this.get('sheet.persistent') ? 'chevron_left' : 'notes'}"
              @click="${this.call('navigation:toggle-persistence')}">
            </applic-icon-button>
          `}

        </div>
      </div>
    </div>

    <applic-scrollable class="_body">
      ${this.model('bodyInner')}

    </applic-scrollable>


    <style>
      ._tools {
        ${this.css.apply('--stance--absolute')}  
        ${this.css.apply('--stance--pin--bottom-end')}  
        

        border: 1px solid #e6e6e6;
        border-radius: 6px;
        background: #fafafa; 

        height: ;

        margin: 20px;
        padding: 0px 4px;
      }

    </style>

    <div class="_tools">
      <div class="applic bar-row dense">
        <div class="applic bar-section">

          <applic-icon-button icon="get_app" size="denses">
          </applic-icon-button>
    
        </div>
      </div>
    </div>

  `
}
