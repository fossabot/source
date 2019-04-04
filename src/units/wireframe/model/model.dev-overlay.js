/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { html } from 'lit-html';
import { css } from '../wireframe.style.js';

export const model = function () {
  return html`
    <style>

      :host { margin: 60px 200px; overflow: visible !important; }
      :host:after {
        z-index: 10000000000; content: ''; pointer-events: none;

        ${this.css.apply('--stance--absolute')}
        ${this.css.apply('--stance--fit')}
        height: 100&; outline: 20px solid rgba(255, 0, 0, .2); }  


      ._layout {
        ${css.apply('--stance--absolute')}
        ${css.apply('--stance--fit')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--sizing--border-box')} 

        pointer-events: none; }


      ._layout--column { background: rgba(255, 0, 0, .12); }
      ._layout--gutter { background: rgba(0, 70, 255, .12); }
      ._layout--margin { background: rgba(0, 255, 0, .12); }

    </style>
   
   <div class="_layout">
      ${_drawColumn(this.layout)}
   </div>
    
  `
}


const _drawColumn = (_layout) => {
  let _map = '';

  const _addGutter = () => { _map += `<div class="_layout--gutter" style="width: ${_layout.gutter.size}px;"></div>`; }
  const _addColumn = () => { _map += `<div class="_layout--column" style="width: ${_layout.column.size}px;"></div>`; }
  const _addMargin = () => { _map += `<div class="_layout--margin" style="width: ${_layout.margin.size}px;"></div>`; }

  _addMargin();
  for (let i = 0; i < _layout.column.count; i++) {
    if (i != 0) _addGutter(); 
    _addColumn();
  };
  _addMargin();

  const _temp = document.createElement('template');
  _temp.innerHTML = _map;
  return _temp.content;
}