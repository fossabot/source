/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { html } from 'lit-html';
import { css } from '../wireframe.style.js';

export const model = function () {
   return html`
    <style>
      .ctrl.sheets {
        ${css.apply('--stance--relative')}
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center')}

        height: 100%;
        padding: 12px 0px 0px;
      }

      .ctrl.sheet-tab {
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center-center')}
        ${css.apply('--layout--flex-none')}

        border: none;
      }

      .ctrl.sheet-tab {
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center-center')}

        margin: 0px 0px 10px;
      }

      .ctrl.sheet-tab--canery {
        ${css.apply('--stance--relative')}

        height: 56px;
        width: 56px;
      }

      .ctrl.sheet-tab--detail {
        ${css.apply('--layout--vertical')}
        ${css.apply('--layout--center-center')}
        ${css.apply('--typo--hint')}
        
        color: #fff;
        height: 24px;
        width: 48px;
        border-top: 1px solid #1c1e21;
      }

    </style>

    <div class="ctrl sheets">
       
      <div class="ctrl sheet-tab" tabindex="0">
        <div class="ctrl sheet-tab--canery"></div>
        <span class="ctrl sheet-tab--detail">00</span>
      </div>
       
      <div class="ctrl sheet-tab" tabindex="0">
        <div class="ctrl sheet-tab--canery"></div>
        <span class="ctrl sheet-tab--detail">00</span>
      </div>

    </div>

  `
}
