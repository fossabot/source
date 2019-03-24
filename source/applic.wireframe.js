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
      unresolved: {
        type: Boolean,
        reflect: true
      },
      state: {
        type: Object
      }
    };
  }

  render() {
    return litHtml`
      <style> 
        *[hidden] { display: none !important; } 
        * { ${this.css.apply('--typo--noselect')} }

        :host {
          ${this.css.apply('--layout--sizing--content-box')} 
          ${this.css.apply('--layout--vertical')}
          ${this.css.apply('--layout--flex')}
      
          transition: opacity 0ms;
          opacity: 0; 

          background: #f4f4f4; } 

        :host(:not([unresolved])) {
          opacity: 1; 
          transition: opacity 100ms 0ms cubic-bezier(0.4, 0.0, 1, 1); } 

        :host([unresolved]) {
          opacity: 0; 
          transition: opacity 100ms 0ms cubic-bezier(0.4, 0.0, 1, 1); } 
  

        ._wrap {
          ${this.css.apply('--layout--sizing--border-box')} 

          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--vertical')}
          ${this.css.apply('--layout--flex-none')}

          height: 100%;
        }

      </style>

      <div class="_wrap">
        <slot></slot>
      </div>

    `;
  }
  renderInner() {
    return html`
      <style>
        * { ${this.css.apply('--typo--noselect')} }

        body {
          ${this.css.apply('--layout--sizing--content-box')} 
          ${this.css.apply('--layout--vertical')}
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')} 
        
          margin: 0px; }

        ${!applic.develop || !applic.develop.overflow ? '' : html`
          body { transform: scale(.8, .8); }
          body:after {
            ${this.css.apply('--stance--absolute')}
            ${this.css.apply('--stance--fit')}

            z-index: 20; 
            content: '';

            outline: 10px solid rgba(255,90,90,.2);
            pointer-events: none; }

        `}

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

    this.cached = Date.now() - applic.created > 220;
    this.unresolved = this.cached;
    this.state = { sheet: {}, section: [] };

    this.css = style.css;
    this.html = style.html;

    self.addEventListener('beforeunload', this.unload.bind(this), true);

    self.addEventListener('resize', this._resize.bind(this));
    this._resize()
  }

  unload() {
    if (this.cached) return;
    this.setAttribute('unresolved', '');
    setTimeout(this.removeAttribute.bind(null, 'unresolved'), 3000);
  }

  link() {
    console.debug('applic-wireframe:linked', `${Date.now() - applic.created}ms`)

    applic.on('applic-state:changed', this._update.bind(this));
    applic.on('applic:changed', this._update.bind(this));

    Promise.resolve(this._update.bind(this))
  }

  async _update() {
    const _sections = applic.get('section');
    const _state = JSON.parse(JSON.stringify(this.state));

    _state.section = [];

    for (const _nonce of Object.keys(_sections)) {
      const _section = _sections[_nonce];
      const _graphics = (() => {
        const _graphics = _section.graphics();
        const _map = []

        for (const _nonce of Object.keys(_graphics)) {
          const _graphic = _graphics[_nonce];
          _map.push({
            nonce: _graphic.nonce,
            uri: _graphic.uri
          });
        };

        return _map.length ? _map : false;
      })()

      _state.section.push({
        name: _section.name, graphic: _graphics[0] || false,

        active: _section.active,
        show: applic.openSection.bind(null, _section.nonce),

        graphics: _graphics
      });

      _state.selector = {

      };

      _state.preview = {

      };

    };



    this.state = _state;

    await this.updateComplete;
    this.requestUpdate();
  }

  firstUpdated() {
    console.debug('applic-wireframe:ready', `${Date.now() - applic.created}ms`);

    document.body.setAttribute('role', 'application');

    if (this.unresolved) {
      Promise.resolve().then(() => {
        setTimeout(() => {
          this.unresolved = false;
        }, 0);
      });
    };

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
    if (this.rendering) return;
    this.rendering = true;

    const apply = () => {
      this.rendering = false;

      // console.debug('applic-wireframe:updated')
      render(this.renderInner(), this)
    };

    requestAnimationFrame(() => {
      Promise.resolve().then(apply.bind(this))
    });
  }
  // updated() {

  //   console.debug('applic-wireframe:updated')
  //   render(this.renderInner(), this)
  // }


  async _resize() {
    const _width = self.innerWidth;
    const _state = JSON.parse(JSON.stringify(this.state));

    if (_width > 820) {
      _state.narrow = false;
      _state.sheet.persistent = true;
    } else {
      _state.narrow = true;
      _state.sheet.persistent = false;
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



const dropMove = (evt) => {
  evt.preventDefault();
  return false;
}
const dropHandler = (evt) => {
  evt.preventDefault();

  console.log(applic.$.state)

  const _params = {
    transfer: (() => {
      if (!evt.dataTransfer.items) return false;
      const _list = []; for (const _file of evt.dataTransfer.items) {
        if (_file.kind === 'file') _list.push(_file)
      }
      return _list;
    })(),
    files: (() => {
      if (evt.dataTransfer.items) return false;
      const _list = []; for (const _file of evt.dataTransfer.files) { _list.push(_file) }
      return _list;
    })()
  }

  if (!applic.chatchFiles) return;
  applic.chatchFiles(_params)

  // const _section = (() => {
  //   let _target; const _sections = applic.get('section')
  //   for (const _nonce of Object.keys(_sections)) {
  //     if (_sections[_nonce].active) {
  //       _target = _sections[_nonce];
  //     }
  //   };

  //   return _target;
  // })()

  // const _register = (_file) => {
  //   applic.newgraphic({
  //     blob: _file,
  //     section: _section.nonce
  //   })

  // };

  // if (evt.dataTransfer.items) {
  //   for (let i = 0; i < evt.dataTransfer.items.length; i++) {
  //     if (evt.dataTransfer.items[i].kind === 'file') {
  //       _register(evt.dataTransfer.items[i].getAsFile());
  //     }
  //   }
  // } else {
  //   for (let i = 0; i < evt.dataTransfer.files.length; i++) {
  //     _register(evt.dataTransfer.files[i]);
  //   }
  // }

  return false;
}

self.addEventListener('dragover', dropMove)
self.addEventListener('dragleave', dropMove)
self.addEventListener('drop', dropHandler)
