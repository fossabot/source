/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicSideSheet extends LitElement {
  static get properties() {
    return {
      align: {
        type: String,
        value: 'start',
        reflect: true
      },

      open: {
        type: Boolean,
        value: true,
        reflect: true
      },

      persistent: {
        type: Boolean,
        value: true,
        reflect: true
      },

    };
  }

  render() {
    return html`
      <style>
        :host {
          --side-sheet--width: 320px;
        }

        ._scrim {
          z-index: 2;
          
          ${applic.$.css.apply('--stance--absolute')} 
          top: -50vh; right: -50vw; bottom: -50vh; left: -50vw;

          content: ""; 
          background: rgba(0,0,0,.2); }

        ._scrim:not([active]) {
          opacity: 0; pointer-events: none;
          transition: all ${this.collapseDur} 50ms ${this.collapseTmf}; }

        ._scrim[active] {
          opacity: 1; pointer-events: all;
          transition: all ${this.expandDur} 10ms ${this.expandTmf}; }


        ._card {
          z-index: 2;

          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex--none')} 

          height: calc(100% + 60px);
          width: calc(100% - 56px);
          max-width: calc(var(--side-sheet--width) + 30px);

          margin: 0px;
          padding: 0px;

          overflow: hidden;
          background: #fafafa; }


        :host(:not([align="end"])) ._card {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--start')} 

          border-right: 1px solid #d6d6d6;
          border-left: none;

          margin: -30px 0 -30px -30px;
          padding: 30px 0 30px 30px;
        }

        :host([align="end"]) ._card {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--end')} 

          border-right: none;
          border-left: 1px solid #d6d6d6;

          margin: -30px -30px -30px 0;
          padding: 30px 30px 30px 0;
        }

      </style>

      <div class="_scrim" ?active="${!this.persistent && this.open}"></div>
      <div class="_card"><slot></slot></div>

    `;
  }
  constructor() {
    super();

    self.addEventListener('resize', this.updated.bind(this), { passive: true });

    const $_scrim = this.shadowRoot.querySelector('._scrim');

    // $_scrim.addEventListener('touchstart', this.collapse.bind(this), { passive: true });
    // $_scrim.addEventListener('mousedown', this.collapse.bind(this), { passive: true });

    // this.expandDur = '200ms';
    // this.expandTmf = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    // this.collapseDur = '150ms';
    // this.collapseTmf = 'cubic-bezier(0.4, 0.0, 1, 1)';

    // this.requestUpdate();
    // window.addEventListener('resize', this._update.bind(this));
  }

  firstUpdated() {
    // self.addEventListener('resize', this.updated.bind(this), { passive: true });
    
    const $_scrim = this.shadowRoot.querySelector('._scrim');

    $_scrim.addEventListener('touchstart', this.collapse.bind(this), { passive: true });
    $_scrim.addEventListener('mousedown', this.collapse.bind(this), { passive: true });

    // this.expandDur = '200ms';
    // this.expandTmf = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    // this.collapseDur = '150ms';
    // this.collapseTmf = 'cubic-bezier(0.4, 0.0, 1, 1)';

    this.requestUpdate();
  }

  toggle() { this.open = !this.open; }
  collapse() { this.open = false; }
  expand() { this.open = true; }

  updated(last) {
    if (last && last.has && last.has('persistent')) {
      this.open = this.persistent;
    };

    const $_node = this.parentElement;
    const $_card = this.shadowRoot.querySelector('._card');

    const _width = $_card.offsetWidth - 30;

    if (this.align != 'end') {
      if (this.open) {
        $_card.style.margin = `-${30}px 0px -${30}px -${30}px`;
      } else {
        $_card.style.margin = `-${30}px 0px -${30}px -${_width + 30}px`;
      };
    } else {
      if (this.open) {
        $_card.style.margin = `-${30}px -${30}px -${30}px 0px`;
      } else {
        $_card.style.margin = `-${30}px -${_width + 30}px -${30}px 0px`;
      };
    };

    if (this.open && this.persistent && this.align != 'end') {
      $_node.style.margin = `0px 0px 0px 0px`;
      $_node.style.padding = `0px 0px 0px ${_width}px`;
    } else if (this.open && this.persistent) {
      $_node.style.margin = `0px 0px 0px 0px`;
      $_node.style.padding = `0px ${_width}px 0px 0px`;
    } else {
      $_node.style.margin = `0px 0px 0px 0px`;
      $_node.style.padding = `0px 0px 0px 0px`;
    };



    // if ([...last.keys()].length 
    //   && -1 != [...last.keys()].indexOf('persistent') 
    //   && last['persistent'] != this.persistent) {
    //   this.open = this.persistent;
    // }

    // const $_card = this.shadowRoot.querySelector('._card');
    // const _cardWidth = $_card.offsetWidth + 30;
    // const _cardSide = this.align == 'start' ? 'marginLeft' : 'marginRight';
    // const _bodySide = this.align == 'start' ? 'paddingLeft' : 'paddingRight';



    // if (!this.persistent && this.open) {
    //   $_card.style[_cardSide] = `-30px`;
    // } else {
    //   $_card.style[_cardSide] = `-${_cardWidth - 30}px`;
    // }


    // if (this.persistent && this.open) {
    //   this.offsetParent.style[_bodySide] = `${_cardWidth - 30}px`;
    //   this.offsetParent.style.transition = `padding ${this.expandDur} ${this.expandTmf}`;
    // } else {
    //   this.offsetParent.style[_bodySide] = '0px';
    //   this.offsetParent.style.transition = `padding ${this.collapseDur} ${this.collapseTmf}`;
    // }

    // this.dispatchEvent(new CustomEvent('changed', {
    //   detail: {
    //     opened: this.open
    //   }
    // }));
  }

  async _update() {
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-side-sheet', ApplicSideSheet);
