/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

import { LitElement, html } from 'lit-element';
import { css } from '../pattern/dom.style.js';


class ApplicPannel extends LitElement {
  render() {
    return html`
      <style>
        :host, :host * { ${css.apply('--layout--sizing--border-box')} }

        :host{
          ${css.apply('--layout--vertical')} 
          ${css.apply('--layout--flex-auto')} 

          background: #2c2f33;
        }

        .pannel.banner,
        .pannel.banner-bar {
          z-index: 1;

          ${css.apply('--stance--absolute')}
          ${css.apply('--stance--pin--top')}
          ${css.apply('--layout--horizontal')}
          ${css.apply('--layout--flex-none')}
        }

        .pannel.banner {
          ${css.apply('--layout--center-center')}
        }

        .pannel.banner-bar {
          ${css.apply('--layout--center')}
          ${css.apply('--layout--sizing--content-box')}

          background: #2c2f33;
          height: 42px;
        }

        .pannel.banner-bar[float] {
          border-bottom: 1px solid #e1e4e8;
        }

        .pannel.body {
          ${css.apply('--layout--vertical')}
          ${css.apply('--layout--flex')}

          background: #ffffff;
          border-radius: 20px 20px 0px 0px;
          overflow: hidden;
          min-height: calc(100% - 42px);

          scroll-snap-align: start;

          padding: 24px 0px;
          border: 1px solid #e1e4e8;
        }

        .pannel.spacer {
          ${css.apply('--layout--flex-none')}
        }

      </style>

      <div class="pannel banner">
        <slot name="pannel:banner"></slot>
      </div>

      <div class="pannel banner-bar">
        <slot name="pannel:banner-bar"></slot>
      </div>

      <applic-scrollable>
        <div class="pannel spacer"></div>

        <div class="pannel body">
          <slot></slot>

        </div>

      </applic-scrollable>

    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.$ = {
      scrollable: this.shadowRoot.querySelector('applic-scrollable'),
      spacer: this.shadowRoot.querySelector('.pannel.spacer'),
      banner: this.shadowRoot.querySelector('.pannel.banner'),
      bannerBar: this.shadowRoot.querySelector('.pannel.banner-bar'),
      body: this.shadowRoot.querySelector('.pannel.body')
    }

    Promise.resolve().then(() => {
      this.$.scrollable.scrollTo({
        top: this.$.banner.scrollHeight,
        left: 0,
      })
    })    

    this.$.scrollable.addEventListener('scrolled', this._scrolled.bind(this), { passive: true })
    self.addEventListener('resize', this._update.bind(this), { passive: true })
  }

  _scrolled(_event) {
    this.y = _event.detail.pos.y;
    this._update();
  } 

  _update() {
    const _offsetBanner = this.$.banner.scrollHeight;
    const _offsetBar = this.$.bannerBar.scrollHeight;

    const _radius = 24 - Math.min(24, Math.max(this.y - _offsetBanner, 0));
    const _offset = 24 - _radius;

    this.$.banner.style.margin = `${0 - this.y}px 0px 0px 0px`
    this.$.bannerBar.style.margin = `${Math.max(0, _offsetBanner - this.y)}px 0px 0px 0px`

    0 >= _radius ? 
      this.$.bannerBar.setAttribute('float', ''):
      this.$.bannerBar.removeAttribute('float');

    this.$.body.style.padding = `${24 - _offset}px 0px 0px 0px`
    this.$.body.style.margin = `${_offset}px 0px 0px 0px`
    this.$.body.style.borderRadius = `${_radius}px ${_radius}px 0px 0px`

    this.$.spacer.style.height = `${_offsetBanner + _offsetBar}px`

    this.snap()
  }

  snap() {
    self.clearTimeout(this._bufferSnap)
    this._bufferSnap = setTimeout(() => {
        
      if (this.y <= this.$.banner.scrollHeight * 0.8) {
        this.$.scrollable.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } else if (this.y < this.$.banner.scrollHeight) {
         this.$.scrollable.scrollTo({
          top: this.$.banner.scrollHeight,
          left: 0,
          behavior: 'smooth'
        })
      } 

    }, 200);
  }

}

customElements.define('applic-pannel', ApplicPannel);
