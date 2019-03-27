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
          ${applic.$.css.apply('--stance--fixed')} 
          ${applic.$.css.apply('--layout--pin--top-start')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          height: 36px;
          min-width: 36px;

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
    // this.parentElement.addEventListener('mouseover', this._trigger.bind(this));
    // this.parentElement.addEventListener('movseleave', this._spleep.bind(this));
  }

  _trigger() {
    // if (!this.scroll_show) {
    //   this.show = true;
    //   this.requestUpdate();
    // };

    // this._spleep();
  }
  _spleep() {
    // clearTimeout(this._sleepTimer)
    // this._sleepTimer = setTimeout(() => {
    //   this.show = false;
    //   this.requestUpdate();
    // }, 100);
  }

  async _update() {
    // console.log(this)
    
    await this.updateComplete;
    this.requestUpdate();
  }

}

customElements.define('applic-hint', ApplicScrollable);
