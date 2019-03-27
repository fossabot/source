/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const __APPLIC_STATE__ = {};

applic.__proto__.get = (path) => {
  let target = __APPLIC_STATE__;
  const i = path.split('.');

  if ('*' == i[0]) return target;

  while (i.length != 0) {
    const nonce = i.shift();

    if (!target[nonce]) return undefined;
    target = target[nonce];
  }

  return target;
};

applic.__proto__.set = (path, value) => {
  let target = __APPLIC_STATE__;
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
