/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const DEFAULT_NONCE = 'd98fd9c2VTTJ4dE1aOul2E3aCyrUaoRTBzkV4SlTj5CtNSxFhN11sCE';

export class storageHandler {
  constructor() {
    window.addEventListener('storage', this.__handleLocalStorage.bind(this), false);
    applic.on('applic-state:changed', this.__onStateChanged.bind(this));

    this.__handleLocalStorage();
  }


  __onStateChanged(params) {
    const hasChanged = (nonce) => {
      return params.path.indexOf(nonce) == 0;
    };
    if (hasChanged('storage')) this.__handleStorage();
  }


  __obfuscate(string) {
    return self.utils.cipher(DEFAULT_NONCE)(string);
  }
  __decipher(string) {
    return self.utils.decipher(DEFAULT_NONCE)(string);
  }


  readStorage() {
    const localized = localStorage.getItem('applic');
    let local; if (localized) {
      local = JSON.parse(this.__decipher(localized));
    }

    return local || {};
  }
  writeStorage(value) {
    localStorage.setItem('applic',
        this.__obfuscate(JSON.stringify(value)));
  }


  __handleLocalStorage() {
    const storage = applic.get('storage') || {};
    const local = this.readStorage();

    applic.set('storage', utils.object.concat(storage, local));
  }


  __handleStorage() {
    const storage = applic.get('storage') || {};
    const local = this.readStorage();

    this.writeStorage(utils.object.concat(local, storage));
  }
}
