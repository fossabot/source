/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const MODULE_STATE = {};

applic.section = {}
applic.section.updated = () => { };

applic.section.get = () => {
   const _list = []; 
   for (const _nonce in MODULE_STATE) {
      _list.push(MODULE_STATE[_nonce])
   };
   return _list;
}

applic.section.new = () => {
   _register(new class {
      constructor() {
         this.nonce = applic.utils.nonce();

      }

   });
}


const _register = (_class) => {
   MODULE_STATE[_class.nonce] = _class;
   applic.section.updated();
}