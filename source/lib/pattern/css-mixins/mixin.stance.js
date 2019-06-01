/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export const mixins = {
  '--stance--relative': () => `
    position: relative;
  `,
  '--stance--absolute': () => `
    position: absolute;
  `,
  '--stance--fixed': () => `
    position: fixed;
  `,

  '--stance--fit': () => `
    top: .0px;
    right: .0px;
    bottom: .0px;
    left: .0px;
  `,

  '--stance--pin--top': () => `
    top: .0px;    
    right: .0px; 
    left: .0px;

  `,
  '--stance--pin--top-end': () => `
    top: .0px;
    right: .0px;
  `,
  '--stance--pin--end': () => `
    top: .0px;    
    right: .0px;
    bottom: .0px;
  `,
  '--stance--pin--bottom-end': () => `
    right: .0px; bottom: .0px;
  `,
  '--stance--pin--bottom': () => `
    right: .0px; 
    bottom: .0px;
    left: .0px;
  `,
  '--stance--pin--bottom-start': () => `
    bottom: .0px; left: .0px;
  `,
  '--stance--pin--start': () => `
    top: .0px;
    bottom: .0px;
    left: .0px;
  `,
  '--stance--pin--top-start': () => `
    top: .0px; left: .0px;
  `,

};
