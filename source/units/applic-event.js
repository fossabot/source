/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const dispatch = (nonce, params) => {
  self.dispatchEvent(new CustomEvent(nonce, {detail: params}));
};

export const on = (nonce, callback, params) => {
  self.addEventListener(nonce, (evt) => {
    callback(evt.detail);
  }, params);
};
