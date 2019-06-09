/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export class ApplicServiceWorkers {
 constructor() {
    if (applic.devlop()) return;

		self.addEventListener('load', this.register, { passive: true, once: true })
		self.addEventListener('keydown', async (_event) => {
      if (_event.code != 'KeyR' || !_event.ctrlKey) return;
      if (_event.shiftKey) self.localStorage.clear();
  
      _event.preventDefault();

      await this.unregister();
      self.location.reload(true);

    }, { passive: true })
  }

  register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(applic.path('/service-worker.js'), { scope: applic.location.rootPath })
        .then((_sw) => { applic.essentials.sw = _sw })
        .catch((_err) => console.error)
    }
  };
  
  unregister () {
    return applic.essentials.sw.unregister();
  };

}
