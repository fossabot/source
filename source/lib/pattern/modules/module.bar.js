/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const module = {
  'applic::bar': (css) => `
    .applic.bar {
      ${css.apply('--stance--relative')}
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout')}
      ${css.apply('--layout--vertical')}

      margin: -60px -30px 0 -30px;
      padding: 60px 30px 0 30px;
    }

    .flex-spacer {
      ${css.apply('--layout--flex')}
      pointer-events: none;
    }

    .applic.bar-row {
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
      
      height: 48px;
    }
    .applic.bar-row.dense {
      height: 45.5px;
    }

    .applic.bar-section {
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
    }

    .applic.bar-section.align-start {
      margin-right: auto;
    }
    .applic.bar-section.align-end {
      margin-left: auto;
    }

    .applic.menu-bar {
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
      ${css.apply('--layout--flex-none')}

      padding-right: 8px;
    }
   

    .applic.menu-bar-item{
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}

      margin-left: 8px;
      margin-right: 0px;
      padding: 0px 8px;
    }

    .applic.menu-bar-divider {
      margin-left: 16px;
      margin-right: 8px;

      height: 28px;
      width: 1px;
      background-color: #e6e6e6;
    }

    .applic.menu-list {
      ${css.apply('--layout--vertical')}
      ${css.apply('--layout--flex-none')}

      padding: 8px 0px;
    }
    .applic.menu-list-item {
      ${css.apply('--layout--flex-none')}
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .applic.menu-list-item {
      ${css.apply('--layout--flex-none')}
      margin-top: 0px;
      margin-bottom: 0px;

      color: #646464;
    }


    .applic.menu-list-divider {
      margin-top: 8px;
      margin-bottom: 8px;

      height: 1px;
      width: 24px;
      background-color: #e6e6e6;
    }

  `,
};
