/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';
import { css } from './wireframe.style.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicGrid extends LitElement {
  static get properties() {
    return { };
  }

  render() {
    return html`
      <style>
        :host {
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--vertical')}

          width: 100%;
          max-width: 100%; 
          margin: 0 0 0; }

        ._header {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          border-bottom: 1px solid #d6d6d6;

          height: 48px;
          margin: 0 16px; 
          padding: 0 4px; }

        ._header-actions {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          margin: 0 0 0 auto; }
/*
        :host(:not(:hover)) ._header-actions {
          opacity: 0; }

        :host(:hover) ._header-actions {
          opacity: 1; }
*/
        ._header ::slotted(*) {
          ${applic.$.css.apply('--typo')}

          font-size: 10px;
          line-height: 22px;
          font-weight: 500;
          letter-spacing: -0.6px;
          text-transform: uppercase;

          color: #979797; }



        ._list {
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--wrap')}

          width: 100%;
          max-width: 100%;

          overflow: visible;
          padding: calc(8px / 2); }


        ._list ::slotted(*) {
          ${css.apply('--layout--sizing--border-box')}
          ${css.apply('--layout--flex--none')}

          width: var(--grid-item--width);
          max-width: calc(100% - calc(8px / 2));

          margin: calc(8px / 2); }

      </style>

      <div class="_header">
        <slot name="label"></slot>
        <div class="_header-actions"><slot name="action"></slot></div>
      </div>

      <div class="_list">
        <slot></slot>
      </div>
    `;
  }

  constructor() {
    super();
    applic.on('applic:changed', this.updated.bind(this));
    self.addEventListener('resize', this.updated.bind(this), { passive: true })
  }

  firstUpdated() {

  }
  updated() {
    applic.utils.buffer(() => {
      let _width = this.offsetWidth, _colum = Math.round((_width / 180) - .5);
      _width -= 8 + .5;
      this.style.setProperty('--grid-item--width', `calc(${_width / _colum}px - ${8}px)`)
    })
  }

}

customElements.define('applic-gid', ApplicGrid);
