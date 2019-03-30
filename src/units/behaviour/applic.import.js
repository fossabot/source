/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://acontrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.import = {};

const _toBlobUri = (_file) => {
   const _reader = window.URL || window.webkitURL;
   return `${_reader.createObjectURL(_file)}`
};

// const _toBlobUri = (_file) => {
//    const _reader = window.URL || window.webkitURL;
//    // const _suffix = '--THIS-IS-NOT-A-SHAREABLE-URL--';
//    // return `${_reader.createObjectURL(_file)}#${_suffix}`;
// };

applic.import.traverse = (_params) => {
   return new class {
      constructor() {
         this.types = _params.types || [];
         this.blobs = {};

         this.onRegistered = () => { };
         this.onChanged = () => { };
         this.onResolved = () => { };

         // console.debug('applic-import:traverse-new', _params)

         Promise.resolve().then(() => {
            if (_params.items) {
               (async () => {
                  await this._traverse({ items: _params.items });
                  this._resolve();
               })()

            } else {
               console.debug('applic-import:traverse-files-only');
               this._resolveFiles({ files: _params.files });
            };

         });


      }

      _traverse(_iteration) {
         return new Promise(async (resolve) => {
            if (!_iteration.entries) _iteration.entries = [];
            if (!_iteration.depth) _iteration.depth = 0;

            if (_iteration.items) {
               for (const _item of _iteration.items) {
                  _iteration.entries.push(_item.webkitGetAsEntry());
               };
            };

               for (const _entry of _iteration.entries) {
                  if (_entry.isFile) {
                     this._register(await new Promise((resolve) => {
                        _entry.file((_file) => {
                           resolve(_file);
                        });
                     }));
                  }
                  else if (_entry.isDirectory && _iteration.depth < 5) {
                     await new Promise((resolve) => {
                        _entry.createReader().readEntries(async (_entries) => {
                           await this._traverse({
                              entries: _entries,
                              depth: ++_iteration.depth
                           });

                           resolve()
                        })
                     });
                  } else { }
               };

            resolve()
         })
      }


      _register(_file) {
         if (-1 == this.types.indexOf(_file.type)) {
            console.debug('applic-import:traverse-invalid-type', _file.type);
            return;
         };

         const _nonce = applic.utils.nonce();
         this.blobs[_nonce] = {
            file: _file, 
            nonce: _nonce,
            detail: {
               name: escape(_file.name),
               type: escape(_file.type),
               lastModified: new Date(_file.lastModified)
            }   
         };

         this.onRegistered({ blob: this.blobs[_nonce] });
      }

      async _resolve() {
         for (const _nonce in this.blobs) {
            const _blob = this.blobs[_nonce];

            _blob.uri = await _toBlobUri(_blob.file);
            // _blob.file = false;

            this.onChanged({ blob: this.blobs[_nonce] });
         };


         this.onResolved();
      }

      _resolveFiles(_iteration) {
         for (const _file of _iteration.files) {
            this._register(_file)
         };

         this._resolve();
      }

   }
}