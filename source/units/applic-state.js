/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

const _store = { salt: '247d2f303326393633332c7d657d3130313a7d737d3b3e2b3a7d656e6a6a67666f6c696d676d6b6f22', paths: [] };
const _state = { tree: {} };

applic.__proto__.state = {};

applic.state.get = (path) => {
  let target = _state.tree;
  const i = path.split('.');

  if ('*' == i[0]) return target;

  while (i.length != 0) {
    const nonce = i.shift();

    if (!target[nonce]) return undefined;
    target = target[nonce];
  }

  return target;
};

applic.state.set = (path, value) => {
  let target = _state.tree;
  const i = path.split('.');

  while (i.length != 0) {
    const nonce = i.shift();

    if (i.length != 0) {
      if (!target[nonce]) target[nonce] = {};
      target = target[nonce];
    } else {
      if (value == null) {
        delete target[nonce];
      } else {
        target[nonce] = value;
      }
    }
  }

  applic.dispatch('applic-state:changed', { path });
};


_store.set = (_nonce, _value) => {
  const _cipher = applic.__proto__.utils.cipher(`${_store.salt}${_nonce}`);
  self.localStorage[_nonce] = _cipher(JSON.stringify(_value));
};

_store.get = (_nonce) => {
  const _decipher = applic.__proto__.utils.decipher(`${_store.salt}${_nonce}`);
  return JSON.parse(_decipher(self.localStorage[_nonce]))
};

applic.state.keep = (nonce) => {
  _store.paths.push(nonce)

  const _update = () => {
    _store.set(nonce, applic.state.get(nonce))
  };

  if (!self.localStorage[nonce]) _update();
  else {
    const _value = _store.get(nonce)

    applic.state.set(nonce, _value); 
  };

  applic.on('applic-state:changed', _update);
};

applic.state.clean = () => {
  Object.keys(self.localStorage).forEach((nonce) => {
    if (-1 == _store.paths.indexOf(nonce)) self.localStorage.removeItem(nonce)
  })
};
