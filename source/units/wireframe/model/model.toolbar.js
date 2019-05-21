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
      .wireframe.toolbar {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--stance--fixed')}
        ${css.apply('--stance--pin--top')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--flex-none')}

        height: 28px;
        border-bottom: var(--applic-line);
      }

      .wireframe.toolbar-item {
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center-center')}
        ${css.apply('--layout--flex-none')}

        ${css.apply('--typo--button')}
        color: #fff;

        height: 100%;
        padding: 0px 4px;
        coursor: pointer;
      }

      ._guide {
        width: 72px;
      }

    </style>

    <div class="wireframe toolbar">
      <a href="#/guide/" class="wireframe toolbar-item _guide">
        Guide
      </a>

    </div>
  `
}
