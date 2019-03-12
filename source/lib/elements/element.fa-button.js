/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicFABtn extends LitElement {
  static get properties() {
    return {
      icon: ''
    };
  }

  render() {
    return html`
      <style>
        :host {
          --fab-size: 56px;
          --fab-color: #ff9569;

          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          ${applic.$.css.apply(`--elevation--2dp`)} 
          ${applic.$.css.apply('--typo--button')} 

          height: var(--fab-size);
          width: var(--fab-size);
          margin: 16px;
          z-index: 1;

          background: var(--fab-color); 
          border-radius: calc(var(--fab-size) / 2);

          cursor: pointer; }

        :host([pin="end"]) {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--bottom-end')} }

        :host([pin="start"]) {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--bottom-start')} }

        applic-icon { 
          color: #fff; }
        
      </style>

      <applic-icon name="${this.icon}"></applic-icon>
    `;
  }
  constructor() {
    super();
    this.setAttribute('aria-role', 'button');
  }
}

customElements.define('applic-fab', ApplicFABtn);
