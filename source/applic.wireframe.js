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
    // console.log('applic-wireframe:update');
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
    if (value == null) {
      delete obj[key];
      this.update();
    }
    else if (obj[key] != value) {
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


applic.$.hints = new class {
  constructor() {
    this.hintParent = [];
    applic.$.state.hint = {};
  }
  
  update() {
    const requreHint = [...document.querySelectorAll('[applc-hint]')];

    for (const node of this.hintParent) {
      const i = requreHint.indexOf(node);
      if (-1 == i) this.hintParent.splice(i, 1);
    };

    for (const node of requreHint) {
      if (-1 == this.hintParent.indexOf(node)) {
        this.hintParent.push(node);

        const nonce = `applic-hint-${applic.$.nonce()}`;

        applic.$.set(`hint.${nonce}`, {
          nonce, target: node, show: false, render: false,
          inner: node.getAttribute('applc-hint'),
          align: node.getAttribute('applc-hint-align'),
          deprecat: () => { applic.$.set(`hint.${nonce}.render`, false) }
        });
        
        node.addEventListener('mouseover', (event) => { this.hint(nonce) });
        node.addEventListener('mouseleave', (event) => { this.resetHint(nonce) });
      };
    };
  }

  hint( nonce) { 
    applic.$.set(`hint.${nonce}.render`, true)
    applic.$.set(`hint.${nonce}.show`, true) 
  }
  resetHint(nonce) { applic.$.set(`hint.${nonce}.show`, false) }

};
