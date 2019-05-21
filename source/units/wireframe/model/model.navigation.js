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
      .wireframe.navigation {
        ${css.apply('--layout--flex-none')}

        width: var(--wireframe-nav--dense);
        margin: 0px 0px 0px 0px;

        transition: 
          margin 250ms cubic-bezier(0.4, 0.0, 0.2, 1),
          width 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      :host([is-guide]) .wireframe.navigation {
        width: var(--wireframe-nav--large);
        margin: calc(var(--wireframe-toolbar--large) - 36px) 0px 0px 0px;
      }

      .wireframe.navigation-item {

      }

    </style>

    <div class="wireframe navigation">
    
    </div>
  `
}
