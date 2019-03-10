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

  .applic.aside--header {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex-none')} 

    min-height: 96px;

    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    background: #f1f4f6; }

  .applic.aside--inner {
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex')} 

    padding: 8px 0;

    border-right: 1px solid #e6e6e6;
    background: #fafafa; }

  .applic.main {
    ${css.apply('--stance--relative')} 
    ${css.apply('--layout--sizing--content-box')} 
    ${css.apply('--layout--vertical')} 
    ${css.apply('--layout--flex')} 

    background: #fafafa; }

  .applic.name {
    ${css.apply('--layout--sizing--border-box')} 
    ${css.apply('--layout--horizontal')} 
    ${css.apply('--layout--center')} 
    ${css.apply('--layout--felx-none')} 
    ${css.apply('--typo--subtitle2')}

    padding: 0 24px;
    height: 48px; }

</style>


<div class="applic wrap">
  <div class="applic aside">
    <div class="applic aside--header">
      <div class="flex-spacer"></div>
      <div class="applic name">${'Contrast Tool'.toUpperCase()}</div>
     

    </div>

    <div class="applic aside--inner">

      ${model.usercard({
        email: 'mihroy.rikkunbrouwers@gmail.com',
        label: 'Last sync on 03/03/2019 1:38pm'
      })}
<!--

      <div class="applic menu-list">
        <button class="applic menu-list-item button">
          <i class="applic icon">folder</i>
          <div>Brainstorming</div>
        </button>
        <button class="applic menu-list-item button">
          <i class="applic icon">folder</i>
          <div>Work</div>
        </button>
        <button class="applic menu-list-item button">
          <i class="applic icon">folder</i>
          <div>Work</div>
        </button>
        <button class="applic menu-list-item button">
          <i class="applic icon">folder</i>
          <div>Uncategorized</div>
        </button>

        <button class="applic menu-list-item button">
          <i class="applic icon">edit</i>
          <div>Manage Categories</div>
        </button>
        </div>
        -->

    </div>
  
  </div>

  <div class="applic main">
    <button class="applic fab"
      applc-hint="Add Card"
      applc-hint-align="start">
      <i class="applic icon">add</i>
    </button>

    <div class="applic bar body--toolbar">
      <div class="applic bar-row">

        <div class="applic bar-section align-start">
          <div class="applic menu-bar">
            <button class="applic menu-bar-item icon-button" applc-hint="Select All"
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

            <button class="applic menu-bar-item icon-button" 
              applc-hint="Notifications"
              applc-hint-align="bottom">
              <i class="applic icon">notifications_none</i>
            </button>
            <button class="applic menu-bar-item icon-button" 
              applc-hint="Grid View"
              applc-hint-align="bottom">
              <i class="applic icon">search</i>
            </button>
            <button class="applic menu-bar-item icon-button" 
              applc-hint="More Options"
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
