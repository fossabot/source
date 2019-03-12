/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { render } from 'lit-html';

import './lib/elements/all-elements.js';

import { model } from './lib/model/all-models.js';
import { style } from './units/wireframe/wireframe.style.js';

import { ResponsiveGrid } from './units/wireframe/responsive-grid.js';
// import { WireframeOrder } from './units/wireframe/wireframe.order.js';
// import { WireframeHints } from './units/wireframe/wireframe.hints.js';


console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);


applic.$ = new class {
  constructor() {
    this.linked = false;
    this.state = { sheet: { open: false } };

    this.model = model;
    this.css = style.css;
    this.html = style.html;

    this.brack = new ResponsiveGrid();
    // this.hints = new WireframeHints();
    // this.order = new WireframeOrder();


    this.init();
  }


  link() {
    console.debug('applic-wireframe:linked', `${Date.now() - applic.created}ms`);
    // applic.state.on('change', this.update.bind(this))
    this.linked = true;
  }

  call(nonce) {
    const _path = nonce.split(':')
    
    if (_path[0] === 'applic-wireframe') {
      console.debug('applic-wireframe:call', `"${nonce}"`)
      try { this[_path[1]][_path[2]]() } 
      catch (err) { console.debug('applic-wireframe:call', `"${nonce}"`) }
    } else {
      console.log('applic call', _path[0])
    }
  }

  init() {
    this.mount = document.body;
    this.mount.setAttribute('role', 'application');
    this.mount.setAttribute('class', 'applic mount');

    if (Date.now() - applic.created > 220) {
      this.mount.setAttribute('unresolved', '');
      requestAnimationFrame(() => {
        this.mount.removeAttribute('unresolved');
      }) 
    }

    this.update(true);
    self.dispatchEvent(new Event('applic-wireframe:ready'));
  }

  update(first) {
    if (this.rendering) return;
    this.rendering = true;

    const apply = () => {
      this.rendering = false;

      // console.debug('applic-wireframe:render');
      render(model.mount(this), this.mount);

      Promise.resolve().then(() => {
        this['navigation-sheet'] = this.mount.querySelector('[applis-role="navigation-sheet"]')
      //   this.order.update();
      //   this.hints.update();
      });
    };

    if (first) console.debug('applic-wireframe:ready', `${Date.now() - applic.created}ms`);
    if (first) apply()
    
    else requestAnimationFrame(() => {
      this.state.sheet = {
        opened: this['navigation-sheet'].open
      }

      Promise.resolve().then(apply.bind(this))
    });
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
    if (value === null) {
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
