/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const module = {
  'applic::button': (css) => `
    /*.applic.fab {
      ${css.apply('--stance--absolute')} 
      ${css.apply('--stance--pin--bottom-end')} 

      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--vertical')} 
      ${css.apply('--layout--center-center')} 
      ${css.apply('--layout--flex')} 
      
      height: 56px;
      width: 56px;
      margin: 16px;

      cursor: pointer; 
      outline: none;
      border: none;

      border-radius: 28px;
      color: #ffffff !important;
      background: #fbce61; }*/

    
    .applic.fab {
      ${css.apply('--stance--absolute')} 
      ${css.apply('--stance--pin--bottom-end')} 

      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--center-center')} 
      ${css.apply('--layout--flex')} 
      
      z-index: 1;

      height: 40px;
      min-width: 40px;
      margin: 16px;
      padding: 0 16px;

      cursor: pointer; 
      outline: none;
      border: none;

      border-radius: 20px;
      color: #ffffff !important;
      background: #fbce61; }

    .applic.fab > .fab--icon { 
      margin: 0 4px 0 -4px;
    }
    .applic.fab > .fab--label { 
    }

    .applic.icon-fab {
      ${css.apply('--stance--absolute')} 
      ${css.apply('--stance--pin--bottom-end')} 

      ${css.apply('--layout--sizing--border-box')} 
      ${css.apply('--layout--horizontal')} 
      ${css.apply('--layout--center-center')} 
      ${css.apply('--layout--flex')} 

      z-index: 1;
      
      height: 56px;
      width: 56px;
      margin: 16px;

      cursor: pointer; 
      outline: none;
      border: none;

      border-radius: 28px;
      color: #ffffff !important;
      background: #fbce61; }
      
    .applic.button {
      ${css.apply('--layout')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
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
  'applic::icon-button': (css) => `
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
