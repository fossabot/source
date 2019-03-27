/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://acontrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.import = {};

applic.import.toBlobUri = (_file) => {
   return new Promise((resolve) => {
      const _reader = window.URL || window.webkitURL;
      const _suffix = '--THIS-IS-NOT-A-SHAREABLE-URL--';

      resolve(`${_reader.createObjectURL(_file)}#${_suffix}`);
   })
};


applic.import.transfer = (_transfer, _params) => {
   return new class {
      constructor() {
         this.updated = () => { };

         console.debug('applic-import:transfer')
         console.log(_transfer, _params)

      }
   }
}
