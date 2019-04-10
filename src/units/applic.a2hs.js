// A2HS & A2-Chrome
if (self.navigator.standalone === true || self.matchMedia('(display-mode: standalone)').matches) {
   console.debug('applic-a2hs:active');
} else {
   self.addEventListener('beforeinstallprompt', (_event) => {
      console.debug('applic-a2hs:available');

      applic.a2hs = _event; console.info('A2HS is available');
      applic.a2hs.preventDefault();

      applic.deferredInstall = () => {
         if (!applic.a2hs) return;

         applic.a2hs.prompt().catch((_error) => console.error);
         applic.a2hs.userChoice.then((_result) => {
            if (_result.outcome === 'accepted') {
               console.debug('User accepted the A2HS prompt');
               
            } else {
               console.debug('User dismissed the A2HS prompt');

            };

            applic.utils.buffer(() => {
               applic.a2hs = null;
               applic.deferredInstall = () => { };
            })
         });
      };

      // TODO: Add an in-app install prompt.
      setTimeout(applic.deferredInstall, 1000 * 5)
   });
}
