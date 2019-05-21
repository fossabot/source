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

        width: 72px;

        transition: width 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      .wireframe.navigation[is-guide]{
        width: 240px;
      }

      .wireframe.navigation-item {

      }

    </style>

    <div class="wireframe navigation" ?is-guide="${this.viewmode == 'guide'}">
      <a href="#/" class="wireframe navigation-item">

      </a>
    </div>
  `
}
