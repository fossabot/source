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

  _changed() {
    console.log(this.path)
  }

  _update() {
    this.path = self.location.hash.split('/');

    if (this.path.length < 2) {
      this.replace('/')
    };

  }

}
