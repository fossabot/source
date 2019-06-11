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



class ApplicGraphic {
  constructor(_params) {
    this.nonce = _params.nonce;
    this.origin = _params.origin;
  }

}

const _graphics = {};
applic.graphics = {};

_graphics.register = (_file, _params) => {
  const _nonce = applic.utils.nonce();

  applic.graphics[_nonce] = new ApplicGraphic({
    nonce: _nonce,
    origin: {
      name: _file.name,
      type: _file.type,
      uri: URL.createObjectURL(_file)
    }
  });

  applic.dispatch('applic-graphics:changed')
}




const _import = {}

_import.fileTypes = ['image/x-png', 'image/png','image/gif','image/svg']

_import.files = (_params) => {
  const _node = _import.newInput(_params);
  _node.setAttribute('multiple', '');
  _node.setAttribute('accept', _import.fileTypes.join(','));
  _node.click();
}

_import.directory = (_params) => {
  const _node = _import.newInput(_params);
  _node.setAttribute('webkitdirectory', '');
  _node.click();
}

_import.newInput = (_params) => {
  const _node = document.createElement('input');
  _node.setAttribute('type', 'file');
  _node.addEventListener('change', _import.handleInput.bind(null, _node, _params), { passive: true});
  document.head.appendChild(_node);
  return _node;
}

_import.handleInput = (_node, _params) => {
  const _rejected = Array.from(_node.files)
    .filter((_f) => {return -1 == _import.fileTypes.indexOf(_f.type)}).length
  const _files = Array.from(_node.files)
    .filter((_f) => {return -1 != _import.fileTypes.indexOf(_f.type)})

  if (_rejected) {
    console.error(`${_rejected} files have been rejected.`);
  }

  self.focus()
  _node.parentElement.removeChild(_node)

  _files.forEach(_file => {
    _graphics.register(_file, _params)
  })
}
