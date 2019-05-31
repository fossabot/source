/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

applic.essentials.a2hs = {};

if (self.navigator.standalone === true || self.matchMedia('(display-mode: standalone)').matches) {
   applic.essentials.a2hs.active = true;
   // console.debug('applic-a2hs:active');
   applic.dispatch('applic:updated')
} else {
   applic.essentials.a2hs.active = false;
   self.addEventListener('beforeinstallprompt', (_event) => {
      console.debug('applic-a2hs:available');

      applic.essentials.a2hs = _event; console.info('A2HS is available');
      applic.essentials.a2hs.preventDefault();

      applic.deferredInstall = () => {
         if (!applic.essentials.a2hs) return;

         applic.essentials.a2hs.prompt().catch((_error) => console.error);
         applic.essentials.a2hs.userChoice.then((_result) => {
            if (_result.outcome === 'accepted') {
               console.debug('User accepted the A2HS prompt');
               setTimeout(() => {
                  self.location.reload(true)
               }, 3000);
            } else {
               console.debug('User dismissed the A2HS prompt');
            };

            applic.utils.buffer(() => {
               applic.essentials.a2hs = null;
               applic.deferredInstall = () => { };
            })
         });
      };

      // TODO: Add an in-app install prompt.
      setTimeout(applic.deferredInstall, 1000 * 5)
   });
}
