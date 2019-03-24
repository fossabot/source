/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const lazies = [
  { nonce: 'dropbox', type: 'browser', 
    uri: '/node_modules/dropbox/dist/Dropbox-sdk.min.js' },
  { nonce: 'processing', type: 'module', 
    uri: '/source/units/processing/applic.processing.js' },
];

const _fetch = () => {
  return new Promise(async (resolve) => {
    const lazy = lazies.shift();
    if (!lazy) resolve();

    console.debug('applic-lazy:fetch', `"${lazy.uri}"`)

    if (lazy.type == 'browser') {

      const node = document.createElement('script');

      node.setAttribute('src', lazy.uri);
      node.setAttribute('type', lazy.type);

      node.onerror = (err) => {
        lazies.push(lazy); console.error('applic-lazy:cancellation', `"${lazy.uri}"`)
        setTimeout(async () => { await _fetch(); resolve() }, 3000);
      };
      
      node.onload = async (evt) => {
        console.debug('applic-lazy:ready', `"${lazy.uri}"`)
        await _fetch(); resolve()
      };

      document.head.appendChild(node);
    } else {
      import(`${lazy.uri}`)
        .then(async (_m) => {
          console.debug('applic-lazy:ready', `"${lazy.uri}"`)
          applic.lazies[lazy.nonce] = _m;
          await _fetch();
          resolve();
        })
        .catch(async () => {
          console.error('applic-lazy:cancellation', `"${lazy.uri}"`)
          lazies.push(lazy); 
          setTimeout(async () => { await _fetch(); resolve() }, 3000);
        });
    }

  })
};


setTimeout(() => {
  // Promise.resolve().then(() => {
  _fetch()
    .then(() => { console.info('applic-lazies:loaded', `${Date.now() - applic.created}ms`) })
    .then(() => { console.debug('applic-lazies:ready', `${Date.now() - applic.created}ms`) });

  // })
}, 300);
