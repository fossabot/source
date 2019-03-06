/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const modules = {
  'applic::backdrop': () => `
    .applic.backdrop {
      ${css.apply('--stance--absolute')}
      ${css.apply('--stance--fit')}
      
      pointer-events: none;
      z-index: -1;
    }

    
    .applic.scrim {
      background-color: var(--scheme--scrim);
    }
    .applic.backdrop {
      background-color: var(--scheme--backdrop);
    }
    .applic.backdrop.canvas {
      background-color: var(--scheme--backdrop-canvas);
    }
    .applic.backdrop.deepen {
      background-color: var(--scheme--backdrop-deepen);
    }

  `,
};