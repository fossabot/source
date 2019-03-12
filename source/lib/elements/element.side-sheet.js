/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicSideSheet extends LitElement {
  static get properties() {
    return {
      open: false,
      _expand: `250ms cubic-bezier(0.0, 0.0, 0.2, 1);`,
      _collapse: `200ms cubic-bezier(0.4, 0.0, 1, 1);`
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          height: calc(100% + 56px);
          margin: -28px 0 -28px -320px;
          padding: 28px 0;

          overflow: hidden; }

      </style>

      <slot></slot>
    `;
  }
  constructor() {
    super();

    window.addEventListener('resize', this._update.bind(this));
  }

  firstUpdated() {
    this.parentElement.style.marginLeft = '320px'
  }

  toggle() {
    this.open = !this.open;
  }

  updated() {
    console.log(this.open ? 'sheet-open' : 'sheet-close')
    // this.dispatchEvent(new Event(this.open ? 'sheet-open' : 'sheet-close'))
    this.parentElement.style.marginLeft = this.open ? '320px' : '0px'

    this.dispatchEvent(new Event('sheet-changed'));
  }

  async _update() {
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-side-sheet', ApplicSideSheet);
