/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

const GRAPHIC_STATE = {};

applic.graphic = new class { }
applic.graphic.__proto__.updated = () => { };

applic.graphic.get = () => { return applic.utils.arrayify(GRAPHIC_STATE) };
applic.graphic.new = (_params) => {
   return new class ApplicGraphic {
      constructor() {
         this.nonce = applic.utils.nonce();
         this.section = _params.section;

         this.blob = _params.blob;
         GRAPHIC_STATE[this.nonce] = this;

         console.debug('applic-fs:cached-graphic', {
            graphic: this,
            section: this.section
         })
         
         applic.dispatch('applic:updated');
      }

      update(_params) {
         if (_params.section) this.section = _params.section;
         if (_params.blob) this.blob = _params.blob;

         this._changed();
      }

      _changed() {
         this.uri = this.uri || this.blob.uri || false;

         applic.utils.buffer(() => {
            console.debug('applic-fs:update-graphic', {
               graphic: this,
               section: this.section
            })

            applic.dispatch('applic:updated');
         });

      }

   }
}
