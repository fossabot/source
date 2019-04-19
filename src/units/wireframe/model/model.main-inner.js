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
      ._grid-item,
      ._grid-item--cell {
        ${css.apply('--stance--relative')}
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')} }

      ._grid-item--cell {
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

      ._grid-item--selector { 
        ${css.apply('--stance--absolute')}
        ${css.apply('--stance--pin--top-start')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center')}

        z-index: 1;
        margin: -5px 0 0 -5px;
      }
      ._grid-item[selected] ._grid-item--cell { 
        transform: scale(0.92);
      }
      ._grid-item:not([selected]) ._grid-item--selector { 
        opacity: 0;
      }

      ._emty {
        ${css.apply('--stance--absolute')}
        ${css.apply('--stance--fit')}
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center-center')} 
        
        width: 100%;
        pointer-events: none; }

      ._emty--detail {
        ${css.apply('--typo')}

        margin-top: 48px;

        font-size: 13px;
        line-height: 1;
        font-weight: 400;
        letter-spacing: -0.14px;
        color: #b8b8b8; }

      ._grid {
        ${css.apply('--stance--relative')}
        min-height: 180px;
        width: 100%;
      }

    </style>

    ${(_section => { return !_section ? '' : 
      applic.graphic.types.map(_type => html`
        <applic-grid class="_grid"
          @drop="${this.call('applic:import-drag', { section: _section.nonce, type: _type.nonce })}">

          <span slot="label">${_type.name}</span>

          <applic-button slot="action" 
            @click="${this.call('applic:import', { section: _section.nonce, type: _type.nonce })}">Add File
          </applic-button>
          <applic-button slot="action" 
            @click="${this.call('applic:import-folder', { section: _section.nonce, type: _type.nonce })}">Add Folder
          </applic-button>

          ${(_graphics => {
            return !_graphics.length ? html`
                  <div class="_emty">
                    <div class="_emty--detail">Drag .png, .svg, and .gif files here</div>
                  </div>
                ` : _graphics.map(_graphic => html`

                  <div class="_grid-item"
                    @click="${this.call('graphic:update', { nonce: _graphic.nonce, value: { selected: !_graphic.selected } })}"
                    ?hidden="${_graphic.section != _section.nonce}"
                    ?selected="${_graphic.selected}">

                    <div class="_grid-item--selector">
                      <applic-icon-button icon="${_graphic.selected ? 'check_circle_outline' : 'radio_button_unchecked'}" size="dense">
                        <applic-hint>Select "${_graphic.alias}"</applic-hint>
                      </applic-icon-button>
                    </div>

                    <div class="_grid-item--cell">
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
                  </div>

                `);
          })(_section ? applic.graphic.get({ section: _section.nonce, type: _type.nonce }) : false)}
        </applic-grid>
      `)
    }) (applic.section ? applic.section.get('~') : false)}





    ${
    '' /*(_section => html`
      <applic-grid class="_grid">
        <span slot="label">Label</span>
        ${0 < this.graphic.length ? html`
          ${this.graphic.map(_graphic => html`
            <div class="_grid-item" ?hidden="${_graphic.section != _section.nonce}">
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
        ` : html`
          <div class="_emty">
            <applic-icon class="_emty--graphic" name="recent_actors" size="huge"></applic-icon>
            <div class="_emty--info">No graphics</div>
            <div class="_emty--detail">Drag .png, .svg, and .gif files here</div>
          </div>
        `}
      </applic-grid>
            
    `)(applic.section ? applic.section.get('~') : '') */}


  `
}
