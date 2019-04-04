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

applic.graphic.types = [{
   nonce: 'twitch:emote'

}, {
   nonce: 'twitch:badge'

}]


applic.graphic.get = (_nonce) => {
   if ('*' == _nonce) {
      return applic.utils.arrayify(GRAPHIC_STATE)
   } else if (typeof _nonce == 'object') {
      let _list = applic.utils.arrayify(GRAPHIC_STATE);

      _list = _list.filter((_node) => {
         let _match = true; Object.keys(_nonce).forEach((_key) => {
            if (_node[_key] != _nonce[_key]) _match = false;
         })

         return _match;
      });

      return _list;
   } else {
      return GRAPHIC_STATE[_nonce] || false
   }
};

applic.graphic.select = (_nonce) => {
   if (!GRAPHIC_STATE[_nonce]) return;

}

applic.graphic.remove = (_nonce) => {
   if (!GRAPHIC_STATE[_nonce]) return;
   delete GRAPHIC_STATE[_nonce];

   applic.utils.buffer(() => {
      applic.dispatch('applic:changed');
   })
}

applic.graphic.create = (_params) => {
   return new class ApplicGraphic {
      constructor() {
         this.nonce = applic.utils.nonce();
         this.alias = applic.utils.alias();

         this.blob = _params.blob;
         this.detail = _params.blob.detail;

         this.section = _params.section;
         this.type = 'twitch:emote'


         this.uri = '';


         GRAPHIC_STATE[this.nonce] = this;

         // console.debug('applic-fs:cached-graphic', {
         //    graphic: this,
         //    section: this.section
         // })

         applic.dispatch('applic:changed');
      }

      update(_params) {
         if (_params.section) this.section = _params.section;
         if (_params.blob) this.blob = _params.blob;

         this._changed();
      }

      _changed() {
         // this.uri = this.uri || this.blob.uri || false;

         applic.utils.buffer(() => {
            // console.debug('applic-fs:update-graphic', {
            //    graphic: this,
            //    section: this.section
            // })

            applic.dispatch('applic:changed');
         });

      }

   }
}
