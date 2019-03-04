/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {WorkerMixin} from '../../applic-worker/applic-worker.mixin.js';

export class FsImport extends WorkerMixin {
  constructor(params) {
    super();

    if (params.fileTypes) {
      this.fileTypes = params.fileTypes;
    };

    this.fileTree = {
      kind: 'directory',
    };
    this.files = {};
  }

  fetch(dataTransfer) {
    const files = dataTransfer.files || false;
    const items = dataTransfer.items || false;

    Promise.resolve().then(async () => {
      if (!items) {
        for (const file of files) {
          this.__addFile('/', file);
        }
      } else {
        const entries = await translateToEntery(items);
        await this.__traverse(entries);
      }
    });
  }

  async __traverse(rootEntries) {
    await this.__isPausing();

    const fetchBranch = (path, entries) => {
      return new Promise(async (resolve) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isFile) {
            await this.__isPausing();
            await new Promise((resolve) => {
              entries[i].file((file) => {
                this.__addFile(path, file);
                resolve();
              });
            });
          } else {
            await new Promise(async (resolve) => {
              const directory = entries[i];
              directory
                  .createReader()
                  .readEntries(async (entries) => {
                    if (entries[i]) {
                      await fetchBranch(`${path}${directory.name}/`, entries);
                      resolve();
                    }
                  });
            });
          }
        };

        resolve();
      });
    };

    await fetchBranch('/', rootEntries);
    this.resolve();
  }

  __addFile(path, file) {
    if (this.fileTypes && -1 == this.fileTypes.indexOf(file.type)) return;

    const nonce = utils.nonce();
    this.files[nonce] = {
      nonce, path,

      name: file.name,
      date: file.lastModified,

      file,
      fileUri: URL.createObjectURL(file),
      fileType: file.type,
    };

    this.changed();
  }
}

const translateToEntery = (items) => {
  if (!items) return [];
  return new Promise((resolve) => {
    const entries = []; for (let i = 0; i < items.length; i++) {
      const entery = items[i].webkitGetAsEntry();
      if (!!entery) entries.push(entery);
    };

    resolve(entries);
  });
};
