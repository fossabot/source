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


applic.newGrafic = (_params) => {
  const _grafic = new ApplicGrafic(_params);
  applic.set(`grafic.${_grafic.nonce}`, _grafic);
}


const ApplicSection = class {
  constructor() {
    this.nonce = applic.utils.nonce();

  }

  grafics() {
    const _grafics = applic.get('grafic') || {};
    const _insection = [];

    for (const _nonce of Object.keys(_grafics)) {
      if(_grafics[_nonce].section == this.nonce) {
        _insection.push(_grafics[_nonce]);
      }
    };

    return _insection;
  }

}

const ApplicGrafic = class {
  constructor(_params) {
    this.nonce = applic.utils.nonce();
    this.section = _params.section;

    this.blob = _params.blob;
    this.uri = '';

    console.debug('applic-fs:create-grafic', this.blob.name)
    this._resolveBlob();
  }

  _changed() {
    applic.utils.buffer(() => {
      console.debug('applic-fs:cached-grafic', this.blob.name)
      applic.dispatch('applic:changed');
    });
  }

  _resolveBlob(_blob) {
    const _reader = new FileReader();
    
    _reader.addEventListener("load", () => {
      this.uri = _reader.result;
      this._changed();
    }, false);

    _reader.readAsDataURL(this.blob);
  }

}
