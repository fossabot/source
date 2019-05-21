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
        z-index: 1;
        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--stance--fixed')}
        ${css.apply('--stance--pin--top')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--flex-none')}

        height: var(--wireframe-toolbar--dense);

        background: #2C2F33;
        border-bottom: var(--applic-line);

        transition: height 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      :host([is-guide]) .wireframe.toolbar {
        height: var(--wireframe-toolbar--large);
      }

      .wireframe.toolbar-item,
      .wireframe.toolbar-action {
        z-index: 10;

        ${css.apply('--layout--sizing--border-box')}
        ${css.apply('--layout--horizontal')}
        ${css.apply('--layout--center-center')}
        ${css.apply('--layout--flex-none')}

        ${css.apply('--typo--button')}
        color: #fff;

        height: var(--wireframe-toolbar--dense);
        padding: 0px 6px;
        cursor: pointer;
      }

      .wireframe.toolbar-action {
        width: 78px;
        padding: 0px 6px 0px 6px;
        transition: width 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      :host([is-guide]) .wireframe.toolbar-action {
        width: 36px;
      }

    </style>

    <div class="wireframe toolbar">
      <a class="wireframe toolbar-action" 
        click=""
        href="${this.viewmode == 'guide' ? '#/' : '#/guide/introduction'}">
        <applic-icon name="${this.viewmode == 'guide' ? 'arrow_back' : 'explore'}" size="dense">
        </applic-icon>
      </a>

    </div>
  `
}
