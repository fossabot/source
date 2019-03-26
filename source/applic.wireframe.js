/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import { render, html } from 'lit-html';
import { model } from './lib/model/all-models.js';

import './lib/elements/all-elements.js';

import './units/wireframe/wireframe.element.js';
import './units/wireframe/wireframe.style.js';

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);




self.dispatchEvent(new CustomEvent('', {}))


const drop = {};
drop.move = (_event) => { _event.preventDefault(); return false; };
drop.release = (_event) => {
   applic.import.transfer(_event.dataTransfer);

   _event.dropEffect = 'copy';
   _event.preventDefault(); return false;
};

self.addEventListener('dragover', drop.move)
self.addEventListener('dragleave', drop.move)
self.addEventListener('drop', drop.release)
