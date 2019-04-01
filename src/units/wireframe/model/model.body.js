/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { html } from 'lit-element';
import { css } from '../wireframe.style.js';

export const model = function () {
  return html`
    <style>
      ${css.include('applic::bar')}

      ._body-header {
        ${css.apply('--layout--sizing--border-box')} 

        margin: -60px -30px 0 -30px;
        padding: 60px 30px 0 30px;

        border-bottom: 1px solid #d6d6d6;
        background: #fafafa; }

      ._body {
        ${css.apply('--layout--horizontal')} 
        ${css.apply('--layout--flex')} 

        background: #efefef; }

      ._body-inner {
        ${css.apply('--layout--vertical')} 
        ${css.apply('--layout--flex')} }

      ._body-aside {
        ${css.apply('--layout--vertical')} 
        ${css.apply('--layout--flex-none')} 

        width: 320px; 

        border-left: 1px solid #d6d6d6;
        background: #fafafa; }

      ._tools {
        ${css.apply('--stance--absolute')}  
        ${css.apply('--stance--pin--bottom-end')}  
        
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

          <applic-icon-button icon="notes">
            <applic-hint>Toggle navigation</applic-hint>
          </applic-icon-button>

        </div>
      </div>
    </div>


    <div class="_body">
      <applic-scrollable class="_body-inner">   
        ${this.model('wireframe:body-inner')}

        <div class="">
        
        </div>
      </applic-scrollable>
        
      <applic-scrollable class="_body-aside">


        ${this.model('wireframe:body-aside')}
      </applic-scrollable>
    </div>



  `;
}