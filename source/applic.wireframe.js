/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import './lib/elements/all-elements.js'
import { html, render } from 'lit-html';

import './units/wireframe/wireframe.mount.js'
import './units/wireframe/wireframe.controller.js'


const _template = html`
  <applic-mount>

    <applic-scrollable>
      <div>
        <button 
          @click="${applic.request('applic:import', { type: 'file' })}">
          ${applic.localize('editor:import-new-files')}
        </button>
        <button 
          @click="${applic.request('applic:import', { type: 'directory' })}">
          ${applic.localize('editor:import-new-directory')}
        </button>
      <div>

      <div>

      </div>
      
    </applic-scrollable>

    <applic-controller>
      <div slot="controller:tools" style="height: 48px;">
        <div>controller:tools</div>
      </div>
      <div slot="controller:export" style="height: 480px;">
        <div>controller:export</div>
      </div>
    </applic-controller>

  </applic-mount>
`;

render(_template, document.body)


//   <applic-span class="caption">Checkbox</applic-span>
//   <applic-span class="sub-caption">
//     With a longer subtitle that wraps to another line
//   </applic-span>
// </applic-checkbox>

// <applic-button>
//   <applic-span slot="caption">Button</applic-span>
// </applic-button>

// <applic-icon-button>
//   <applic-icon slot="icon">menu</applic-icon>
// </applic-icon-button>
