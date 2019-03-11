/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const module = {
  'applic::overline': (css) => `
    .applic.overline {
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
      ${css.apply('--layout--flex-none')}
      
      height: 36px;
      margin: .0px;
    }

    .applic.overline-start {
      margin: 0 16px 0 0;
    }

    .applic.overline .overline-line {
      ${css.apply('--layout')}
      ${css.apply('--layout--flex')}
      
      height: 1px;
      background: #dedede;
    }

  `,
};
