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
  html {
    --app-aside--width: 320px;
  }

  .applic.wrap {
    ${css.apply('--layout--horizontal')} 
    ${css.apply('--layout--flex')} }

  .applic.aside {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')}
    ${css.apply('--layout--flex-none')} 

    width: var(--app-aside--width); }

  .applic.aside--inner {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex')} 

    border: 1px solid #e0e0e0;
    background: #f8f8f8; }

  .applic.aside--end {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex-none')} 
    
    height: 72px;
    border-right: 1px solid #e0e0e0;
    background: #ffffff; }

  .applic.main {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex')} 

    background: #fafafa; }

</style>


<div class="applic wrap">
  <div class="applic aside">
    <div class="applic aside--inner">
      ${model.usercard(model, state)}

      <div style="margin: 16px 16px;">
        <div class="typo headline5" style="margin: 0 0 8px;">Contrast Tool</div>
        <div class="typo body1" style="margin: 0 0 16px;">An interactive viewer to compare
          and export your chat graphics.</div>
        <div class="typo body1" style="margin: 0 0 16px;"></div>
      </div>

    </div>
    <div class="applic aside--end">

    </div>
  </div>

  <div class="applic main">
    <div class="applic bar body--toolbar">
      <div class="applic bar-row">

        <div class="applic bar-section align-start">
          <div class="applic menu-bar">
            <button class="applic menu-bar-item icon-button" applc-hint="Select All ⌘ + A"
              applc-hint-align="bottom">
              <i class="applic icon">select_all</i>
            </button>
          </div>
        </div>

        <div class="applic bar-section align-end">
          <div class="applic menu-bar">

            <button class="applic menu-bar-item button">Export All
            </button>

            <div class="applic menu-bar-divider"></div>

            <button class="applic menu-bar-item icon-button" applc-hint="Grid View"
              applc-hint-align="bottom">
              <i class="applic icon">notifications_none</i>
            </button>
            <button class="applic menu-bar-item icon-button" applc-hint="Grid View"
              applc-hint-align="bottom">
              <i class="applic icon">search</i>
            </button>
            <button class="applic menu-bar-item icon-button" applc-hint="More Options"
              applc-hint-align="bottom">
              <i class="applic icon">more_vert</i>
            </button>

          </div>
        </div>
      </div>
    </div>

  </div>

  ${state.cards.map((card) => html`
    ${model.usercard(card)}
  `)}

</div>
`;

const handlers = {};
const template = {};
