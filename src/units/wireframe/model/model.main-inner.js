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
      ._grid {
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--wrap')}

        ${css.apply('--layout--sizing--border-box')}

        width: 100%;

        margin: 0px 0px;
        padding: calc(var(--side-sheet--gutter-size) / 2); }

      ._grid-item {
        ${css.apply('--stance--relative')}
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--flex-none')}

        width: calc(
          var(--side-sheet--column-size) +
          var(--side-sheet--gutter-size) +
          var(--side-sheet--column-size) -
          0.1px
        );

        margin: calc(var(--side-sheet--gutter-size) / 2);
        padding: 0px 12px;

        border: 1px solid #d6d6d6;
        border-radius: 6px;
        background: #ffffff; }

      ._grid-item--header {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center')}

        height: 36px; 
        width: 100%;
        padding: 0px 4px; }

      ._grid-item--titel {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center')}

        ${css.apply('--typo')}
        ${css.apply('--typo--nowrap')}

        font-size: 13px;
        line-height: 20px;
        font-weight: 400;
        letter-spacing: 0.06px;
        color: #252525; }

      ._grid-item--graphic {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--vertical')}

        width: 100%; }

      ._grid-item--detail {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex-none')}
        ${css.apply('--layout--vertical')}
      
        ${css.apply('--typo--caption')}
        ${css.apply('--typo--nowrap')} 
        
        ${css.apply('--typo')}
        ${css.apply('--typo--nowrap')}

        font-size: 9px;
        line-height: 12px;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #909090;

        border-top: 1px solid #d6d6d6;

        width: 100%;
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
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--flex')}
        ${css.apply('--layout--vertical')}

        padding: 10px 20px; }

      ._grid-item--action { 
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center')}

        margin: 0 -8px 0 0;
      }
      ._grid-item:not(:hover) ._grid-item--action { 
        opacity: 0;
      }

      ._emty {
        ${css.apply('--stance--absolute')}
        ${css.apply('--stance--fit')}
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center-center')} 
      
        margin-top: 56px; }

      ._emty--graphic {
        margin: -64px 0px 20px; }

      ._emty--info {
        ${css.apply('--typo')}
        font-size: 13px;
        line-height: 1;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #b8b8b8; }

      ._emty--detail {
        ${css.apply('--typo')}

        margin-top: 56px;

        font-size: 13px;
        line-height: 1;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #b8b8b8; }

    </style>
   

    ${0 < this.graphic.length ? html`
      <div class="_grid">
        ${this.graphic.map(_graphic => html`
          <div class="_grid-item">
            <div class="_grid-item--header">
              <div class="_grid-item--titel">${_graphic.alias}</div>

              <div class="_grid-item--action">
                <applic-icon-button icon="close" size="dense"
                  @click="${this.call('graphic:remove', { nonce: _graphic.nonce })}">
                  <applic-hint>Remove "${_graphic.alias}"</applic-hint>
                </applic-icon-button>
              </div>

            </div>

            <applic-graphic nonce="${_graphic.nonce}" class="_grid-item--graphic">
            </applic-graphic>

            <div class="_grid-item--detail">
              <span>Imported: ${applic.utils.readable.date(_graphic.detail.created)}</span>
              <span>Modified: ${applic.utils.readable.date(_graphic.detail.lastModified)}</span>

            </div>
        
          </div>

        `)}

      </div>
      
    ` : html`
      <div class="_emty">
        <applic-icon class="_emty--graphic" name="recent_actors" size="huge"></applic-icon>
        <div class="_emty--info">No graphics</div>
        <div class="_emty--detail">Drag .png, .svg, and .gif files here</div>
      </div>
    `}
  `
}
