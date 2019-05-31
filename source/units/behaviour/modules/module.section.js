/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

const SECTION_STATE = {};

applic.section = new class { }
applic.section.active = null;

applic.section.get = (_nonce) => {
   // if ('*' == _nonce) {
   //    return applic.utils.arrayify(SECTION_STATE)
   // } else if ('~' == _nonce) {
   //    return SECTION_STATE[applic.section.active] || false
   // } else {
   //    return SECTION_STATE[_nonce] || false
   // }
};

applic.section.select = (_nonce) => {
   // if (applic.section.active == _nonce || !SECTION_STATE[_nonce]) return;
   // if (SECTION_STATE[applic.section.active]) {
   //    SECTION_STATE[applic.section.active].active = false;      
   // };

   // SECTION_STATE[_nonce].active = true; 
   
   // applic.section.active = _nonce;
   // applic.utils.buffer(applic.dispatch.bind(null, 'applic:changed'));
};

applic.section.remove = (_nonce) => {
   // if (!SECTION_STATE[_nonce]) return;
   // delete SECTION_STATE[_nonce];

   // Promise.resolve().then(() => {
   //    if (applic.section.active == _nonce ) {
   //       let _first = applic.section.get('*')[0];
   //       if (_first) applic.section.select(_first.nonce);
   //    };
      
   //    applic.utils.buffer(applic.dispatch.bind(null, 'applic:changed'));
   // })
};

applic.section.create = () => {
   // new class ApplicSection {
   //    constructor() {
   //       this.nonce = applic.utils.nonce();

   //       this.name = 'Untitled';
   //       this.active = false;

   //       SECTION_STATE[this.nonce] = this;

   //       applic.section.select(this.nonce);
   //       applic.utils.buffer(applic.dispatch.bind(null, 'applic:changed'));
   //    }

   // };

};
