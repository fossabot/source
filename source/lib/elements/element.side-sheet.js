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
      open: { type: Boolean, value: false },
      persistent: { type: Boolean, value: false },
    };
  }

  render() {
    return html`
      <style>
        :host { z-index: 2; }

        ._scrim {
          ${applic.$.css.apply('--stance--absolute')} 

          top: -50vh;
          right: -50vw;
          bottom: -50vh;
          left: -50vw;

          content: ""; 
          background: rgba(0,0,0,.2);
   
          opacity: ${!this.persistent && this.open ? '1' : '0'};
          pointer-events: ${!this.persistent && this.open ? 'all' : 'none'};
          transition: ${!this.persistent && this.open ?
        `all ${this.expandDur} ${this.expandTmf}` :
        `all ${this.collapseDur} 50ms ${this.collapseTmf}`};
        }

        ._card {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--start')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} 
          ${applic.$.css.apply(`--elevation--${this.persistent ? 'none' : '12dp'}`)} 

          height: calc(100% + 60px + 30px);
          width: calc(100% - 56px + 30px);
          max-width: calc(320px + 30px);

          margin: -60px 0px -30px;
          padding: 60px 0px 30px 30px;

          overflow: hidden;

          ${!this.persistent ? `
            margin-left: ${this.open ? '-30px' : 'calc(0px - (320px + 30px + 30px))'};
          `: `
            margin-left: -30px;
            border-right: 1px solid #d6d6d6;
          `}

          transition: margin ${ this.open ?
        `${this.expandDur} ${this.expandTmf}` :
        `${this.collapseDur} ${this.collapseTmf}`};
          
          pointer-events: ${this.open ? 'all' : 'none'};
          background: #fafafa; }

      </style>

      <div class="_scrim"></div>
      <div class="_card"><slot></slot></div>

    `;
  }
  constructor() {
    super();

    window.addEventListener('resize', this._update.bind(this));
  }

  firstUpdated() {
    const $_scrim = this.shadowRoot.querySelector('._scrim');
    $_scrim.addEventListener('touchstart', this.collapse.bind(this), { passive: true })
    $_scrim.addEventListener('mousedown', this.collapse.bind(this), { passive: true })

    this.expandDur = '200ms';
    this.expandTmf = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    this.collapseDur = '150ms';
    this.collapseTmf = 'cubic-bezier(0.4, 0.0, 1, 1)';

    this.requestUpdate();
  }

  toggle() { this.open = !this.open; }
  collapse() { this.open = false; }
  expand() { this.open = true; }

  updated(last) {
    console.log()
    
    if ([...last.keys()].length 
      && -1 != [...last.keys()].indexOf('persistent') 
      && last['persistent'] != this.persistent) {
      this.open = this.persistent;
    }

    if (this.persistent && this.open) {
      this.parentElement.style.paddingLeft = `${this.shadowRoot.querySelector('._card').offsetWidth - 30}px`;
      this.parentElement.style.transition = `padding ${this.expandDur} ${this.expandTmf}`;
    } else {
      this.parentElement.style.paddingLeft = '0px';
      this.parentElement.style.transition = `padding ${this.collapseDur} ${this.collapseTmf}`;
    }

    this.dispatchEvent(new CustomEvent('changed', {
      detail: {
        opened: this.open
      }
    }));
  }

  async _update() {
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-side-sheet', ApplicSideSheet);
