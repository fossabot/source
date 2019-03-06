/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { html } from 'lit-html';

export const model = (model, state) => html`
  <style>
    .applic.body {
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--flex')}

      background: #eae9ea; }

    .applic.body--toolbar {
      background: #f6f8f8; }

    .applic.wrap {
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--flex')} }

    .applic.aside {
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--flex-none')} 

      width: 320px;
      padding: 0 8px; }

    .applic.main {
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--flex')} }

  </style>
    



  <div class="applic bar body--toolbar">
    <div class="applic bar-row">

      <div class="applic bar-section align-start">
        <div class="applic menu-bar">
          <button class="applic menu-bar-item icon-button" 
            applc-hint="Select All ⌘ + A" applc-hint-align="bottom">
            <i class="applic icon">select_all</i>
          </button>
        </div>
      </div>

      <div class="applic bar-section align-end">
        <div class="applic menu-bar">

          <button class="applic menu-bar-item button">Customize
          </button>
          <button class="applic menu-bar-item button">Export All
          </button>

          <div class="applic menu-bar-divider"></div>

          <button class="applic menu-bar-item icon-button" 
            applc-hint="Grid View" applc-hint-align="bottom">
            <i class="applic icon">view_comfy</i>
          </button>
          <button class="applic menu-bar-item icon-button" 
            applc-hint="Fine-Tuning" applc-hint-align="bottom">
            <i class="applic icon">tune</i>
          </button>

        </div>
      </div>
    </div>
  </div>

  <div class="applic wrap">
    <div class="applic aside">
      ${template.usercard(model, state)}
    </div>
    <div class="applic main">

    
    </div>
  </div>

`;

const handlers = {};
const template = {};
template.usercard = (model, state) => html`
  <style>
    .applic.usercard {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--vertical')} 

      width: 100%;
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
