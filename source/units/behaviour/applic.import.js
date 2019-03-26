/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.import = {};
applic.import.fetchEntries = (_enteries) => {
   return new Promise((resolve) => {
      const _list = [];

      for (const _entery of _enteries) {
         console.log('_entery', _entery)

      };

      resolve(_list);
   })
};
applic.import.toBlobUri = (_file) => {
   return new Promise((resolve) => {
      const _reader = window.URL || window.webkitURL;
      const _suffix = '--THIS-IS-NOT-A-SHAREABLE-URL--';

      resolve(`${_reader.createObjectURL(_file)}#${_suffix}`);
   })
};


applic.import.transfer = (_event) => {
   console.debug('applic-import:transfer')
   console.log(_event)
}


// applic.import.drop = () => {
//    const _section = applic.getActive('section');
//    const _params = {
//       section: _section,
//       transfer: (() => {
//          if (!evt.dataTransfer.items) return false;
//          const _list = []; for (const _file of evt.dataTransfer.items) {
//             if (_file.kind === 'file') _list.push(_file)
//          }
//          return _list;
//       })(),
//       files: (() => {
//          // if (evt.dataTransfer.items) return false;
//          const _list = []; for (const _file of evt.dataTransfer.files) { _list.push(_file) }
//          return _list;
//       })()
//    }

//    /** FIXME: Add lazy handler */
//    if (!applic.chatchTransfer) return console.error('applic.chatchTransfer', 'not ready');
//    applic.chatchTransfer(_params)  
// }