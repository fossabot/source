/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const modules = {
  'applic::button': () => `
    .applic.button {
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center-center')}
      ${css.apply('--typo--button')}

      height: 36px;
      padding: 0 16px;
      cursor: pointer; 
      background: none;
      outline: none;
      border: none; }
    
    .applic.button.dense {
      height: 30px; }

    .applic.button {
      color: #949294; }
    .applic.button:focus,
    .applic.button:hover {
      color: #6e6d6f; }
    
  `,
  'applic::icon-button': () => `
    .applic.icon-button {
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center-center')}

      height: 40px;
      width: 40px;
      padding: 0 0;
      cursor: pointer; 
      background: none;
      outline: none;
      border: none; }

    .applic.icon-button {
      color: #949294; }
    .applic.icon-button:focus,
    .applic.icon-button:hover {
      color: #6e6d6f; }
    
  `,
};
