/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://acontrast-tool.github.io/static/CONTRIBUTORS.md
*/

applic.__proto__.location = new class {
  constructor() {
    console.log()

    this._update();
  }

  push(_path) { console.log('push', _path);
    self.history.pushState({}, '', `/#${_path}`);
  }

  replace(_path) { console.log('replace', _path);
    self.history.replaceState({}, '', `/#${_path}`);
  }

  _location(_location) {
    const _path = _location.split('/');
    _path.shift();
    _path.shift();
    return _path;
  }
  _settings(_search) {
    const _params = {};

    _search.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function ($0, $1, $2, $3) {
        _params[$1] = $3;
      }
    );

    return _params;
  }

  _changed() { }

  _update() {
    const _location = self.location.href.replace(self.location.origin, '');

    this.params = this._settings(_location.split('?')[1] || '');
    this.location = this._location(_location.split('?')[0] || '');

    if (this.location.length < 2) {
      return this.replace('/');
    };
    
  }

}
