/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicScrollable extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--stance--relative')} 
          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--flex')} 

          max-height: 100%;
          max-width: 100%;

          overflow: hidden;
          z-index: 0; }

        :host([flex-none]) { 
          ${applic.$.css.apply('--layout-flex--none')} 
        }
        
        
        ._wrap {
          ${applic.$.css.apply('--layout--block')} 
          ${applic.$.css.apply('--layout--sizing--border-box')} 

          -webkit-overflow-scrolling: touch;
          overflow: -moz-scrollbars-none;
          overflow: scroll;

          min-height: calc(100% + ${this.width});
          max-height: calc(100% + ${this.width});
          min-width: calc(100% + ${this.width}); 
          max-width: calc(100% + ${this.width}); 
        
          margin: 0 ${this.width__cut} ${this.width__cut} 0; }

        ._wrap-inner {
          ${applic.$.css.apply('--layout--block')} 
          ${applic.$.css.apply('--layout--sizing--content-box')} 

          padding: 0 ${this.width__add} ${this.width__add} 0; }


        ._scroll-bar {
          ${applic.$.css.apply('--layout--block')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--top-end')} 
          
          width: 3px;
          height: ${this.scroll_size_y - 10}px;
          margin: ${this.scroll_y + 5}px 5px 5px;
          
          border-radius: 1.5px;
          background: rgba(0,0,0,0.23); }

      </style>

      <div class="_wrap">
        <div class="_wrap-inner">
          <slot></slot>

          <div class="_scroll-bar"></div>
        </div>
      </div>
    `;
  }
  constructor() {
    super();
    console.log()
    window.addEventListener('resize', this._reset.bind(this));
    window.addEventListener('resize', this._update.bind(this));
  }

  firstUpdated() {
    Promise.resolve().then(this._reset.bind(this));
    Promise.resolve().then(this._update.bind(this));
  }

  async _update() {
    const $_wrap = this.shadowRoot.querySelector('._wrap');

    const xLimit = $_wrap.scrollWidth - $_wrap.clientWidth;
    const yLimit = $_wrap.scrollHeight - $_wrap.clientHeight;

    const xSize = Math.max(48, $_wrap.clientWidth * ($_wrap.clientWidth / $_wrap.scrollWidth));
    const ySize = Math.max(48, $_wrap.clientHeight * ($_wrap.clientHeight / $_wrap.scrollHeight));

    console.log(xSize)
    console.log(ySize)

    const x = ($_wrap.clientWidth - xSize) / 100 * Math.floor(($_wrap.scrollLeft / xLimit || 0) * 100);
    const y = ($_wrap.clientHeight - ySize) / 100 * Math.floor(($_wrap.scrollTop / yLimit || 0) * 100);

    this.scroll_x = x;
    this.scroll_y = y;
    this.scroll_size_x = xSize;
    this.scroll_size_y = ySize;

    // console.log(this.scroll_y)
    // console.log(this.scroll_size_y)

    await this.updateComplete;
    this.requestUpdate();
  }

  _scroll() {
    this._update();
  }

  async _reset() {
    const $_wrap = this.shadowRoot.querySelector('._wrap');

    $_wrap.addEventListener('scroll', this._scroll.bind(this));

    const _scrollbar_width = $_wrap.offsetWidth - $_wrap.clientWidth;
    const _add = _scrollbar_width <= 1 ? 20 : 0;

    if (this.width == _scrollbar_width + _add) return;

    this.width__cut = `-${_scrollbar_width + _add}px`;
    this.width = `${_scrollbar_width + _add}px`;
    this.width__add = `${_add}px`;

    await this.updateComplete;
    this.requestUpdate();
  }
}

customElements.define('applic-scrollable', ApplicScrollable);
