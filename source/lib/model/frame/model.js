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
    ${css.include('applic::bar')}
    ${css.include('applic::icon')}
    ${css.include('applic::icon-button')}
    ${css.include('applic::button')}
    ${css.include('applic::typography')}
  </style>
  <style>
    .applic.wrap { }

    .applic.body {
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--flex')}

      background: #eae9ea; }

    .applic.body--toolbar {
      background: #f6f8f8; }
      
  </style>
    
  ${model.header()}
  
  <div class="applic body">
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

    <div>
    
    </div>
  </div>
`;
