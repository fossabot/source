/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

const lazies = [
  { type: '', uri: '/node_modules/dropbox/dist/Dropbox-sdk.min.js' },
  { type: '', uri: '/source/units/processing/applic.processing.js' },
  // { type: 'module', uri: '/source/applic.lazies.js' }
];

const _fetch = () => {
  return new Promise((resolve) => {
    const lazy = lazies.shift();
    const node = document.createElement('script');

    if (!lazy) resolve();
    console.debug('applic-lazy:fetch', `"${lazy.uri}"`)

    node.setAttribute('src', lazy.uri);
    node.setAttribute('type', lazy.type);

    node.onerror = (err) => {
      console.error('applic-lazy:cancellation', `"${lazy.uri}"`)
      console.error(err.srcElement)

      lazies.push(lazy);

      setTimeout(async () => { 
        await _fetch(); 
        resolve() 
      }, 3000);
    };
    node.onload = async (evt) => {
      console.debug('applic-lazy:ready', `"${lazy.uri}"`)
      await _fetch();
      resolve()
    };

    document.head.appendChild(node);
  })
};


setTimeout(() => {
  // Promise.resolve().then(() => {
  _fetch()
    .then(() => { console.info('applic-lazies:loaded', `${Date.now() - applic.created}ms`) })
    .then(() => { console.debug('applic-lazies:ready', `${Date.now() - applic.created}ms`) });

  // })
}, 100);
