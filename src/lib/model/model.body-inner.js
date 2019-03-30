/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { html } from 'lit-html';
// import { html } from 'lit-element';

export const model = function () {
  return html`
    <style>
      ._grid {
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--wrap')}

        ${this.css.apply('--layout--sizing--border-box')}

        width: 100%;

        margin: 0px 0px;
        padding: 4px; }

      ._grid-item {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--vertical')}
        ${this.css.apply('--layout--flex-none')}

        margin: 4px;
        padding: 0px 12px;

        border: 1px solid #d6d6d6;
        border-radius: 6px;
        background: #ffffff; }

      ._grid-item--titel {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex-none')}
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--center')}

        ${this.css.apply('--typo')}
        font-size: 13px;
        line-height: 20px;
        font-weight: 400;
        letter-spacing: 0.06px;
        color: #252525;

        height: 36px; 
        padding: 0px 4px; }

      ._grid-item--graphic {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex-none')}
        ${this.css.apply('--layout--vertical')}

        height: 144px;
        width: 144px; }

      ._grid-item--detail {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex-none')}
        ${this.css.apply('--layout--vertical')}
      
        ${applic.$.css.apply('--typo--caption')}
        ${applic.$.css.apply('--typo--nowrap')} 
        
        ${this.css.apply('--typo')}
        font-size: 9px;
        line-height: 12px;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #909090;

        border-top: 1px solid #d6d6d6;

        margin: 10px 0px 0px;
        padding: 6px 4px; }



      ._grid-item--graphic {
        background-color: #fafafa;
        background-image: 
          linear-gradient(45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(-45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #eaeaea 75%), 
          linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
        background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        background-size: 8px 8px; }

      ._grid-item--graphic {
        background: #f4f4f4; }

      ._grid-item--inner {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex')}
        ${this.css.apply('--layout--vertical')}

        padding: 10px 20px; }

      ._emty {
        ${this.css.apply('--stance--absolute')}
        ${this.css.apply('--stance--fit')}
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--vertical')}
        ${this.css.apply('--layout--center-center')} }

      ._emty--graphic {
        margin: -64px 0px 20px; }

      ._emty--info {
        ${this.css.apply('--typo')}
        font-size: 13px;
        line-height: 1;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #b8b8b8; }

    </style>
   

  

    ${this.get('section').map((_section) => !_section.active ? '' : html`
      ${_section.graphics ? html`
        <div class="_grid">
          ${_section.graphics.map((_graphic) => html`
            <div class="_grid-item">
              <div class="_grid-item--titel">Image</div>
              <applic-image uri="${_graphic.uri}" class="_grid-item--graphic"></applic-image>

              <div class="_grid-item--detail">
                <span>Modified: 1:13 pm</span>
                <span>Created: 1:13 pm</span>
              </div>

            </div>
          `)}
        </div>
      ` : html`
        <div class="_emty">
          <applic-icon class="_emty--graphic" name="view_comfy" size="huge"></applic-icon>
          <span class="_emty--info">No modules</span>
        </div>
      `}

    `)}
    
  `
}
