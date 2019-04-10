/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import './applic.import.js';
import './applic.location.js';

import './modules/module.graphic.js';
import './modules/module.section.js';

new class {
  constructor() {
    applic.graphic.__proto__.updated = this.updated.bind(this);
    applic.section.__proto__.updated = this.updated.bind(this);

    applic.utils.buffer(this.updated.bind(this));
    applic.on('applic:changed', this.updated.bind(this));

    console.debug('applic:ready', `${Date.now() - applic.created}ms`);
  }

  updated() {
    this.sections = applic.section.get('*');
    this.graphics = applic.graphic.get('*');

    if (this._debug()) {
      applic.dispatch('applic:updated', this);
      // console.debug('applic:updated')
    };
  }

  _debug() {
    if (1 > this.sections.length) {
      console.debug('applic:debug', `'No collections'`)
      applic.section.create(); return false;
    };

    return true;
  }

}


applic.__proto__.newImport = (_params) => {
  return new class {
    constructor() {
      if (!_params.section) throw 'Require section for import';

      this.graphic = {};
      this.section = _params.section;
      this.type = _params.type;

      // console.log('importer-created', _params)
    }

    add(_blob) {
      this.graphic[_blob.nonce] = applic.graphic.create({
        section: this.section,
        type: this.type,
        blob: _blob
      })
    }

    update(_blob) {
      this.graphic[_blob.nonce].update({
        blob: _blob
      })
    }

    resolved() {
      // console.log('importer-resolved')
    }
  }
};
