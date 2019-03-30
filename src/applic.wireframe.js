/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import './lib/utils/applic.utils.js'
import './lib/utils/applic.polyfill.js'

import './units/applic-event.js'
import './units/applic-state.js'

import './units/wireframe/wireframe.mount.js'

applic.__proto__.$ = document.querySelector('applic-mount');

Promise.resolve().then(async () => {
   await import('./applic.js');
   await import('./applic.lazies.js');
})

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);




const drop = {};
drop.move = (_event) => { _event.preventDefault(); };
drop.release = (_event) => {
   (async () => {
      const _transfer = _event.dataTransfer;

      const _importer = applic.newImport({

      });
      
      const _traverse = applic.import.traverse({
         types: ['image/png', 'image/svg', 'image/gif', 'image/jpeg'],

         files: !_transfer.files ? false : Array.from(_transfer.files),
         items: !_transfer.items ? false : Array.from(_transfer.items)
      });

      _traverse.onRegistered = (_params) => {
         _importer.add(_params.blob);
      }

      _traverse.onResolved = () => {
         _importer.resolved()
      }
      
   })()

   _event.dropEffect = 'copy';
   _event.preventDefault(); return false;
};

self.addEventListener('dragover', drop.move)
self.addEventListener('dragleave', drop.move)
self.addEventListener('drop', drop.release)
