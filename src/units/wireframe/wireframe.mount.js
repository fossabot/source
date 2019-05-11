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
          --applic-line--width: 1px;
        }

        :host {
          ${this.css.apply('--stance--fixed')}
          ${this.css.apply('--stance--fit')}
          ${this.css.apply('--layout--sizing--border-box')}
          ${this.css.apply('--layout--vertical')}
  
          ${this.css.apply('--typo--noselect')}

          background: #e8e8e8;
          transition: opacity 120ms cubic-bezier(0.4, 0.0, 1, 1);
          overflow: hidden; }

        :host([unresolved]) { opacity: 0; transition: opacity 0ms 0ms; }
        :host(:not([startup])) [hide-on-startup] { opacity: 1; transition: opacity 120ms 120ms cubic-bezier(0.4, 0.0, 1, 1); }
        :host([startup]) [hide-on-startup] { opacity: 0; transition: opacity 0ms 0ms;  }

        ._applic-wrap {
          ${this.css.apply('--stance--realtive')}

        }

      </style>


      ${this.model('wireframe-main:banner')}

      <div class="applic bar _applic-wrap">
        

      </div>


      ${this.model('wireframe-detail:card')}
      ${this.model('wireframe-overlay:dev')}

    `;
  }

  constructor() {
    super();

    this._options = {
      navigation: {
        hide: false
      }

    }


    this.css = css;
    this.model = (_nonce) => {
      return model[_nonce] ? (model[_nonce].bind(this))() : `<!-- ${_nonce} -->`;
    };

    if (applic.rendered) this.setAttribute('unresolved', '');
    this.setAttribute('startup', '');

    this._selected = [];

    // applic.on('applic:updated', this.requestUpdate.bind(this))
    applic.on('applic:updated', this._update.bind(this))

    self.addEventListener('resize', this._resize.bind(this), { passive: true });
    this._resize();
  }

  _resize() {
    const _width = self.innerWidth;
    _width < 620 ? 
      this.setAttribute('dense', '') : 
      this.removeAttribute('dense');
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
    const _navigation = this.shadowRoot.querySelector('._side-sheet');

    return () => {
      switch (_type) {
        case 'layout-navigation:toggle-persistence':
          this._options.navigation.hide = !this._options.navigation.hide;
          this.requestUpdate();
          break;
        case 'layout-navigation:toggle':
          _navigation.toggle();
          break;
        case 'layout-navigation:show':
          _navigation.expand();
          break;

        case 'section:select':
          applic.section.select(_params.nonce);
          break;
        case 'section:remove':
          applic.section.remove(_params.nonce);
          break;
        case 'section:create':
          applic.section.create();
          break;

        case 'graphic:select-all':
          const _graphics = applic.graphic.get({section: applic.section.active});
          const _selected = applic.graphic.get({ selected: true});

          if (_graphics) _graphics.forEach(_graphic => {
            _graphic.update({ selected: _selected.length != _graphics.length });
          });
          break;
        case 'graphic:update':
          applic.graphic.update(_params.nonce, _params.value)
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
    this._selected = applic.graphic.get({ selected: true });

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
