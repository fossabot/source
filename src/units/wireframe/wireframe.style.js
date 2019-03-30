/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { cssMixins } from '../../lib/pattern/mixins/all-mixins.js';
import { cssModules } from '../../lib/pattern/modules/all-modules.js';

const _getMixin = (_nonce) => {
  if (!cssMixins[_nonce]) return `/* ${_nonce} is not defined */`
  else return cssMixins[_nonce](css)
    .replace(/\s{2,}/g, ' ');
};

const _getModule = (_nonce) => {
  if (!cssModules[_nonce]) return `/* ${_nonce} is not defined */`
  else return cssModules[_nonce](css)
    .replace(/\s{2,}/g, ' ');
};

const _cssClass = (_query, suffix) => {
  _query = _query.replace(/\s{2,}/g, ' ');

  const _deep = _query.split(' > ');

  for (let i = 0; i < _deep.length; i++) {
    const _classes = _deep[i].split('::');

    for (let j = 0; j < _classes.length; j++) {
      _classes[j] = ciph(_classes[j])
    };

    _deep[i] = `.${_classes.join('.')}`;
  };

  return _deep.join(' > ') + suffix;
};

const _htmlClass = (_nonce) => {
  const _classes = _nonce.split(' ');

  for (let i = 0; i < _classes.length; i++) {
    _classes[i] = ciph(_classes[i]);
  };

  console.log(`class="${_classes.join(' ')}"`)
  return `class="${_classes.join(' ')}"`;
};

const INDEX = {};

const ciph = (string) => {
  if (!INDEX[string]) index(string);
  return INDEX[string];
};

const index = (string) => {
  if (INDEX[string]) return;

  const _ciph = () => {
    const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let nonce = ''; for (let i = 0; i < 3; i++) {
      nonce += s.charAt(Math.floor(Math.random() * s.length));
    };

    if (INDEX[nonce]) _ciph();
    return nonce;
  };

  INDEX[string] = _ciph();
};


self.html = { class: _htmlClass }
self.css = { class: _cssClass, apply: _getMixin, include: _getModule }
