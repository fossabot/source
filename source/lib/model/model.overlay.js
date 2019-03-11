/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = ($) => html`
  <style>
    .applic.olverlay {
      z-index: 18;
    }

  </style>
  
  <div class="applic olverlay">
    <applic-fab icon="add" pin="end"
      applc-hint="New Card"
      applc-hint-align="start">
    </applic-fab>

    ${$.model.hint($)}

  </div>

`;
