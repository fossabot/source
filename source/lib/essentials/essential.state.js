/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

const STATE_TREE = {}

export class ApplicState {
  constructor() {}

  get(path) {
    let target = STATE_TREE;
    const i = path.split('.');

    if ('*' == i[0]) return target;

    while (i.length != 0) {
      const nonce = i.shift();

      if (!target[nonce]) return undefined;
      target = target[nonce];
    };

    return target;
  }

  set(path, value) {
    let target = STATE_TREE;
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
        };
      };
    };

    applic.dispatch('applic-state:changed', { path });
  }

}
