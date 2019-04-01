/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import './lib/utils/applic.utils.js'
import './lib/utils/applic.polyfill.js'

import './units/applic-event.js'
import './units/applic-state.js'

import './units/wireframe/wireframe.mount.js'



applic.utils.buffer(async () => {
   await import('./applic.js');
   await import('./applic.lazies.js');
})

applic.$ = document.querySelector('applic-mount');


const drop = {};
drop.move = (_event) => { _event.preventDefault(); };
drop.release = (_event) => {
   (async () => {
      const _transfer = _event.dataTransfer;

      const _importer = applic.newImport({

      });

      const _traverse = applic.import.traverse({
         /**
          * All image-types work technically. BUT I DO NOT WANT PEOPLE JUST DOWNLOAD
          * IMAGES FROM GOOGLE AND MAKE EMOTES OUT OF THEM. So I limit it to the most
          * common file types from people that actually create proper emotes.
          */
         types: ['image/png', 'image/svg', 'image/gif'],

         files: !_transfer.files ? false : Array.from(_transfer.files),
         items: !_transfer.items ? false : Array.from(_transfer.items)
      });

      _traverse.onRegistered = (_params) => {
         _importer.add(_params.blob);
      };

      _traverse.onChanged = (_params) => {
         _importer.update(_params.blob);
      };

      _traverse.onResolved = () => {
         _importer.resolved()
      };

      _traverse.onRejected = (_params) => {
         console.warn('[Import rejected]', `File type '${_params.type}' of '${_params.name}' is not supported`);
      };

   })()

   _event.dropEffect = 'copy';
   _event.preventDefault(); return false;
};

applic.$.addEventListener('dragover', drop.move)
applic.$.addEventListener('dragleave', drop.move)
applic.$.addEventListener('drop', drop.release)
