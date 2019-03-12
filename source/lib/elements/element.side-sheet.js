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

    };
  }

  render() {
    return html`
      <style>
        :host { z-index: 1; }

        ._scrim {
          ${applic.$.css.apply('--stance--absolute')} 
          top: -60px;
          right: -30px;
          bottom: -30px;
          left: -30px;

          content: ""; 
          background: rgba(0,0,0,.2);
   
          opacity: ${this.open ? '1' : '0'};
          pointer-events: ${this.open ? 'all' : 'none'};
          transition: ${this.open ?
            `all ${this.expandDur} ${this.expandTmf}` :
            `all ${this.collapseDur} 50ms ${this.collapseTmf}`};
        }

        ._card {
          ${applic.$.css.apply('--layout--sizing--content-box')} 
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} 
          ${applic.$.css.apply(`--elevation--${this.open ? '12dp' : 'none'}`)} 

          height: calc(100%);
          width: calc(100% - 56px + 30px);
          max-width: calc(320px + 30px);

          margin: -60px 0px -30px;
          padding: 60px 0px 30px 30px;

          overflow: hidden;

          transform: translate(${this.open ? '-30px' : 'calc(-100% - 1px)'});

          transition-property: transform, box-shadow;
          transition-duration: ${this.open ? this.expandDur : this.collapseDur};
          transition-timing-function: ${this.open ? this.expandTmf : this.collapseTmf};

          background: #f4f4f4;
        }

      </style>

      <div class="_scrim" @touchstart="${this.collapse}" @click="${this.collapse}"></div>
      <div class="_card">
        <slot></slot>
      </div>
    `;
  }
  constructor() {
    super();

    window.addEventListener('resize', this._update.bind(this));
  }

  firstUpdated() {
    this.expandDur = '200ms';
    this.expandTmf = 'cubic-bezier(0.4, 0.0, 1, 1)';
    this.collapseDur = '150ms';
    this.collapseTmf = 'cubic-bezier(0.4, 0.0, 1, 1)';

    this.requestUpdate();
  }

  toggle() { this.open = !this.open; }
  collapse() { this.open = false; console.log('collapse') }
  expand() { this.open = true; console.log('expand') }

  updated() {
    this.open ? this.setAttribute('opened', '') : this.removeAttribute('opened');

    // this.parentElement.style.marginLeft = this.open ? '320px' : '0px';
    // this.parentElement.style.transitionProperty = 'margin';
    // this.parentElement.style.transitionDuration = this.open ? this._expand_dur : this._collapse_dur;
    // this.parentElement.style.transitionTimingFunction = this.open ? this._expand_tmf : this._collapse_tmf;


    this.dispatchEvent(new Event('sheet-changed'));
  }

  async _update() {
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-side-sheet', ApplicSideSheet);
