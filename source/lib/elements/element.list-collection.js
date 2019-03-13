/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicListCollection extends LitElement {
  static get properties() {
    return {
      open: true
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} }

        ::slotted(.applic.list-divider) {
          height: 1px;
          background: #e6e6e6;

          margin: 10px 20px;
        }

        ._expander {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          height: 34px;
          padding: 10px 20px;

          cursor: pointer;
        }
        ._expander ::slotted(*) {
          ${applic.$.css.apply('--typo')}

          font-size: 10px;
          line-height: 22px;
          font-weight: 500;
          letter-spacing: -0.6px;
          text-transform: uppercase;

          color: #979797; }

        ._expander_icon {
          margin-left: auto !important; 
          color: #acacac; 
        
          transform: scaleY( ${this.open ? '1' : '-1'});
          transition: transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        ._collapsible {
          max-height: ${this.open ? this.$collapsible.scrollHeight : '0'}px;
          overflow: hidden;

          opacity: ${this.open ? '1' : '0'};

          transition: ${this.open ?
            `opacity 100ms 200ms cubic-bezier(0.4, 0.0, 1, 1),
            max-height 250ms 0ms cubic-bezier(0.4, 0.0, 0.2, 1)` :
            `opacity 100ms 50ms cubic-bezier(0.0, 0.0, 0.2, 1),
            max-height 200ms 100ms cubic-bezier(0.4, 0.0, 0.2, 1)`};
        }

      </style>

      <div class="_expander">
        <slot name="label"></slot>
        <applic-icon class="_expander_icon" name="expand_less" size="dense"></applic-icon>
      </div>
      <div class="_collapsible">
        <slot></slot>
      </div>
    `;
  }
  constructor() {
    super();
  }

  firstUpdated() {
    const $_expand = this.shadowRoot.querySelector('._expander');
    $_expand.addEventListener('click', this.toggle.bind(this));


  }

  toggle() {
    this.open = !this.open;
  }
  collapse() {
    this.open = false;
  }
  expand() {
    this.open = true;
  }

  updated() {
    Promise.resolve().then(() => {
      this.$collapsible = this.shadowRoot.querySelector('._collapsible')
    })

    this.dispatchEvent(new Event('changed'));
  }

  async _update() {
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-list-collection', ApplicListCollection);
