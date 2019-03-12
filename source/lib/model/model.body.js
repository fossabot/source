/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { html } from 'lit-html';

export const model = ($) => html`
  <style>
    ${$.css.include('applic::bar')}
    ${$.css.include('applic::icon')}
    ${$.css.include('applic::icon-button')}
    ${$.css.include('applic::button')}
    ${$.css.include('applic::typography')}
  </style>
  <style>
  .applic.wrap {
    ${$.css.apply('--layout--horizontal')} 
    ${$.css.apply('--layout--flex')} }


  .applic.main {
    ${$.css.apply('--stance--relative')} 
    ${$.css.apply('--layout--sizing--content-box')} 
    ${$.css.apply('--layout--vertical')} 
    ${$.css.apply('--layout--flex')} 
  
    background: #efefef; }

  .applic.main > .main--header {
    border-bottom: 1px solid #e6e6e6;
    background: #fafafa; }

  .applic.main > .main--inner {
    ${$.css.apply('--stance--relative')} 
    ${$.css.apply('--layout--sizing--content-box')} 
    ${$.css.apply('--layout--vertical')} 
    ${$.css.apply('--layout--flex')} }

  </style>

  ${template.aside($)}


  <div class="main--header applic bar body--toolbar">
    <div class="applic bar-row">

      <div class="applic bar-section align-start">

        <applic-icon-button icon="${$.state.sheet.opened ? 'chevron_left' : 'menu'}" 
          applc-hint="${$.state.sheet.opened ? 'Hide navigation' : 'Show navigation'}" 
          applc-hint-align="bottom"
          @click="${() => { $.call('applic-wireframe:navigation-sheet:toggle') }}">
        </applic-icon-button>

      </div>

      <div class="applic bar-section align-end">

        <applic-button>Export</applic-button>

        <applic-icon-button icon="search" 
          applc-hint="Search" 
          applc-hint-align="bottom">
        </applic-icon-button>

        <applic-icon-button icon="more_vert" size="narrow"
          applc-hint="More Options" 
          applc-hint-align="bottom">
        </applic-icon-button>

      </div>
    </div>
  </div>


  ${true ? template.emty($, {
  label: 'No cards', icon: 'view_comfy',
  description: 'The cards you added will appear here.'
}) : ''}

`;

const handlers = {};
const template = {};

template.aside = ($) => html`
  <style>
    .applic.aside {
      ${$.css.apply('--stance--absolute')} 
      ${$.css.apply('--stance--pin--start')} 
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--layout--vertical')}
      ${$.css.apply('--layout--flex-none')} 

      width: 320px;
      max-width: calc(100vw - 56px); }

    .applic.aside > .aside--header,
    .applic.aside > .main--header {
      margin-top: -28px;
      padding-top: 28px; }

    .applic.aside > .aside--header {
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--layout--vertical')} 
      ${$.css.apply('--layout--flex-none')} 

      min-height: 96px;

      border-bottom: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      background: #f4f4f4; }

    .applic.aside > .aside--inner {
      border-right: 1px solid #e6e6e6;
      background: #fafafa; }

    .applic.name {
      ${$.css.apply('--layout--sizing--border-box')} 
      ${$.css.apply('--layout--horizontal')} 
      ${$.css.apply('--layout--center')} 
      ${$.css.apply('--layout--felx-none')} 
      ${$.css.apply('--typo--subtitle2')}

      padding: 0 24px;
      height: 48px; }

  </style>

  <applic-side-sheet 
    applis-role="navigation-sheet" class="applic aside"
    @sheet-changed="${() => { $.update() }}">

    <div class="aside--header">
      <div class="flex-spacer"></div>
      <div class="applic name">${'Contrast Tool'.toUpperCase()}</div>
    </div>

    <applic-scrollable class="aside--inner">

      ${$.model.usercard($, {
  email: 'mihroy.rikkunbrouwers@gmail.com',
  label: 'Last sync on 03/03/2019 1:38pm'
})}

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

    </applic-scrollable>
  </applic-side-sheet>
`;

template.emty = ($, params) => html`
  <style>
    .applic.emty {
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--layout--vertical')} 
      ${$.css.apply('--layout--center')} 
      ${$.css.apply('--layout--flex-none')}  

      padding: calc(50vh - 128px) 0 0; 
      pointer-events: none; }
    
    .applic.emty > .emty--label {
      ${$.css.apply('--typo--body1')} 
      margin: 0 0 48px;
      color: #b8b8b8; }

    .applic.emty > .emty--description {
      ${$.css.apply('--typo--body2')} 
      color: #b8b8b8; }
      
  </style>

  <div class="applic emty">
    <applic-icon name="${params.icon}" size="huge">
    </applic-icon>
    <div class="emty--label">${params.label}</div>
    <div class="emty--description">${params.description}</div>
  </div>
`;
