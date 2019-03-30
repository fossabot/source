/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicIcon extends LitElement {
  static get properties() {
    return {
      name: ''
    };
  }

  render() {
    return html`
      <style>
        :host {
          --icon-size: 24px;
          --icon-color: #bfbfbf;

          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 
          ${applic.$.css.apply('--typo--noselect')} 

          height: var(--icon-size);
          width: var(--icon-size);
                
          font-family: 'Material Icons Sharp', 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: var(--icon-size);

          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap; 
        
          color: var(--icon-color); }

          
        :host([size="dense"]) { 
          --icon-size: 20px;
          margin: -4px;
        }
        :host([size="huge"]) {--icon-size: 64px; }

      </style>

      ${this.name}
    `;
  }
  constructor() {
    super();
  }
}

customElements.define('applic-icon', ApplicIcon);