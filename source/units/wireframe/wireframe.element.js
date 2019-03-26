/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html as litHtml } from 'lit-element';

class ApplicWireframe extends LitElement {
   static get properties() {
      return {};
   }

   render() {
      return litHtml`
      <style> 
        *[hidden] { display: none !important; } 
        * { ${css.apply('--typo--noselect')} }

        :host {
          ${css.apply('--layout--sizing--content-box')} 
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex')}
      
          transition: opacity 0ms;
          opacity: 0; 

          background: #f4f4f4; } 

        :host(:not([unresolved])) {
          opacity: 1; 
          transition: opacity 100ms 0ms cubic-bezier(0.4, 0.0, 1, 1); } 

        :host([unresolved]) {
          opacity: 0; 
          transition: opacity 100ms 0ms cubic-bezier(0.4, 0.0, 1, 1); } 
  

        ._wrap {
          ${css.apply('--layout--sizing--border-box')} 

          ${css.apply('--stance--relative')}
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex-none')}

          height: 100%;
        }

      </style>

      <div class="_wrap">
        No modules

      </div>

    `;
   }


   constructor() {
      super();

   }

}

customElements.define('applic-wireframe', ApplicWireframe);

applic.__proto__.$ = new ApplicWireframe();
document.body.appendChild(applic.$);
