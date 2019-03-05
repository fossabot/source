/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = (model, state) => html`
  <style>
    .applic.header {
      background: #ffffff;
    }
    
  </style>
    

  <div class="applic bar header">
    <div class="applic bar-row dense">
      <div class="applic bar-section align-start">
      </div>

      <div class="applic bar-section align-end">
        ${template.usercard()}
      </div>
    </div>

    <div class="applic bar-row">
      <div class="applic bar-section align-start">
      </div>
    </div>

  </div>

`;

const template = {};
template.usercard = () => html`
  <style>
    .applic.usercard {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--vertical')} 

      width: 240px;
    }
    .applic.usercard-storage {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--stance--relative')} 

      height: 4px;
      width: 100%;

      background: #e0e5e6;
    }
    
    .applic.usercard-storage > * {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--stance--absolute')} 
      ${css.apply('--stance--pin--start')} 

      height: 100%; }

    .applic.usercard-storage > .used {
      background: red; 
      width: 70%; }
    .applic.usercard-storage > .saved {
      opacity: .5;
      background: blue; 
      width: 90%; }
    
  </style>
    

  <div class="applic usercard">
    <i class="applic icon">data_usage</i>
    usercard

    <div class="applic usercard-storage">
      <div class="saved"></div>
      <div class="used"></div>
    </div>
  </div>
`;
