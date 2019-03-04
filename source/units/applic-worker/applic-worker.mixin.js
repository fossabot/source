/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export class WorkerMixin {
  constructor() {
    this.nonce = utils.nonce();

    // this.on('init', () => {

    // });
    // this.on('changed', () => {

    // });
    this.on('resolved', () => {
      applic.set(`worker.${this.nonce}.resolved`, true);
    });

    // this.on('paused', () => {

    // });
    // this.on('resume', () => {

    // });

    this.paused = true;
    this.resolved = false;
    applic.set(`worker.${this.nonce}`, this);
  }

  init() {
    this.inited = true;
    this.paused = false;
    this.dispatch('init');
  }

  changed() {
    this.dispatch('changed');
  }

  resolve() {
    this.resolved = true;
    this.dispatch('resolved');
    Promise.resolve().then(() => {
      applic.set(`worker.${this.nonce}`, null);
    });
  }


  pause() {
    this.paused = true;
    this.dispatch('paused');
  }
  resume() {
    this.paused = false;
    this.dispatch('resumed');
  }
  cancel() {
    this.dispatch('canceled');
    applic.set(`worker.${this.nonce}`, null);
  }


  __isPausing() {
    return new Promise((resolve) => {
      const release = () => {
        if (this.paused != true) {
          clearInterval(releaseT);
          resolve();
        }
      };

      const releaseT = setInterval(release, 100);
      release();
    });
  }


  dispatch(nonce, params) {
    applic.dispatch(`worker-${this.nonce}:${nonce}`, params);
  }

  on(nonce, callback) {
    applic.on(`worker-${this.nonce}:${nonce}`, callback);
  }
}
