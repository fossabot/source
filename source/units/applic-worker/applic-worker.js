/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {FsImport} from '../applic-processing/fs/import.js';
import {IsDraw} from '../applic-processing/is/draw.js';

export class ApplicWorker {
  constructor(workerRoot) {
    this.workerRoot = workerRoot;
    this.workers = {};
    this.running = {};
  }

  __next() {
    const workers = utils.arrayify(this.workers);
    workers.forEach((worker) => {
      if (!this.running[worker.nonce] && worker.priority == -1) {
        this.running[worker.nonce] = true;
        worker.init();
      };
    });

    if (Object.keys(this.running).length) {

    } else {
      workers.sort((w0, w1) => {
        return w0.priority - w1.priority;
      });

      if (workers[0]) {
        this.running[workers[0].nonce] = true;
        workers[0].init();
      };
    }
  }


  __addWorker(worker, priority) {
    this.workers[worker.nonce] = worker;
    this.workers[worker.nonce].priority = priority;

    this.__next();
  }
  __removeWorker(worker) {
    delete this.running[worker.nonce];
    delete this.workers[worker.nonce];

    this.__next();
  }


  pause(nonce) {
    const workers = nonce == '*' ? Object.keys(this.workers) : [nonce];
    workers.forEach((nonce) => {
      console.log('pause', nonce, this.workers[nonce]);
      if (this.workers[nonce].paused == false) {
        this.workers[nonce].pause();
      }
    });
  }
  resume(nonce) {
    if (nonce == '*') {
      this.__next();
    } else {
      if (this.workers[nonce].paused == true) {
        this.workers[nonce].resume();
      }
    }
  }
  cancel(nonce) {
    const workers = nonce == '*' ? Object.keys(this.workers) : [nonce];
    workers.forEach((nonce) => {
      console.log('cancel', nonce, this.workers[nonce]);
      this.workers[nonce].cancel();
      delete this.workers[nonce];
    });
  }


  draw(uri, params) {
    const isDraw = new IsDraw(params);
    console.log(uri, params);

    isDraw.on('init', () => {
      isDraw.draw(uri);
    });
    isDraw.on('resolved', () => {
      this.__removeWorker(isDraw);
      this.__next();
    });

    this.__addWorker(isDraw, 1);
    return isDraw;
  }

  import(dataTransfer, params) {
    const fsImport = new FsImport(params);

    fsImport.on('init', () => {
      fsImport.fetch(dataTransfer);
    });
    fsImport.on('resolved', () => {
      this.__removeWorker(fsImport);
      this.__next();
    });

    this.__addWorker(fsImport, -1);
    return fsImport;
  }
}


// class WebWorker extends WorkerMixin {
//   constructor(workerSrc) {
//     super();
//     this.client = new Worker(workerSrc);
//     this.client.terminate();
//   }

// }
