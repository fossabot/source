/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const MODULE_STATE = {};

applic.graphic = {}
applic.graphic.updated = () => { };

applic.graphic.get = () => {
   const _list = [];
   for (const _nonce in MODULE_STATE) {
      _list.push(MODULE_STATE[_nonce])
   };
   return _list;
}

applic.graphic.new = () => {
   return new class {
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

         });
      }

   }
}
