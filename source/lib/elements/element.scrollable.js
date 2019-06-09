/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../pattern/dom.style.js';

class ApplicScrollable extends LitElement {
  render() {
    return html`
      <style>
        :host {
          ${css.apply('--stance--relative')} 
          ${css.apply('--layout--sizing--content-box')} 
          ${css.apply('--layout--horizontal')} 
          ${css.apply('--layout--flex')} 

          max-height: 100%;
          max-width: 100%;
          width: 100%;

          overflow: hidden; }

        :host([flex-none]) { 
          ${css.apply('--layout--flex--none')} 
        }
        
        
        ._wrap {
          ${css.apply('--layout--block')} 
          ${css.apply('--layout--sizing--border-box')} 
          ${css.apply('--layout--flex')} 

          -webkit-overflow-scrolling: touch;
          overflow: -moz-scrollbars-none;
          overflow: scroll; }

        ._wrap-inner {
          ${css.apply('--layout--vertical')} 
          ${css.apply('--layout--sizing--content-box')} 
          height: 100%;
        }
        /*
        ._wrap-inner {
          ${css.apply('--layout--block')} 
          ${css.apply('--layout--sizing--content-box')} 
        }
        */


       ._scroll-bar {
          ${css.apply('--layout--sizing--border-box')} 
          ${css.apply('--stance--absolute')} 
          ${css.apply('--layout--vertical')} 

          z-index: 999;
          padding: 5px; }

       :host([no-scrollbar]) ._scroll-bar { display: none !important; }

       ._scroll-bar._scroll-bar--x {
          ${css.apply('--stance--pin--bottom-start')} 
          height: 13px; }

        ._scroll-bar._scroll-bar--y {
          ${css.apply('--stance--pin--top-end')} 
          width: 13px; }

 

        ._scroll-bar > div {
          ${css.apply('--layout--sizing--border-box')} 
          ${css.apply('--stance--absolute')} 
          ${css.apply('--layout--flex')} 

          height: calc(100% - 10px);
          width: calc(100% - 10px);

          opacity: 1;
          transition: opacity 125ms linear;

          border-radius: 1.5px;
          background: rgba(0,0,0,0.23); }

        ._scroll-bar[hide] {
          pointer-events: none; }
          
        ._scroll-bar[hide] > div {
          opacity: 0;
          transition: opacity 125ms linear; }

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

  scrollTo(params) {
    // console.log('scrollto', params)

    const $_wrap = this.shadowRoot.querySelector('._wrap');
    $_wrap.scrollTo(params);
  } 

  firstUpdated() {
    this.scroll_show = false;

    Promise.resolve().then(this._reset.bind(this));

    const $_wrap = this.shadowRoot.querySelector('._wrap');

    $_wrap.addEventListener('scroll', this._update.bind(this));
    $_wrap.addEventListener('scroll', this._trigger.bind(this));
    $_wrap.addEventListener('mouseover', this._trigger.bind(this));

    this._reset();
    this._update();
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
    }, 1000);
  }

  async _update() {
    const $_wrap = this.shadowRoot.querySelector('._wrap');
    const $_wrapInner = this.shadowRoot.querySelector('._wrap-inner');
    const $_scrollX = this.shadowRoot.querySelector('._scroll-bar._scroll-bar--x');
    const $_scrollY = this.shadowRoot.querySelector('._scroll-bar._scroll-bar--y');

    const xLimit = $_wrap.scrollWidth - $_wrap.clientWidth;
    const yLimit = $_wrap.scrollHeight - $_wrap.clientHeight;

    const xSize = Math.max(48, $_wrap.clientWidth * ($_wrap.clientWidth / $_wrap.scrollWidth));
    const ySize = Math.max(48, $_wrap.clientHeight * ($_wrap.clientHeight / $_wrap.scrollHeight));

    const x = ($_wrap.clientWidth - xSize) / 100 * Math.floor(($_wrap.scrollLeft / xLimit || 0) * 100);
    const y = ($_wrap.clientHeight - ySize) / 100 * Math.floor(($_wrap.scrollTop / yLimit || 0) * 100);

    this.scroll_x_active = $_wrap.scrollWidth > $_wrap.clientWidth;
    this.scroll_y_active = $_wrap.scrollHeight > $_wrap.clientHeight;
    this.scroll_x = x;
    this.scroll_y = y;
    this.scroll_size_x = xSize;
    this.scroll_size_y = ySize;

    // console.log(this.scroll_y)
    // console.log(this.scroll_size_y)
    this.dispatchEvent(new CustomEvent('scrolled', { detail: {
      pos: {
        x: $_wrap.scrollLeft, 
        y: $_wrap.scrollTop
      }
    } }))

    await this.updateComplete;
    this.requestUpdate();

    // ._scroll-bar._scroll-bar--x {
    $_scrollX.style.width = `${this.scroll_size_x}px`;
    $_scrollX.style.margin = `0px 0px ${this._width_add}px ${this.scroll_x}px`;
    
    // ._scroll-bar._scroll-bar--y {
    $_scrollY.style.height = `${this.scroll_size_y}px`;
    $_scrollY.style.margin = `${this.scroll_y}px 0px 0px`;

    $_wrap.style.minHeight = `calc(100% + ${this._height}px)`;
    $_wrap.style.maxHeight = `calc(100% + ${this._height}px)`;
    $_wrap.style.minWidth = `calc(100% + ${this._width}px)`; 
    $_wrap.style.maxWidth = `calc(100% + ${this._width}px)`; 
    $_wrap.style.margin = `0 ${-this._width}px ${-this._height}px 0`; 

    $_wrapInner.style.padding = `0 ${this._width_add}px ${this._height_add}px 0`
  }

  async _reset() {
    const $_wrap = this.shadowRoot.querySelector('._wrap');

    const _scrollbar_width = $_wrap.offsetWidth - $_wrap.clientWidth;
    const _add = _scrollbar_width <= 1 ? 30 : 0;

    if (this._width == _scrollbar_width + _add) return;

    this._width = _scrollbar_width + _add;
    this._width_add = _add;
    this._height = _scrollbar_width;
    this._height_add = 0;

    await this.updateComplete;

    this._update();
    this.requestUpdate();
  }



}

customElements.define('applic-scrollable', ApplicScrollable);
