/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { render } from 'lit-html';
import { model } from './lib/model/all-models.js';

import './lib/pattern/pattern.js';

import { WireframeHints } from './units/wireframe/wireframe.hints.js';
import { WireframeOrder } from './units/wireframe/wireframe.order.js';

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);


applic.$ = new class {
  constructor() {
    this.linked = false;
    this.state = {
      cards: [

      ]
    };

    this.hints = new WireframeHints();
    this.order = new WireframeOrder();

    this.init();
  }


  link() {
    console.debug('applic-wireframe:linked', `${Date.now() - applic.created}ms`);
    // applic.state.on('change', this.update.bind(this))
    this.linked = true;
  }

  init() {
    this.mount = document.body;
    this.mount.setAttribute('role', 'application');
    this.mount.setAttribute('class', 'applic mount');

    if (Date.now() - applic.created > 130) {
      this.mount.setAttribute('unresolved', '');
      setTimeout(() => { this.mount.removeAttribute('unresolved') }, 0);
    }

    this.update(true);
    self.dispatchEvent(new Event('applic-wireframe:ready'));
  }

  update(first) {
    if (this.rendering) return;
    this.rendering = true;

    const apply = () => {
      this.rendering = false;

      // console.debug('applic-wireframe:render', `${Date.now() - applic.created}ms`);
      render(model.mount(model, this.state), this.mount);

      Promise.resolve().then(() => {
        this.order.update();
        this.hints.update();
      });
    };

    if (first) console.debug('applic-wireframe:ready', `${Date.now() - applic.created}ms`);
    if (first) apply()
    else Promise.resolve().then(apply.bind(this));
  }

  set(path, value) {
    let obj = this.state;
    const stack = path.split('.');

    while (stack.length > 1) {
      const key = stack.shift();
      if (!obj[key]) obj[key] = {};
      obj = obj[key];
    };

    const key = stack.shift();
    if (!obj[key]) obj[key] = {};
    if (value == null) {
      delete obj[key];
      this.update();
    } else if (obj[key] != value) {
      obj[key] = value;
      this.update();
    };
  }

  nonce() {
    let nonce = ''; const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 24; i++) {
      nonce += s.charAt(Math.floor(Math.random() * s.length));
    };
    return nonce;
  }
};
