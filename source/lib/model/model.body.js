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

    .main--header {
      ${$.css.apply('--layout--sizing--border-box')} 

      border-bottom: 1px solid #e6e6e6;
      background: #fafafa; }

    .main--inner {
      ${$.css.apply('--stance--relative')} 
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--layout--vertical')} 
      ${$.css.apply('--layout--flex')} }

  </style>

  ${template.aside($)}


  <div class="main--header applic bar body--toolbar">
    <div class="applic bar-row">

      <div class="applic bar-section align-start">

        <applic-icon-button icon="${$.state.sheet.opened ? 'chevron_left' : 'notes'}" tune="accent" size="narrow"
          @click="${() => { $.call('applic-wireframe:navigation-sheet:toggle') }}">
        </applic-icon-button>

      </div>

      <div class="applic bar-section align-end">

        <applic-button>Export</applic-button>

        <applic-icon-button icon="search" tune="accent">
        </applic-icon-button>

        <applic-icon-button icon="more_vert" size="narrow" tune="accent">
        </applic-icon-button>

      </div>
    </div>
  </div>

  
  <applic-fab icon="add" pin="end"
    applc-hint="New Card"
    applc-hint-align="start">
  </applic-fab>

  <applic-scrollable>

    ${true ? template.emty($, {
      label: 'No cards', icon: 'view_comfy',
      description: 'The cards you added will appear here.'
    }) : ''}

  </applic-scrollable>
`;

const handlers = {};
const template = {};

template.aside = ($) => html`
  <style>
    .applic.aside--header {
      border-bottom: 1px solid #e6e6e6;
      background: #f4f4f4; }

    .applic.aside--inner {
      background: #fafafa; }

    ._name {
      ${$.css.apply('--layout--sizing--border-box')} 
      ${$.css.apply('--layout--horizontal')} 
      ${$.css.apply('--layout--center')} 
      ${$.css.apply('--layout--felx-none')} 

      ${$.css.apply('--typo')}

      font-size: 13px;
      line-height: 22px;
      font-weight: 500;
      letter-spacing: -0.18px;
      text-transform: uppercase;
      
      color: #636364;

      padding: 0px 24px; }


  </style>

  <applic-side-sheet applis-role="navigation-sheet"
    @sheet-changed="${() => { $.update() }}">

    <div class="applic aside--header bar">
      <div class="applic bar-row dense">
        <div class="applic bar-section align-end">
          <!-- <applic-icon-button icon="settings" scheme=""></applic-icon-button> -->
        </div>
      </div>
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
          <span class="_name">Contrast Tool</span>
        </div>
      </div>
    </div>

    <applic-scrollable class="applic aside--inner">

      <applic-list>

        <applic-list-item>
          <applic-icon slot="graphic" name="folder_open" size="dense"></applic-icon>
          <span>Untitled</span>
          <span slot="meta" aria-hidden="true">
            <applic-icon name="cloud_off" size="dense"></applic-icon>
          </span>
        </applic-list-item>
        <applic-list-item>
          <applic-icon slot="graphic" name="folder_open" size="dense"></applic-icon>
          <span>Untitled</span>
          <span slot="meta" aria-hidden="true">
            <applic-icon name="cloud_off" size="dense"></applic-icon>
          </span>
        </applic-list-item>

        <div class="applic list-divider"></div>

        <applic-list-item>
          <applic-icon slot="graphic" name="folder_special" size="dense"></applic-icon>
          <span>Untitled</span>
          <span slot="meta" aria-hidden="true">18</span>
        </applic-list-item>

        <applic-list-collection>
          <span slot="label">More Folders</span>
          
          <applic-list-item>
            <applic-icon slot="graphic" name="folder" size="dense"></applic-icon>
            <span>Brainstorming</span>
            <span slot="meta" aria-hidden="true">42</span>
          </applic-list-item>
          <applic-list-item>
            <applic-icon slot="graphic" name="folder" size="dense"></applic-icon>
            <span>Work</span>
            <span slot="meta" aria-hidden="true">0</span>
          </applic-list-item>
          <applic-list-item>
            <applic-icon slot="graphic" name="folder" size="dense"></applic-icon>
            <span>Eryn</span>
            <span slot="meta" aria-hidden="true">7</span>
          </applic-list-item>
          <applic-list-item>
            <applic-icon slot="graphic" name="folder" size="dense"></applic-icon>
            <span>Uncategorized</span>
            <span slot="meta" aria-hidden="true">32</span>
          </applic-list-item>

          <applic-list-item>
            <applic-icon slot="graphic" name="edit" size="dense"></applic-icon>
            <span>Manage Collections</span>
            <span slot="meta" aria-hidden="true"></span>
          </applic-list-item>

        </applic-list-collection>

      </applic-list>


    </applic-scrollable>
  </applic-side-sheet>
`;

template.emty = ($, params) => html`
  <style>
    .applic.emty {
      ${$.css.apply('--stance--absolute')} 
      ${$.css.apply('--stance--fit')} 
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--layout--vertical')} 
      ${$.css.apply('--layout--center-center')} 

      margin: -56px 0px 0px;
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
