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
      ._aside.grid {
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--sizing--border-box')}

        width: 100%;

        margin: 0px 0px;
        padding: 4px; }

      ._aside.grid-item {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--flex-none')}

        margin: 4px;
        padding: 0px 12px; }

      ._aside.grid-item--titel {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center')}

        ${css.apply('--typo')}
        font-size: 13px;
        line-height: 20px;
        font-weight: 400;
        letter-spacing: 0.06px;
        color: #252525;

        height: 36px; 
        padding: 0px 4px; }

      ._aside.grid-item--graphic {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--vertical')}

        height: 144px;
        width: 100%; }

      ._aside.grid-item--detail {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--vertical')}
      
        ${css.apply('--typo--caption')}
        ${css.apply('--typo--nowrap')} 
        
        ${css.apply('--typo')}
        font-size: 9px;
        line-height: 12px;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #909090;

        border-top: 1px solid #d6d6d6;

        margin: 10px 0px 0px;
        padding: 6px 4px; }

      ._aside.grid-item--graphic {
        background-color: #fafafa;
        background-image: 
          linear-gradient(45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(-45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #eaeaea 75%), 
          linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
        background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        background-size: 8px 8px; }

      ._aside.grid-item--graphic {
        background: #f4f4f4; }

      ._aside.grid-item--inner {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex')}
        ${css.apply('--layout--vertical')}

        padding: 10px 20px; }

      ._aside.emty {
        ${css.apply('--stance--absolute')}
        ${css.apply('--stance--pin--bottom')}
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center')} 

        padding: 20px 0px; }

      ._aside.emty--info {
        ${css.apply('--typo')}
        font-size: 13px;
        line-height: 1;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #b8b8b8; }

    </style>
   
    <div class="_aside grid">
      ${(_graphics => {
        return !_graphics.length ? html`

        ` : _graphics.map(_graphic => html`

          <div class="_aside grid-item">
            <div class="_aside grid-item--titel">Image</div>
            <applic-image uri="${_graphic.uri}" aspect="1:1" class="_aside grid-item--graphic"></applic-image>

            <div class="_aside grid-item--detail">
              <span>Modified: 1:13 pm</span>
              <span>Created: 1:13 pm</span>
            </div>

          </div>
        `);
      })(this._selected)}
    </div>
    
  `
}
