/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const GRAPHIC_STATE = {};

applic.graphic = new class { }
applic.graphic.__proto__.updated = () => { };

applic.graphic.get = () => { return applic.utils.arrayify(GRAPHIC_STATE) }
applic.graphic.new = () => {
   return new class {
      constructor(_params) {
         this.nonce = applic.utils.nonce();
         this.section = _params.section;

         this.blob = _params.blob;
         this.uri = _params.blob.uri;

         console.debug('applic-fs:create-graphic', this.nonce)
      }

      _changed() {
         applic.utils.buffer(() => {
            console.debug('applic-fs:cached-graphic', this.nonce)

         });
      }

   }
}
