/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export const module = {
  'applic::button': (css) => `
    .applic.button {
      ${css.apply('--stance--relative')}
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center-center')}

      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      height: 32px;
      padding: 0 16px;
      position: relative;
      margin: 0px 8px;
      
      background-color: white;
      border: 1px solid #dadce0;
      color: #5687fb;
    }

    .applic.button {
      ${css.apply('--stance--relative')}
      ${css.apply('--layout--flex-none')}
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center-center')}

      transition-duration: 200ms;
      transition-property: background-color, color, box-shadow, border;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .applic.button.is-primary {
      background-color: #5687fb;
      color: rgb(255, 255, 255);
      border: none;
    }

    .applic.button:disabled {
      background-color: rgb(241, 243, 244);
      color: rgb(128, 134, 139);
      border: none;
    }

    .applic.button:not(.is-primary):active:not(:disabled){
      outline: none;
      background-color: white;
      border-color: white;
      box-shadow: 
        0 1px 2px 0 rgba(60, 64, 67, 0.3), 
        0 3px 6px 2px rgba(60, 64, 67, 0.15);
    }

    .applic.button:not(:disabled){
      cursor: pointer;
    }


  `,
};
