/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {render} from 'lit-html';
import {model} from './lib/model/all-models.js';

import './lib/pattern/pattern.js';

console.info('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);


applic.$ = new class {
  constructor() {
    this.linked = false;
    this.state = { };

    // this.init.bind(this)
    Promise.resolve().then(this.init.bind(this));
  }


  link() {
    // console.info('applic-wireframe:linked', `${Date.now() - applic.created}ms`);
    // applic.state.on('change', this.update.bind(this))
    this.linked = true;
  }

  init() {
    this.mount = document.body;
    this.mount.setAttribute('role', 'application');
    this.mount.setAttribute('class', 'applic mount');

    this.update();
    self.dispatchEvent(new Event('applic-wireframe:ready'));
  }

  update() {
    render(model.mount(model, this.state), this.mount);
    applic.$.hints.update();
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
    if (value == null) delete obj[key];
    else obj[key] = value;

    this.update();
  }
};


applic.$.hints = new class {
  update() {
    if (!this.hintParent) {
      this.hintVisible = false;
      this.hintCall = setTimeout(() => {});
      this.hintParent = [];
      window.addEventListener('blur', this.resetHint.bind(this));
    }

    const activeHint = this.hintParent;
    const requreHint = [...document.querySelectorAll('[applc-hint]')];

    for (const node of activeHint) {
      const i = requreHint.indexOf(node);
      if (-1 == i) activeHint.splice(i, 1);
    };
    for (const node of requreHint) {
      if (-1 == activeHint.indexOf(node)) {
        activeHint.push(node);
        node.addEventListener('mouseover', (event) => {
          this.hint(node);
        });
        node.addEventListener('mouseleave', this.resetHint.bind(this));
      };
    };
  }

  hint(node) {
    self.clearTimeout(this.hintCall);
    this.hintVisible = true;
    this.hintCall = setTimeout(() => {
      applic.$.set('hint', {
        target: node,
        inner: node.getAttribute('applc-hint'),
        align: node.getAttribute('applc-hint-align'),
      });
    }, 200);
  }

  resetHint() {
    if (this.hintVisible == true) {
      self.clearTimeout(this.hintCall);
      this.hintVisible = false;
      applic.$.set('hint', null);
    }
  }
};

