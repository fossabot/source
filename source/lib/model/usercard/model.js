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
    .applic.usercard {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--center')} 

      padding: 16px 8px;
      margin: 8px;

      background: #ffffff;
      border: 1px solid #d1d9db;
      border-radius: 4px; }

    .applic.usercard-icon{
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--center-center')} 
      
      height: 48px;
      width: 48px;

      background: #f6f8f8;
      border: 1px solid #d1d9db;
      border-radius: 50%; }


    .applic.usercard-user {
      ${css.apply('--layout--vertical')} 
      ${css.apply('--layout--flex')}
      margin: 0 0 0 8px; 
    }

    .applic.usercard-user--name {
      ${css.apply('--typo--body2')}
    }
    .applic.usercard-user--detail {
      ${css.apply('--typo--caption')}
    }

    .applic.usercard-storage {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--stance--relative')} 

      height: 4px;
      width: 100%;
      margin: 4px 0 0 0; 

      background: #e0e5e6; }
    
    .applic.usercard-storage > * {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--stance--absolute')} 
      ${css.apply('--stance--pin--start')} 

      height: 100%; }

    .applic.usercard-storage > .saved {
      opacity: 1;
      background: #6d98fb; 
      width: 60%; }
    
  </style>
    

  <div class="applic usercard">
    <div class="applic usercard-icon">
    </div>

    <div class="applic usercard-user">
      <div class="applic usercard-user--name">Rikkun Brouwers
      </div>
      <div class="applic usercard-user--detail">rikkunbrouwers@gmail.com
      </div>

      <div class="applic usercard-storage">
        <div class="saved"></div>
      </div>
    </div>
  </div>
`;
