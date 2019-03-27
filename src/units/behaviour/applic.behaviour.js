/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import './applic.import.js';

import '../modules/module.graphic.js';
import '../modules/module.section.js';

console.log('applic.behaviour.js')

new class {
  constructor() {
    applic.graphic.updated = this.updated.bind(this);
    applic.section.updated = this.updated.bind(this);

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
      applic.section.new(); return false; 
    };


    return true;
  }
 

}


applic.__proto__.call = (_type) => {
  console.log(_type);

};

applic.__proto__.newImport = (_type) => {
  return new class {
    constructor() {
      console.log(_type);

    }

    add() {}

    done() {
      delete this;
    }
  }
};




// applic.chatchTransfer = async (_params) => {
//   for (const _section of _params.section) {
//     // const _data = /* _params.transfer ? await applic.fs.fetchEntries(_params.transfer) : */ ( async () => {
//     const _data = await new Promise(async (resolve) => {
//       const _list = [];

//       for (const _file of _params.files) {
//         _list.push({
//           uri: await applic.fs.toBlobUri(_file)
//         })
//       }

//       resolve(_list);
//     });

//     const _graphics = [];
//     for (const _entery of _data) {
//       _graphics.push(new ApplicGraphic({
//         blob: _entery,
//         section: _section.nonce
//       }));
//     };

//     const _state = applic.get('graphic') || {};
//     for (const _graphic of _graphics) {
//       _state[_graphic.nonce] = _graphic;

//     }

//     applic.set('graphic', _state)
//   }
// }

// applic.getActive = (_nonce) => {
//   const _list = [], _state = applic.get(_nonce);
//   for (const _nonce in _state) {
//     if (_state[_nonce].active) { _list.push(_state[_nonce]) }
//   };

//   return _list;
// }

// applic.openSection = (_target) => {
//   const _sections = applic.get('section');
//   for (const _nonce in _sections) {
//     _sections[_nonce].active = _nonce == _target;
//   };

//   applic.dispatch('applic:changed');
// }

// applic.newSection = () => {
//   const _section = new ApplicSection();

//   applic.set(`section.${_section.nonce}`, _section);
//   applic.openSection(_section.nonce)
// }


// applic.newGraphic = (_params) => {
//   const _graphic = new ApplicGraphic(_params);

//   applic.set(`graphic.${_graphic.nonce}`, _graphic);
// }












