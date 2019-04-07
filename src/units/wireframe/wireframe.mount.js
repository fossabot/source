/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

import { model } from './model/all-models.js';
import { css } from './wireframe.style.js'

import './wireframe.graphic.js'
import './wireframe.grid.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicMount extends LitElement {
  static get properties() {
    return {
      layout: {
        type: Object, value: {}
      },
    };
  }

  render() {
    return html`
      <style>
        ${css.include('applic::bar')}

        :host {
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')}
  
          ${this.css.apply('--typo--noselect')}

          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1);
          overflow: hidden; }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host(:not([startup])) [hide-on-startup] { opacity: 1; transition: opacity 120ms 20ms cubic-bezier(0.4, 0.0, 1, 1); }
        :host([startup]) [hide-on-startup] { opacity: 0; transition: opacity 0ms 0ms;  }

        ._sheet-wrap {
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--horizontal')}
          ${this.css.apply('--layout--flex')}   } 

        applic-side-side {  }

        ._body-wrap {
          z-index: 0;
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')} 
          ${this.css.apply('--layout--flex')} } 

        ._side-sheet { 
          --side-sheet--width: 320px;
          z-index: 4; }
        ._body-side-sheet {  
          --side-sheet--width: 280px; }
     

        ._body-main {  
          ${this.css.apply('--stance--relative')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')} 
          ${this.css.apply('--layout--flex--none')} 

          height: 100%;
          width: 100%;
        } 

        ._body-header {
          z-index: 3;
          
          margin: -60px -30px 0 -30px;
          padding: 60px 30px 0 30px;

          border-bottom: 1px solid #d6d6d6;
          background: #fafafa; }

      </style>

      <div class="_sheet-wrap">
        <applic-side-sheet class="_side-sheet" align="start"
          ?persistent="${this.layout.breakpoint >= 3}">
          ${this.model('wireframe-sheet:nav')}
        </applic-side-sheet>
   
        <div class="_body-wrap">
          <div class="_body-header applic bar">
            <div class="applic bar-row">
              <div class="applic bar-section align-start">

                <applic-icon-button icon="notes">
                  <applic-hint>Toggle navigation</applic-hint>
                </applic-icon-button>

              </div>
            </div>
          </div>

          <div class="_sheet-wrap">
            <div class="_body-main">
              <applic-scrollable class="_body-inner">
                ${this.model('wireframe-main:inner')}
              </applic-scrollable>
            </div>

            <applic-side-sheet class="_body-side-sheet" align="end"
              ?persistent="${this.layout.breakpoint >= 2}">              
              <applic-scrollable class="_body-aside">
                ${this.model('wireframe-main:aside')}
              </applic-scrollable>
            </applic-side-sheet>

          </div>
        </div>
      </div>


      ${this.model('wireframe-overlay:dev')}

    `;
  }

  constructor() {
    super();

    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');

    this.section = [];
    this.graphic = [];

    // applic.on('applic:updated', this.requestUpdate.bind(this))
    applic.on('applic:updated', this._update.bind(this))

    self.addEventListener('resize', this._resize.bind(this), { passive: true });
    this._resize();
  }

  _resize() {
    const _breakpoint = (() => {
      const _width = self.innerWidth;
      let _size = 0;

      if (_width > 480) _size++;
      if (_width > 720) _size++;
      if (_width > 1320) _size++;

      return _size;
    })();

    if (!this.layout || this.layout.breakpoint != _breakpoint) {
      this.layout = { breakpoint: _breakpoint };
    };

  };




  firstUpdated() {
    applic.utils.buffer(() => {
      this.removeAttribute('startup');
      this.removeAttribute('unresolved');
    });

    console.debug("applic-wireframe:ready", `${Date.now() - applic.created}ms`);

    applic.$.addEventListener('dragover', drop.move);
    applic.$.addEventListener('dragleave', drop.move);
    applic.$.addEventListener('drop', drop.release);

  }

  updated() {
    // console.log(this.layout)
  }


  call(_type, _params) {
    return () => {
      switch (_type) {
        case 'section:select':
          applic.section.select(_params.nonce)
          break;
        case 'section:remove':
          applic.section.remove(_params.nonce)
          break;
        case 'section:create':
          applic.section.create()
          break;

        case 'graphic:remove':
          applic.graphic.remove(_params.nonce)
          break;

        case 'applic:import':
          files.import(_params)
          break;
        case 'applic:import-folder':
          files.importFolder(_params)
          break;
        case 'applic:import-drag':
          drop.catch(_params)
          break;

      }
    }
  };

  _update() {
    this.requestUpdate();

  }

}

customElements.define('applic-mount', ApplicMount);




/**
 * All image-types work technically. BUT I DO NOT WANT PEOPLE JUST DOWNLOAD
 * IMAGES FROM GOOGLE AND MAKE EMOTES OUT OF THEM. So I limit it to the most
 * common file types from people that actually create proper emotes.
 */
const types = ['image/x-png', 'image/png', 'image/gif', 'image/svg'];
const files = {};

files.import = (_params) => {
  const _import = _newImport(_params);
  _import.setAttribute('accept', types.join(','));
  _import.click();
};

files.importFolder = (_params) => {
  const _import = _newImport(_params);
  _import.setAttribute('directory', '');
  _import.setAttribute('webkitdirectory', '');
  _import.click();
};

const _newImport = (_params) => {
  const _import = document.createElement('input');
  _import.setAttribute('type', 'file');
  _import.setAttribute('multiple', '');
  _import.addEventListener('change', (_event) => {
    files.register(_params, { files: Array.from(_import.files) });
  });

  document.body.appendChild(_import)
  return _import;
};


files.register = async (_params, _transfer) => {
  let _rejected = [];

  const _importer = applic.newImport({
    section: _params.section || applic.section.active,
    type: _params.type || applic.graphic.types[0].nonce
  });

  const _traverse = applic.import.traverse({
    types: types,
    files: !_transfer.files ? false : Array.from(_transfer.files),
    entries: !_transfer.entries ? false : Array.from(_transfer.entries)
  });

  _traverse.onRegistered = (_params) => {
    _importer.add(_params.blob);
  };

  _traverse.onChanged = (_params) => {
    _importer.update(_params.blob);
  };

  _traverse.onResolved = () => {
    _importer.resolved();
    if (_rejected.length == 1) {
      console.groupCollapsed(`${_rejected.length} Import rejected`);
      _rejected.forEach((_params) => console.log(`${_params.type}' of '${_params.name}'`));
      console.groupEnd();
    };
  };

  _traverse.onRejected = (_params) => {
    _rejected.push(_params)
  };
};


const drop = {};
drop.dataTransfer = { catched: true };

drop.move = (_event) => { _event.preventDefault(); };
drop.release = (_event) => {
  const _transfer = _event.dataTransfer;
  
  _event.dropEffect = 'copy';
  _event.preventDefault();

  drop.dataTransfer = {
    catched: false, entries: [],
    files: !_transfer.files ? false : Array.from(_transfer.files),
  };

  if (_transfer.items) for (const _item of _transfer.items) {
    drop.dataTransfer.entries.push(_item.webkitGetAsEntry());
  };
 

  applic.utils.buffer(() => {
    applic.utils.buffer(() => {
      if (drop.dataTransfer.catched) return;

      files.register({
        section: applic.section.active,
        type: applic.graphic.types[0].nonce
      }, drop.dataTransfer)
    })
  })

  return false;
};

drop.catch = (_params) => {
  applic.utils.buffer(() => {
    files.register({
      section: _params.section,
      type: _params.type
    }, drop.dataTransfer)
    
    drop.dataTransfer.catched = true;
  })
};
