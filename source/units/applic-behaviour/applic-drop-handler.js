/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export class dropHandler {
  constructor() {
    window.addEventListener('dragover', () => {
      event.preventDefault(); return false;
    });
    window.addEventListener('drop', () => {
      event.dataTransfer.dropEffect = 'copy';
      event.preventDefault(); return false;
    });
    window.addEventListener('drop', this.__onDrop.bind(this));
  }


  async __onDrop(event) {
    if (!event.dataTransfer.files.length) return;

    const worker = applic.worker.import(event.dataTransfer, {
      fileTypes: ['image/png', 'image/gif'],
    });


    worker.on('changed', () => {
      utils.arrayify(worker.files).forEach((file) => {
        if (!applic.get(`importedFiles.${file.nonce}`)) {
          file.importParams = {
            graphicClass: 'HVr3igMypuOjwsNoo7W1jY7n',
          };

          applic.set(`importedFiles.${file.nonce}`, file);
        }
      });
    });

    worker.on('resolved', () => {
      utils.buffer(() => {
        utils.arrayify(worker.files).forEach((file) => {
          applic.set(`importedFiles.${file.nonce}`, null);
        });

        if (!Object.keys(applic.get(`importedFiles`)).length) {
          applic.set(`importedFiles`, null);
        }
      });
    });
  }
}
