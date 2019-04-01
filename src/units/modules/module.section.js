/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

const SECTION_STATE = {};

applic.section = new class { }
applic.section.__proto__.updated = () => { };

applic.section.get = () => { return applic.utils.arrayify(SECTION_STATE) };

applic.section.select = () => {

};

applic.section.remove = (_nonce) => {
   if (!SECTION_STATE[_nonce]) return;
   delete SECTION_STATE[_nonce];

   applic.utils.buffer(() => {
      applic.dispatch('applic:changed');
   })
};

applic.section.create = () => {
   _register(new class ApplicSection {
      constructor() {
         this.nonce = applic.utils.nonce();

      }

   });
};




const _register = (_class) => {
   SECTION_STATE[_class.nonce] = _class;
   applic.section.updated();
};
