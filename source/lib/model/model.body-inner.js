/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { html } from 'lit-html';
// import { html } from 'lit-element';

export const model = function () {
  return html`
    <style>
      ._grid {
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--wrap')}

        margin: 0px 0px;
        padding: 0px 20px 0px 0px;
      }

      ._grid-item {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--flex-none')}

        margin: 0px 0px 20px 20px;
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        overflow: hidden; }

      ._grid-item--grafic {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex-none')}
        ${this.css.apply('--layout--vertical')}

        height: 128px;
        width: 128px; }

      ._grid-item--grafic {
        background-color: #fafafa;
        background-image: 
          linear-gradient(45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(-45deg, #eaeaea 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #eaeaea 75%), 
          linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
        background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        background-size: 16px 16px; }

      ._grid-item--inner {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--layout--flex')}
        ${this.css.apply('--layout--vertical')}

        width: 320px;

        padding: 10px 20px;

        border-left: 1px solid #e6e6e6;
        background: #fafafa; }

    </style>
   

  

    ${this.get('section').map((section) => html`
      <div class="applic bar">
        <div class="applic bar-row">

        </div>
      </div>

      <div class="_grid">
        ${this.get('section').map((section) => html`

          <div class="_grid-item">
            <div class="_grid-item--grafic">

            </div>

            <div class="_grid-item--inner">
              <span>${section.nonce}</span>

            </div>

          </div>

        `)}
      </div>
    `)}
    
  `
}
