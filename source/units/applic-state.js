/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

self.ApplicState = {
  'state': {
    view: 'thumbnail', // 'grid', 'edit'

    subdivision: {
      '[subdivisionNonce]': {

      },

    },

    thumbnails: {

    },


  },


  'graphicClass': {
    'HVr3igMypuOjwsNoo7W1jY7n': {
      label: 'Emoticon',
      nonce: 'HVr3igMypuOjwsNoo7W1jY7n',
      thumbnail: {
        size: 112,
        dp: 'raw',
      },
      preview: {},
    },
    'wFMLM6LfXzZQ2CAHRa5O1lPL': {
      label: 'User Badge',
      nonce: 'wFMLM6LfXzZQ2CAHRa5O1lPL',
      thumbnail: {
        size: 72,
        dp: 'raw',
      },
      preview: {},
    },

  },

  'graphicType': {
    'YsfTxzJXlPJhL21A0PVIOwTj': {
      nonce: 'YsfTxzJXlPJhL21A0PVIOwTj',
      class: 'HVr3igMypuOjwsNoo7W1jY7n',

      fileType: ['image/png'],
      export: [28, 56, 112],
    },
    'JwBmOC27UjwWYmC6EPPsyvx3': {
      nonce: 'JwBmOC27UjwWYmC6EPPsyvx3',
      class: 'HVr3igMypuOjwsNoo7W1jY7n',

      fileType: ['image/gif'],
      // export: [112]
      export: [28, 48, 56, 86, 112],
    },
    'p1aHyn3G8Ki8GTUit7qE9nQN': {
      nonce: 'p1aHyn3G8Ki8GTUit7qE9nQN',
      class: 'wFMLM6LfXzZQ2CAHRa5O1lPL',

      fileType: ['image/png'],
      export: [18, 36, 56],
    },
  },

};

export const get = (path) => {
  let target = self.ApplicState;
  const i = path.split('.');

  if ('*' == i[0]) return target;

  while (i.length != 0) {
    const nonce = i.shift();

    if (!target[nonce]) return undefined;
    target = target[nonce];
  }

  return target;
};


export const set = (path, value) => {
  let target = self.ApplicState;
  const i = path.split('.');

  while (i.length != 0) {
    const nonce = i.shift();

    if (i.length != 0) {
      if (!target[nonce]) target[nonce] = {};
      target = target[nonce];
    } else {
      if (value == null) {
        delete target[nonce];
      } else {
        target[nonce] = value;
      }
    }
  }

  applic.dispatch('applic-state:changed', {path});
};


// export const push = (path, value) => {
//   const i = __path(path);
// };

