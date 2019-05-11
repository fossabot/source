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
      .banner-card {
         ${this.css.apply('--stance--absolute')}
         ${this.css.apply('--stance--pin--top')}

         height: 48px;
         width: 100vw;
         margin: 0px;
      }
      
      .banner-card--inner {
        ${this.css.apply('--layout--sizing--border-box')}
        ${this.css.apply('--stance--realtive')}

        width: 100%;
        margin: 0px;

        padding:  0px 0px; 
        height: calc(48px - var(--applic-line--width));

        background: #fbfbfb;
      }

      .banner-card--wrap {
        ${this.css.apply('--layout--horizontal')}
        ${this.css.apply('--layout--center')}
        
        margin-bottom: calc(0px - var(--applic-line--width));
        height: calc(100% + var(--applic-line--width));
        width: 100%;
      }

      .banner-card--inner:before {
        content: '';
        ${this.css.apply('--stance--absolute')}
        ${this.css.apply('--stance--fit')}

        z-index: -1;
        margin: 0px;
        background: linear-gradient(to right,  #202224, #4a84ff);
      }


    </style>

    <div class="banner-card">
      <div class="banner-card--inner">
         <div class="banner-card--wrap">

         </div>
      </div>
    </div>
  `
}
