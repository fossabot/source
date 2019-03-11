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

          overflow: hidden; }

        :host([flex-none]) { 
          ${applic.$.css.apply('--layout-flex--none')} 
        }
        
        
        ._wrap {
          ${applic.$.css.apply('--layout--block')} 
          ${applic.$.css.apply('--layout--sizing--border-box')} 

          -webkit-overflow-scrolling: touch;
          overflow: -moz-scrollbars-none;
          overflow: scroll;

          min-height: calc(100% + ${this.height}px);
          max-height: calc(100% + ${this.height}px);
          min-width: calc(100% + ${this.width}px); 
          max-width: calc(100% + ${this.width}px); 
        
          margin: 0 ${-this.width}px ${-this.height}px 0; }

        ._wrap-inner {
          ${applic.$.css.apply('--layout--block')} 
          ${applic.$.css.apply('--layout--sizing--content-box')} 

          padding: 0 ${this.width_add}px ${this.height_add}px 0; }



       ._scroll-bar {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--layout--vertical')} 

          padding: 5px;
       }
       ._scroll-bar._scroll-bar--x {
          ${applic.$.css.apply('--stance--pin--bottom-start')} 
          
          width: ${this.scroll_size_x}px;
          height: 13px;
          margin: 0px 0px ${this.width_add}px ${this.scroll_x}px; }

        ._scroll-bar._scroll-bar--y {
          ${applic.$.css.apply('--stance--pin--top-end')} 
          
          width: 13px;
          height: ${this.scroll_size_y}px;
          margin: ${this.scroll_y}px 0px 0px; }

 

        ._scroll-bar > div {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--layout--flex')} 

          height: calc(100% - 10px);
          width: calc(100% - 10px);

          opacity: 1;
          transition: opacity 125ms linear;

          border-radius: 1.5px;
          background: rgba(0,0,0,0.23); }

        ._scroll-bar[hide] > div {
          opacity: 0;
          transition: opacity 125ms linear;
        }

      </style>

      <div class="_wrap">
        <div class="_wrap-inner">
          <slot></slot>
        </div>
      </div>

      <div ?hide="${!this.scroll_show || !this.scroll_x_active}" class="_scroll-bar _scroll-bar--x"><div></div></div>
      <div ?hide="${!this.scroll_show || !this.scroll_y_active}" class="_scroll-bar _scroll-bar--y"><div></div></div>
    `;
  }
  constructor() {
    super();

    window.addEventListener('resize', this._reset.bind(this));
    window.addEventListener('resize', this._update.bind(this));


  }

  firstUpdated() {
    this.scroll_show = false;

    Promise.resolve().then(this._reset.bind(this));

    const $_wrap = this.shadowRoot.querySelector('._wrap');

    $_wrap.addEventListener('scroll', this._update.bind(this));
    $_wrap.addEventListener('scroll', this._trigger.bind(this));
    $_wrap.addEventListener('mouseover', this._trigger.bind(this));
  }

  _trigger() {
    if (!this.scroll_show) {
      this.scroll_show = true;
      this.requestUpdate();
    };

    this._spleep();
  }
  _spleep() {
    clearTimeout(this._sleepTimer)
    this._sleepTimer = setTimeout(() => {
      this.scroll_show = false;
      this.requestUpdate();
    }, 2000);
  }

  async _update() {

    const $_wrap = this.shadowRoot.querySelector('._wrap');

    const xLimit = $_wrap.scrollWidth - $_wrap.clientWidth;
    const yLimit = $_wrap.scrollHeight - $_wrap.clientHeight;

    const xSize = Math.max(48, $_wrap.clientWidth * ($_wrap.clientWidth / $_wrap.scrollWidth));
    const ySize = Math.max(48, $_wrap.clientHeight * ($_wrap.clientHeight / $_wrap.scrollHeight));

    const x = ($_wrap.clientWidth - xSize) / 100 * Math.floor(($_wrap.scrollLeft / xLimit || 0) * 100);
    const y = ($_wrap.clientHeight - ySize) / 100 * Math.floor(($_wrap.scrollTop / yLimit || 0) * 100);

    this.scroll_x_active = $_wrap.scrollWidth != $_wrap.clientWidth;
    this.scroll_y_active = $_wrap.scrollHeight != $_wrap.clientHeight;
    this.scroll_x = x;
    this.scroll_y = y;
    this.scroll_size_x = xSize;
    this.scroll_size_y = ySize;

    // console.log(this.scroll_y)
    // console.log(this.scroll_size_y)

    await this.updateComplete;
    this.requestUpdate();
  }



  async _reset() {
    const $_wrap = this.shadowRoot.querySelector('._wrap');

    const _scrollbar_width = $_wrap.offsetWidth - $_wrap.clientWidth;
    const _add = _scrollbar_width <= 1 ? 20 : 0;

    if (this.width == _scrollbar_width + _add) return;

    this.width = _scrollbar_width + _add;
    this.width_add = _add;
    this.height = _scrollbar_width;
    this.height_add = 0;

    await this.updateComplete;
    this._update();
    this.requestUpdate();
  }
}

customElements.define('applic-scrollable', ApplicScrollable);
