/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const SECTION_STATE = {};

applic.section = {}
applic.section.updated = () => { };

applic.section.get = () => { return applic.utils.arrayify(SECTION_STATE) }
applic.section.new = () => {
   _register(new class {
      constructor() {
         this.nonce = applic.utils.nonce();

      }

   });
}


const _register = (_class) => {
   SECTION_STATE[_class.nonce] = _class;
   applic.section.updated();
}