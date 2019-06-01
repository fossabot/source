/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import './lib/elements/all-elements.js'

import './units/wireframe/wireframe.mount.js'


document.body.innerHTML = `
  <applic-mount>
    <applic-scrollable>

      <applic-checkbox>
        <applic-span class="caption">Checkbox</applic-span>
        <applic-span class="sub-caption">
          With a longer subtitle that wraps to another line
        </applic-span>
      </applic-checkbox>

      <applic-button>
        <applic-span slot="caption">Button</applic-span>
      </applic-button>

      <applic-icon-button>
        <applic-icon slot="icon">menu</applic-icon>
      </applic-icon-button>

    </applic-scrollable>
  </applic-mount>

`;
