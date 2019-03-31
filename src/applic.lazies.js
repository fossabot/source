/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

Promise.resolve().then(async () => {
   await import('/src/units/processing/applic.processing.js');

   console.info('applic-lazies:loaded', `${Date.now() - applic.created}ms`)
   console.debug('applic-lazies:ready', `${Date.now() - applic.created}ms`)
});


// const lazies = [
//   {
//     nonce: 'dropbox', type: 'browser',
//     uri: '/node_modules/dropbox/dist/Dropbox-sdk.min.js'
//   },
//   {
//     nonce: 'processing', type: 'module',
//     uri: '/source/units/processing/applic.processing.js'
//   },
// ];

// const _fetch = () => {
//   return new Promise(async (resolve) => {
//     const lazy = lazies.shift();
//     if (!lazy) return resolve();

//     console.debug('applic-lazy:fetch', `"${lazy.uri}"`)

//     if (lazy.type == 'browser') {

//       const node = document.createElement('script');

//       node.setAttribute('src', lazy.uri);
//       node.onload = async (evt) => {
//         console.debug('applic-lazy:ready', `"${lazy.uri}"`)
//         await _fetch(); resolve()
//       };
//       node.onerror = (err) => {
//         lazies.push(lazy); console.error('applic-lazy:cancellation', `"${lazy.uri}"`)
//         setTimeout(async () => { await _fetch(); resolve() }, 3000);
//       };

//       document.head.appendChild(node);
//     } else {
//       try {
//         import(`${lazy.uri}`).then(async (_m) => {
//           console.debug('applic-lazy:ready', `"${lazy.uri}"`)
//           applic.lazies[lazy.nonce] = _m;
//           await _fetch();
//           resolve();
//         })
//       } catch (error) {
//         lazies.push(lazy); console.error('applic-lazy:cancellation', `"${lazy.uri}"`)
//         setTimeout(async () => { await _fetch(); resolve() }, 3000);
//       }

//     }

//   })
// };


// setTimeout(() => {
//   // Promise.resolve().then(() => {
//   _fetch()
//     .then(() => { console.info('applic-lazies:loaded', `${Date.now() - applic.created}ms`) })
//     .then(() => { console.debug('applic-lazies:ready', `${Date.now() - applic.created}ms`) });

//   // })
// }, 300);
