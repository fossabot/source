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

    Promise.resolve().then(() => {
      this._update()
    })
  }

  _init() {
    // applic.set('', {

    // })
  }

  _update() {
    this._updateSections();
    applic.dispatch('applic:changed');
  }

  _updateSections() {
    const _sections = applic.get('section') || {};

    if (!_sections || !Object.keys(_sections).length)
      return applic.newSection();

  }

}



applic.chatchTransfer = async (_params) => {
  for (const _section of _params.section) {
    // const _data = /* _params.transfer ? await applic.fs.fetchEntries(_params.transfer) : */ ( async () => {
    const _data = await new Promise(async (resolve) => {
      const _list = [];

      for (const _file of _params.files) {
        _list.push({
          uri: await applic.fs.toBlobUri(_file)
        })
      }

      resolve(_list);
    });

    const _graphics = [];
    for (const _entery of _data) {
      _graphics.push(new ApplicGraphic({ 
        blob: _entery, 
        section: _section.nonce
      }));
    };

    const _state = applic.get('graphic') || {};
    for (const _graphic of _graphics) {
      _state[_graphic.nonce] = _graphic;

    }

    applic.set('graphic', _state)
  }
}

applic.getActive = (_nonce) => {
  const _list = [], _state = applic.get(_nonce);
  for (const _nonce in _state) {
    if (_state[_nonce].active) { _list.push(_state[_nonce]) }
  };

  return _list;
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


applic.newGraphic = (_params) => {
  const _graphic = new ApplicGraphic(_params);

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

const ApplicGraphic = class {
  constructor(_params) {
    this.nonce = applic.utils.nonce();
    this.section = _params.section;

    this.blob = _params.blob;
    this.uri = _params.blob.uri;

    console.debug('applic-fs:create-graphic', this.blob.name)
  }

  _changed() {
    applic.utils.buffer(() => {
      console.debug('applic-fs:cached-graphic', this.blob.name)
      applic.dispatch('applic:changed');
    });
  }

}



applic.fs = {};
applic.fs.fetchEntries = (_enteries) => {
  return new Promise((resolve) => {
    const _list = [];

    for (const _entery of _enteries) {
      console.log('_entery', _entery)

    };

    resolve(_list);
  })
};
applic.fs.toBlobUri = (_file) => {
  return new Promise((resolve) => {
    const _reader = window.URL || window.webkitURL;
    const _suffix = '--THIS-IS-NOT-A-SHAREABLE-URL--';
    
    resolve(`${_reader.createObjectURL(_file)}#${_suffix}`);
  })
};
