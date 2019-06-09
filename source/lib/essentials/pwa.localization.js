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
    const _indexUri = applic.path(this.config.indexPath);
    const _index = await applic.utils.fetchJson(_indexUri);

    applic.lang = applic.lang ? applic.lang : _index.default;
    applic.localization.default = _index.default;
    applic.localization.all = _index.translations;

    applic.debug('pwa-localization:index-updated');
    applic.dispatch('applic-localization:changed');

    this._updateTable();
  }

  async _updateTable() {
    const _tableUri = applic.path(applic.localization.all[applic.lang].table);
    const _table = await applic.utils.fetchJson(_tableUri);

    applic.localization.table[applic.lang] = _table;

    applic.debug('pwa-localization:table-updated');
    applic.dispatch('applic-localization:changed');

    this._loadResolve();
  }

  get(nonce) {
    return !applic.localization.table[applic.lang] ? '' :
      applic.localization.table[applic.lang][nonce] || `err, "${nonce}" is undefind`;
  }

}
