/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = (params) => html`
<style>
    .applic.usercard {
      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--vertical')} 
      ${css.apply('--layout--center-center')} 

      height: 56px;
      padding: 0 24px; }

    .applic.usercard-user--name {
      ${css.apply('--typo--body2')}
      width: 100%;
      color: #252525;
    }
    .applic.usercard-user--detail {
      ${css.apply('--typo--caption')}
      width: 100%;
      color: #979797;
    }
    
  </style>
 
  <div class="applic usercard">
    <div class="applic usercard-user--name">${params.email}</div>
    <div class="applic usercard-user--detail">${params.label}</div>
  </div>
`;
