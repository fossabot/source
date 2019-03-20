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

applic.newGrafic = () => {
  const _grafic = new ApplicGrafic();
  applic.set(`grafic.${_grafic.nonce}`, _grafic);
}


const ApplicSection = class {
  constructor() {
    this.nonce = applic.utils.nonce();

  }

  grafics() {
    const _grafics = applic.get('grafic') || {};
    const _insection = [{
      nonce: 'test_0'
    }, {
      nonce: 'test_1'
    }];

    for (const _nonce of Object.keys(_grafics)) {
      _insection.push(_grafics[_nonce]);
    };

    return _insection;
  }

}

const ApplicGrafic = class {
  constructor() {
    this.nonce = applic.utils.nonce();

  }

}
