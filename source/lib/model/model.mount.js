/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

// import {html} from 'lit-html';
import { html } from 'lit-element';

export const model = function () {
  return html`
    <style>
      * { ${this.css.apply('--typo--noselect')} }

      :host {
        ${this.css.apply('--layout--sizing--content-box')} 
        ${this.css.apply('--layout--vertical')}
        ${this.css.apply('--layout--flex')}
    
        transition: opacity 0ms;
        opacity: 0; 

        background: #f4f4f4; } 

      ${applic.dev.overflow ? `

      ` : ``}


      :host(:not([unresolved])) {
        opacity: 1; 
        transition: opacity 150ms cubic-bezier(0.4, 0.0, 1, 1); } 

    </style>

 

  `
}
