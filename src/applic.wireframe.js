/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/


import './units/wireframe/wireframe.mount.js'



Promise.resolve().then(async () => {
   await import('./applic.js');
   await import('./applic.lazies.js');
})

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);




self.dispatchEvent(new CustomEvent('', {}))


const drop = {};
drop.move = (_event) => { _event.preventDefault(); };
drop.release = (_event) => {
   (async () => {
      const _importer = applic.newImport({

      });
      
      const _traverse = applic.import.transfer({
         files: Array.from(_event.dataTransfer.files),
         items: Array.from(_event.dataTransfer.items)
      });

      _traverse.updated = () => {
         console.log('updated', _traverse)
      }

   })()

   _event.dropEffect = 'copy';
   _event.preventDefault(); return false;
};

self.addEventListener('dragover', drop.move)
self.addEventListener('dragleave', drop.move)
self.addEventListener('drop', drop.release)
