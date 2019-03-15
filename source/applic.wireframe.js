/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { render, html } from 'lit-html';
import { LitElement, html as litHtml } from 'lit-element';

import './lib/elements/all-elements.js';

import { model } from './lib/model/all-models.js';
import { style } from './units/wireframe/wireframe.style.js';

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicWireframe extends LitElement {
  static get properties() {
    return {
      standalone: applic.dev.standalone || false,

      unlinked: { type: Boolean, reflect: true, attribute: 'unresolved' },
      state: { type: Object }
    };
  }

  render() {
    return litHtml`
      <style> *[hidden] { display: none !important; } </style>
      ${this.model('mount')} <slot></slot>  
    `;
  }
  renderInner() {
    return html`
      <style>
        * { ${this.css.apply('--typo--noselect')} }

        body {
          ${this.css.apply('--layout--sizing--content-box')} 
          ${this.css.apply('--layout--vertical')}
          ${this.css.apply('--stance--relative')}

          transform: scale(.8, .8);
        }

        body:after {
          ${this.css.apply('--stance--absolute')}
          ${this.css.apply('--stance--fit')}

          top: -${applic.dev.standalone ? '30px' : '0px'}; 
          
          z-index: 20; 
          content: '';

          outline: 10px solid rgba(255,90,90,.2);
          pointer-events: none; }

      </style>


      <applic-side-sheet applic-role="navigation"
        ?open="${this.get('sheet.opened')}"
        ?persistent="${!this.get('narrow') && this.get('sheet.persistent')}"
        @changed="${this.changed.bind(this)}">

        ${this.model('navigation')}
      </applic-side-sheet>
        
      ${this.model('body')}
    `;
  }

  constructor() {
    super();
    this.unlinked = Date.now() - applic.created > 220;
    this.state = { sheet: {} };

    this.css = style.css;
    this.html = style.html;

    window.addEventListener('resize', this._resize.bind(this));
  }

  link() { console.debug('applic-wireframe:linked', `${Date.now() - applic.created}ms`) }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._resize()
    })

    console.debug('applic-wireframe:ready', `${Date.now() - applic.created}ms`);

    document.body.setAttribute('role', 'application');

    if (this.unlinked) {
     

      Promise.resolve().then(() => {
        requestAnimationFrame(() => {
          this.unlinked = false;
        })
      })
    }

    self.dispatchEvent(new Event('applic-wireframe:ready'));
  }

  changed(evt) {
    // console.debug('applic-wireframe:changed')
    switch (evt.target) {
      case this.querySelector('[applic-role="navigation"]'):
        if (evt.detail.opened == undefined) return;
        this.set('sheet.opened', evt.detail.opened);
        break;
    
    }
  }

  updated() {
    // console.debug('applic-wireframe:updated')
    render(this.renderInner(), this)
  }


  async _resize() {
    const _width = this.offsetWidth;
    const _state = JSON.parse(JSON.stringify(this.state));

    if (_width > 820) { 
      _state.narrow = false;
      _state.sheet.persistent = true; 
    } else { 
      _state.narrow = true;
      _state.sheet.persistent = false; 
    };

    if (!_state.sheet.persistent && this.state.sheet.persistent) {
      _state.sheet.opened = false;
    };
    
    if (_state.sheet.persistent && !this.state.sheet.persistent) {
      _state.sheet.opened = true;
    };

    this.state = _state;

    await this.updateComplete;
    this.requestUpdate();
  }
 
  model(_nonce) { 
    return model[_nonce].bind(this)();
  }
  call(_action) {
    return () => {
      switch (_action) {
        case 'navigation:toggle':
          this.set('sheet.opened', !this.get('sheet.opened'))
        break;
        case 'navigation:toggle-persistence':
          this.set('sheet.persistent', !this.get('sheet.persistent'))
        break;
      }
    };
  }

  async set(path, value) {
    let key, obj = this.state;
    const stack = path.split('.');

    while (stack.length > 1) {
      key = stack.shift();
      if (!obj[key]) obj[key] = {};
      obj = obj[key];
    };

    key = stack.shift();
    if (!obj[key]) obj[key] = {};
    if (obj[key] === value) return;

    if (value === null) {
      delete obj[key];
    } else if (obj[key] != value) {
      obj[key] = value;
    };

    await this.updateComplete;
    this.requestUpdate();
  }

  get(path) {
    if (!path) return this.state;
    let obj = this.state;
    const stack = path.split('.');

    while (stack.length > 1) {
      const key = stack.shift();
      if (!obj[key]) obj[key] = {};
      obj = obj[key];
    };

    return obj[stack.shift()];
  }

}

customElements.define('applic-wireframe', ApplicWireframe);

applic.$ = new ApplicWireframe();
document.body.appendChild(applic.$, document.body.firstElementChild);
