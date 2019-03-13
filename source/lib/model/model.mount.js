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
    html { background: #eeeeee; }
    * { ${$.css.apply('--typo--noselect')} }

    .applic.mount {
      ${$.css.apply('--layout--sizing--content-box')} 
      ${$.css.apply('--stance--fixed')}
      ${$.css.apply('--stance--fit')}
      ${$.css.apply('--layout--vertical')}
      ${$.css.apply('--layout--overflow-none')} 
   
      ${applic.dev.overflow ? `
        margin: 78px 112px 48px 112px;
        margin-top: ${applic.dev.standalone ? '130px' : '100px'}
      ` : `
        margin: 0px 0px 0px 0px;
        margin-top: ${applic.dev.standalone ? '30px' : '0px'};
      `}

      transition: opacity 0ms;
      opacity: 0; 

      background: #f4f4f4; } 

    ${applic.dev.overflow ? `
      .applic.mount {
        transform: scale(${(self.innerWidth - 120) / self.innerWidth});
      }

      .applic.mount:after {
        ${$.css.apply('--stance--absolute')}
        ${$.css.apply('--stance--fit')}
        top: -${applic.dev.standalone ? '30px' : '0px'}; 
        
        z-index: 20; 
        content: '';

        outline: 10px solid rgba(255,90,90,.2);
        pointer-events: none; }

    ` : ``}

    .applic.mount:not([unresolved]) {
      opacity: 1; 
      transition: opacity 150ms cubic-bezier(0.4, 0.0, 1, 1); } 

    *[hidden] { display: none !important; }
  </style>

  ${applic.dev.standalone ? template.window($) : ''}

  ${$.model.body($)}
  ${$.model.overlay($)}
`;


const template = {};
template.window = ($) => html`
  <style>
    ${$.css.include('applic::icon')}
    ${$.css.include('applic::button')}

    .applic.mount { margin: 30px; }

    .applic.win-drag {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top')} 
      top: -30px;

      -webkit-user-select: none;
      -webkit-app-region: drag;
      
      height: 30px; 
      background: rgba(0,0,0, .6);
      z-index: 20; }

    .applic.win-edge {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--fit')}
      top: -30px;

      z-index: 20; 
      pointer-events: none; }

    .applic.win-edge > * {
      min-width: 1px;
      min-height: 1px;
      background: rgba(0,0,0,.12); 

      pointer-events: all; }

    .applic.win-edge--top {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--top')} }
    .applic.win-edge--bottom {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--bottom')} }
    .applic.win-edge--start {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--start')} }
    .applic.win-edge--end {
      ${$.css.apply('--stance--absolute')}
      ${$.css.apply('--stance--pin--end')} }

    .applic.win-controls {
      ${$.css.apply('--layout--flex-none')}
      ${$.css.apply('--layout--horizontal')}
      ${$.css.apply('--layout--center')}

      z-index: 20; }
      
    .applic.win-controls applic-icon {
      color: #ffffff; }
      
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
      <applic-icon name="arrow_back" size="dense"></applic-icon>
    </applic-button>
  </div>
  
  <div class="applic win-controls align-end">
    <applic-button dense>
      <applic-icon name="remove" size="dense"></applic-icon>
    </applic-button>
    <applic-button dense>
      <applic-icon name="crop_square" size="dense"></applic-icon>
    </applic-button>
    <applic-button dense>
      <applic-icon name="close" size="dense"></applic-icon>
    </applic-button>
  </div>

  <div class="applic win-edge">
    <div class="applic win-edge--top"></div>
    <div class="applic win-edge--bottom"></div>
    <div class="applic win-edge--start"></div>
    <div class="applic win-edge--end"></div>
  </div>
`;
