/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {WorkerMixin} from './applic-worker.mixin.js';

export class WebWorkerMixin extends WorkerMixin {
  //   run(workerLocation) {
  //     this.self = new Worker(workerLocation);
  //     this.self.onmessage = this.__handleMassage.bind(this);

  //     this.call('ready?');
  //     // Promise.resolve().then(() => {
  //     //   applic.dispatch('applic-worker:hello', {})
  //     // })
  //   }

  //   terminate() {
  //     this.self.terminate();
  //   }

  //   call(nonce, params) {
  //     this.self.postMessage({nonce, params});
  //   }


  //   __handleMassage(evt) {
  //     this.state = evt.data.params.state;

  //     switch (evt.data.nonce) {
  //       case 'ready':
  //         if (this.onReady) this.onReady();
  //         break;
  //       case 'changed':
  //         if (this.onChanged) this.onChanged();
  //         break;
  //       case 'resolve':
  //         if (this.onResolve) this.onResolve();
  //         break;
  //     }
  //   }
}
