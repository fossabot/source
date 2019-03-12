/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = ($) => html`
  <style>
    .applic.mount {
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--stance--fixed')}
      ${$.css.apply('--stance--fit')}
      ${$.css.apply('--layout--vertical')}
      ${$.css.apply('--layout--overflow-none')} 

      /* margin: 100px 100px 100px 100px; 
      margin-top: ${applic.standalone ? '130px' : '100px'};*/

      margin: 0px 0px 0px 0px; 
      margin-top: ${applic.standalone ? '30px' : '0px'};

      transition: opacity 0ms;
      opacity: 0; 

      background: #f4f4f4; 
      outline: 1px solid #d8d8d8;
      outline: 1px solid #d8d8d8; } 

    .applic.mount:not([unresolved]) {
      opacity: 1; 
      transition: opacity 150ms cubic-bezier(0.4, 0.0, 1, 1); } 

    *[hidden] { display: none !important; }
  </style>

  ${applic.standalone ? template.window($) : ''}

  ${$.model.body($)}
  ${$.model.overlay($)}
`;


const template = {};
template.window = ($) => html`
  <style>
    ${$.css.include('applic::icon')}
    ${$.css.include('applic::button')}

    .applic.win-drag {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top')} 
      top: -30px;

      -webkit-user-select: none;
      -webkit-app-region: drag;
      
      height: 30px; 
      background: rgba(0,0,0, .1);
      z-index: 20; }

    .applic.win-edge > * {
      min-width: 1px;
      min-height: 1px;
      background: #e6e6e6; }

    .applic.win-edge--top {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top')} 
      top: -30px;}
    .applic.win-edge--bottom {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--bottom')} }
    .applic.win-edge--start {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--start')}
      top: -30px; }
    .applic.win-edge--end {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--end')} 
      top: -30px;}

    .applic.win-controls {
      ${$.css.apply('--layout--flex-none')}
      ${$.css.apply('--layout--horizontal')}
      ${$.css.apply('--layout--center')}

      z-index: 20;
      background: #212022; }
      
    .applic.win-controls.align-start {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top-start')}
      top: -30px; }
    .applic.win-controls.align-end {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top-end')}
      top: -30px; }

  </style>
  
  <div class="applic win-drag"></div>
  
  <div class="applic win-controls align-start">
    <applic-button dense>
      <applic-icon name="arrow_back" size="dense"></applic-button>
    </applic-button>
  </div>
  
  <div class="applic win-controls align-end">
    <applic-button dense>
      <applic-icon name="remove" size="dense"></applic-button>
    </applic-button>
    <applic-button dense>
      <applic-icon name="crop_square" size="dense"></applic-button>
    </applic-button>
    <applic-button dense>
      <applic-icon name="close" size="dense"></applic-button>
    </applic-button>
  </div>

  <div class="applic win-edge">
    <div class="applic win-edge--top"></div>
    <div class="applic win-edge--bottom"></div>
    <div class="applic win-edge--start"></div>
    <div class="applic win-edge--end"></div>
  </div>
`;
