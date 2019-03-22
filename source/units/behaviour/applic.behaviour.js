/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

new class {
  constructor() {
    applic.on('applic:init', this._init.bind(this));
    applic.on('applic:ready', this._update.bind(this));
    applic.on('applic-state:changed', this._update.bind(this));

  }

  _init() { }

  _update() {
    this._updateSections();
  }

  _updateSections() {
    const _sections = applic.get('section') || {};

    if (!_sections || !Object.keys(_sections).length)
      return applic.newSection();

  }

}


applic.chatchFiles = (_params) => {
  console.log(_params)
}

applic.openSection = (_target) => {
  const _sections = applic.get('section');
  for (const _nonce in _sections) {
    _sections[_nonce].active = _nonce == _target;
  };

  applic.dispatch('applic:changed');
}

applic.newSection = () => {
  const _section = new ApplicSection();
  applic.set(`section.${_section.nonce}`, _section);
  applic.openSection(_section.nonce)
}


applic.newgraphic = (_params) => {
  const _graphic = new Applicgraphic(_params);
  applic.set(`graphic.${_graphic.nonce}`, _graphic);
}


const ApplicSection = class {
  constructor() {
    this.nonce = applic.utils.nonce();
    this.name = 'Untitled draft'

  }

  graphics() {
    const _graphics = applic.get('graphic') || {};
    const _insection = [];

    for (const _nonce of Object.keys(_graphics)) {
      if (_graphics[_nonce].section == this.nonce) {
        _insection.push(_graphics[_nonce]);
      }
    };

    return _insection;
  }

}

const Applicgraphic = class {
  constructor(_params) {
    this.nonce = applic.utils.nonce();
    this.section = _params.section;

    this.blob = _params.blob;
    this.uri = '';

    console.debug('applic-fs:create-graphic', this.blob.name)
    this._resolveBlob();
  }

  _changed() {
    applic.utils.buffer(() => {
      console.debug('applic-fs:cached-graphic', this.blob.name)
      applic.dispatch('applic:changed');
    });
  }

  _resolveBlob(_blob) {
    new Promise((resolve) => {
      const _reader = new FileReader();

      _reader.addEventListener("load", () => {
        this.uri = _reader.result;
        this._changed();
        resolve()
      }, false);

      _reader.readAsDataURL(this.blob);
    })
  }

}
