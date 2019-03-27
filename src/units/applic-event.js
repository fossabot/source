/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.dispatch = (nonce, params) => {
  self.dispatchEvent(new CustomEvent(nonce, { detail: params }));
};

applic.__proto__.on = (nonce, callback, params = { passive: true }) => {
  self.addEventListener(nonce, (evt) => {
    callback(evt.detail);
  }, params);
};
