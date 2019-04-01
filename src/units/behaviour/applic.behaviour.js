/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import './applic.import.js';

import '../modules/module.graphic.js';
import '../modules/module.section.js';

console.info('applic:loaded', `${Date.now() - applic.created}ms`);

new class {
  constructor() {
    applic.graphic.__proto__.updated = this.updated.bind(this);
    applic.section.__proto__.updated = this.updated.bind(this);

    applic.utils.buffer(this.updated.bind(this))

    console.debug('applic:ready', `${Date.now() - applic.created}ms`);
  }

  updated() {
    this.sections = applic.section.get();
    this.graphics = applic.graphic.get();

    if (this._debug()) {
      applic.dispatch('applic:updated', this)
      console.debug('applic:updated')
    }
  }

  _debug() {

    if (1 > this.sections.length) {
      console.debug('applic:debug', '"no sections"')
      applic.section.create(); return false;
    };


    return true;
  }


}




applic.__proto__.newImport = (_params) => {
  return new class {
    constructor() {
      this.graphic = {};
      this.section = null;

      // console.log('importer-created', _params)
    }

    add(_blob) {
      this.graphic[_blob.nonce] = applic.graphic.new({
        section: this.section,
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
