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
      .detail-card {
        ${this.css.apply('--stance--absolute')}
        ${this.css.apply('--stance--pin--bottom-end')}

        width: 480px;
        margin: 0px 20px;

        transition: 
          width 200ms 0ms cubic-bezier(0.4, 0.0, 0.2, 1), 
          margin 200ms 0ms cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      :host([dense]) .detail-card {
        width: 100vw;
        margin: 0px;
      }

      .detail-card--inner {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--stance--realtive')}

        width: calc(100% - var(--applic-line--width) * 2);
        margin: var(--applic-line--width) var(--applic-line--width) 0px var(--applic-line--width);
        padding:  0px 0px; 
        height: calc(64px - var(--applic-line--width));

        background: #fbfbfb;

        border-top: var(--applic-line--width) solid transparent;
        border-left: var(--applic-line--width) solid transparent;
        border-right: var(--applic-line--width) solid transparent;
        border-top-left-radius: calc(20px - var(--applic-line--width));
        border-top-right-radius: calc(20px - var(--applic-line--width));
      }

      .detail-card--wrap {
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--center')}
        margin: calc(0px - var(--applic-line--width));
        margin-bottom: 0px;
        height: calc(100% + var(--applic-line--width) * 2);
        width: calc(100% + var(--applic-line--width) * 2);
      }

      .detail-card--inner:before {
        content: '';
        ${this.css.apply('--stance--absolute')}
        ${this.css.apply('--stance--fit')}
        z-index: -1;
        margin: 0px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: linear-gradient(to right,  #202224, #4a84ff);
      }


    </style>

    <div class="detail-card">
      <div class="detail-card--inner">
        <div class="detail-card--wrap">
        </div>
      </div>
    </div>
  `
}
