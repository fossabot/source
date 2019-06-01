/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export class ApplicEvent {
  constructor() {}
  on(nonce, callback, params) { 
    self.addEventListener(nonce, (evt) => {
      callback(evt.detail, event);
    }, params);
  }

  dispatch(nonce, params) {
    self.dispatchEvent(new CustomEvent(nonce, { detail: params }));
  }
  
}
