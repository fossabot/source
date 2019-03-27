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

        border-bottom: 1px solid #d6d6d6;
        background: #fafafa; }

      ._body {
        ${this.css.apply('--layout--horizontal')} 
        ${this.css.apply('--layout--flex')} 

        background: #efefef; }

      ._body-inner {
        ${this.css.apply('--layout--vertical')} 
        ${this.css.apply('--layout--flex')} }

      ._body-aside {
        ${this.css.apply('--layout--vertical')} 
        ${this.css.apply('--layout--flex-none')} 

        width: 320px; 

        border-left: 1px solid #d6d6d6;
        background: #fafafa; }

      ._tools {
        ${this.css.apply('--stance--absolute')}  
        ${this.css.apply('--stance--pin--bottom-end')}  
        

        border: 1px solid #d6d6d6;
        border-radius: 6px;
        background: #fafafa; 

        height: ;

        margin: 20px;
        padding: 0px 4px; }

    </style>  

    <div class="_body-header applic bar">
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
 
          ${this.get('narrow') ? html`
            <applic-icon-button icon="notes"
              @click="${this.call('navigation:toggle')}">
              <applic-hint>Toggle navigation</applic-hint>
            </applic-icon-button>
          ` : html`
            <applic-icon-button icon="${this.get('sheet.persistent') ? 'chevron_left' : 'notes'}"
              @click="${this.call('navigation:toggle-persistence')}">
              <applic-hint>${this.get('sheet.persistent') ? 'Hide' : 'Show'}} navigation</applic-hint>
            </applic-icon-button>
          `}

        </div>
      </div>
    </div>


    <div class="_body">
      <applic-scrollable class="_body-inner">
        ${this.model('bodyInner')}


        <div class="_tools">
          <div class="applic bar-row dense">
            <div class="applic bar-section">
              <applic-icon-button icon="get_app" size="denses"></applic-icon-button>
            </div>
          </div>
        </div>

      </applic-scrollable>
      
      <applic-scrollable class="_body-aside">
        ${this.model('bodyAside')}

      </applic-scrollable>
    </div>



 
  `
}
