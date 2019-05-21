/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://acontrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.location = new class {
  constructor() {
    this._update();
    self.addEventListener('hashchange', this._update.bind(this))
  }

  push(_path) { 
    // console.log('push', _path);
    self.history.pushState({}, '', `${location.pathname}#${_path}`);
  }

  replace(_path) { 
    // console.log('replace', _path);
    self.history.replaceState({}, '', `${location.pathname}#${_path}`);
  }

  _location(_location) {
    const _path = _location.split('/');
    _path.shift();
    _path.shift();
    return _path;
  }
  _settings(_search) {
    const _params = {};

    _search.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), (_0, _nonce, _2, _value) => { 
      _params[_nonce] = _value; 
    });

    return _params;
  }

  _changed() { }

  _update() {
    const _root = self.location.origin + self.location.pathname;
    const _location = self.location.href.replace(_root.substring(0, _root.length - 1), '');
    this.params = this._settings(_location.split('?')[1] || '');
    this.location = this._location(_location.split('?')[0] || '');
    
    applic.set('location', {
      path: this.location,
      keys: this.params
    });

    if (this.location.length < 2) {
      return this.replace('/');
    };

  }

}
