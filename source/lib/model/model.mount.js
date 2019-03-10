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
    .applic.mount {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--fit')}
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--overflow-none')} 

      margin: 0px 0px 0px 0px; 
      padding: 0px 0px 0px 0px; }

    *[hidden] { display: none !important; }

    .applic.mount {
      opacity: 1; 
      transition: opacity ease-in 120ms; } 

    .applic.mount[unresolved] {
      transition: opacity ease-in 0ms;
      opacity: 0; } 

  </style>

  ${applic.standalone ? template.window() : ''}

  ${model.frame(model, state)}
  ${model.overlay(model, state)}
`;

const template = {};
template.window = () => html`
  <style>
    .applic.win-drag {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--top')} 
      -webkit-user-select: none;
      -webkit-app-region: drag;
      
      height: 12px; 
      z-index: 20; }

    .applic.win-edge > * {
      min-width: 1px;
      min-height: 1px;
      background: #e0e5e6; }

    .applic.win-edge--top {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--top')} }
    .applic.win-edge--bottom {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--bottom')} }
    .applic.win-edge--start {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--start')} }
    .applic.win-edge--end {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--end')} }

    .applic.win-controls {
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}

      z-index: 20;
      background: #212022; }
      
    .applic.win-controls.align-start {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--top-start')} }
    .applic.win-controls.align-end {
      ${css.apply('--stance--fixed')}
      ${css.apply('--stance--pin--top-end')} }

  </style>
  
  <div class="applic win-drag"></div>
  <div class="applic win-edge">
    <div class="applic win-edge--top"></div>
    <div class="applic win-edge--bottom"></div>
    <div class="applic win-edge--start"></div>
    <div class="applic win-edge--end"></div>
  </div>
  
  <div class="applic win-controls align-end">
    <button class="applic button dense">
      <i class="applic icon dense">remove</i>
    </button>
    <button class="applic button dense">
      <i class="applic icon dense">crop_square</i>
    </button>
    <button class="applic button dense">
      <i class="applic icon dense">close</i>
    </button>
  </div>
`;
