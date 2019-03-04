/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const modules = {
  'applic::outline': () => `
    .applic.outline {
      ${css.apply('--stance--absolute')}
      ${css.apply('--stance--fit')}
      pointer-events: none;
    }

    .applic.outline.align-top {
      border-top: 1px solid var(--scheme--edge);
    }
    .applic.outline.align-start {
      border-left: 1px solid var(--scheme--edge);
    }
    .applic.outline.align-bottom {
      border-bottom: 1px solid var(--scheme--edge);
    }
    .applic.outline.align-end {
      border-right: 1px solid var(--scheme--edge);
    }

  `,
};
