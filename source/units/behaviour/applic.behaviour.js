/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */


applic.on('applic-request:import', (_params) => {
  _params.type == 'directory' ? 
    _import.directory(_params) : _import.files(_params);
})


const _import = {}

_import.fileTypes = ['image/x-png', 'image/png','image/gif','image/svg']

_import.files = (_params) => {
  const _node = document.createElement('input');
  _node.setAttribute('type', 'file');
  _node.setAttribute('multiple', '');
  _node.setAttribute('accept', _import.fileTypes.join(','));
  _node.addEventListener('change', _import.handleInput.bind(null, _node, _params), { passive: true});
  _node.click();
}

_import.directory = (_params) => {
  const _node = document.createElement('input');
  _node.setAttribute('type', 'file');
  _node.setAttribute('accept', _import.fileTypes.join(','));
  _node.setAttribute('multiple', '');
  _node.setAttribute('webkitdirectory', '');
  _node.addEventListener('change', _import.handleInput.bind(null, _node, _params), { passive: true});
  _node.click();
}

_import.handleInput = (_node, _params) => {
  const _rejected = Array.from(_node.files)
    .filter((_f) => {return -1 == _import.fileTypes.indexOf(_f.type)})
    .filter((_f) => {return 0 != _f.name.indexOf('.')})

  const _files = Array.from(_node.files)
    .filter((_f) => {return -1 != _import.fileTypes.indexOf(_f.type)})

  console.log('_files', _files)
  console.log('_rejected', _rejected)
  console.log(_params)
}
