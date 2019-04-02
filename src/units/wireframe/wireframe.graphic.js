/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';
import { css } from './wireframe.style.js'

console.debug('applic-wireframe:loaded', `${Date.now() - applic.created}ms`);

class ApplicGraphic extends LitElement {
  static get properties() {
    return { 
      nonce: { type: String }
    };
  }

  render() {
    return html`
      <style>
        ._graphic {
          height: 100%; 
          width: 100%; }

      </style>

      <applic-image class="_graphic"></applic-image>

    `;
  }

  constructor() {
    super();
    applic.on('applic:changed', this.updated.bind(this));
  }

  firstUpdated() {
  
  }
  updated() {
    const _graphic = applic.graphic.get(this.nonce);
    const _image = this.shadowRoot.querySelector('._graphic');

    if (!_graphic) {
      _image.setAttribute('uri', '');
    } else {
      _image.setAttribute('uri', _graphic.uri || _graphic.blob.uri || '');
    }
  }

}

customElements.define('applic-graphic', ApplicGraphic);
