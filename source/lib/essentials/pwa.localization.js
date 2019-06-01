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

    applic.localization.all = {};
    applic.localization.table = {}
    applic.localization.default = undefined;

    this.hasloaded = new Promise((resolve) => {
      this._loadResolve = resolve;
    });

    this._loadIndex();
  }

  async _loadIndex() {
    const _indexUri = this.config.indexPath;
    const _index = await applic.utils.fetchJson(_indexUri);

    applic.lang = applic.lang ? applic.lang : _index.default;
    applic.localization.default = _index.default;
    applic.localization.all = _index.translations;

    applic.debug('pwa-localization:index-updated');
    applic.dispatch('pwa-localization:updated');

    this._updateTable();
  }

  async _updateTable() {
    const _tableUri = applic.localization.all[applic.lang].table;
    const _table = await applic.utils.fetchJson(_tableUri);

    applic.localization.table[applic.lang] = _table;

    applic.debug('pwa-localization:table-updated');
    applic.dispatch('pwa-localization:updated');

    this._loadResolve();
  }

  get(nonce) {
    const _value = applic.localization.table[applic.lang][nonce];

    if (_value) return _value
    else return `err, "${nonce}" is undefind`;
  }

}
