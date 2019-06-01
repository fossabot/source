/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export class ApplicLocalization {
  constructor() {
    this.config = applic.localization;
    this._waiting = [];

    this._hasLoaded = new Promise((resolve) => {
      this._loadIndexResolve = resolve;
      this._loadIndex()
    });
  }

  async _loadIndex() {
    setTimeout(async () => {
      const _index = await applic.utils.fetchJson(this.config.indexPath)

      applic.lang = applic.lang ? applic.lang  :_index.default;
      applic.localization.default = _index.default;
      applic.localization.all = _index.translations;

      this._loadIndexResolve();
    }, 2000);
  }


  get() {
    return new Promise(async (resolve) => {
      await this._hasLoaded;

      resolve('done');

      console.log(applic.localization.all)
    })
  }

}
