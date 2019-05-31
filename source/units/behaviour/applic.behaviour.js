/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

// import './modules/module.graphic.js';
import './modules/module.section.js';


applic.__proto__.files = {};

applic.files.register = (detail, params) => {
  // console.log('applic.files.register', detail, params)

  const file = {
    nonce: applic.utils.nonce(),

    source: {
      blob: detail.blob, 
      uri: detail.uri
    }

  };

  applic.state.set(`applic:files.${file.nonce}`, file)

};



applic.__proto__.import = {};

applic.import.types  = ['image/png', 'image/gif'];
applic.import.catched = async (fileList, params) => {
  for (const _file of fileList) {
    if (-1 == applic.import.types.indexOf(_file.type)) return;

    applic.files.register({
      name: _file.name, type: _file.type,
      blob: _file, uri: URL.createObjectURL(_file),
      modified: _file.lastModifiedDate
    }, params);

  };
};


// applic.__proto__.newImport = (_params) => {
//   return new class {
//     constructor() {
//       if (!_params.section) throw 'Require section for import';

//       this.graphic = {};
//       this.section = _params.section;œ
//       this.type = _params.type;

//       // console.log('importer-created', _params)
//     }

//     add(_blob) {
//       this.graphic[_blob.nonce] = applic.graphic.create({
//         section: this.section,
//         type: this.type,
//         blob: _blob
//       })
//     }

//     update(_blob) {
//       this.graphic[_blob.nonce].update({
//         blob: _blob
//       })
//     }

//     resolved() {
//       // console.log('importer-resolved')
//     }
//   }
// };
