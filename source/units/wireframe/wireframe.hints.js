/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export class WireframeHints {
  constructor() {
    this.hintParent = [];
  }

  update() {
    const requreHint = [...document.querySelectorAll('[applc-hint]')];

    for (const node of this.hintParent) {
      const i = requreHint.indexOf(node);
      if (-1 == i) this.hintParent.splice(i, 1);
    };

    for (const node of requreHint) {
      if (-1 == this.hintParent.indexOf(node)) {
        this.hintParent.push(node);

        const nonce = `applic-hint-${applic.$.nonce()}`;

        applic.$.set(`hint.${nonce}`, {
          nonce, target: node, show: false, render: false,
          inner: node.getAttribute('applc-hint'),
          align: node.getAttribute('applc-hint-align'),
          deprecat: () => {
            applic.$.set(`hint.${nonce}.render`, false);
          },
        });

        node.addEventListener('mouseover', (event) => {
          this.hint(nonce);
        });
        node.addEventListener('mouseleave', (event) => {
          this.resetHint(nonce);
        });
      };
    };
  }

  hint(nonce) {
    applic.$.set(`hint.${nonce}.event`, applic.$.nonce());
    applic.$.set(`hint.${nonce}.render`, true);
    applic.$.set(`hint.${nonce}.show`, true);
  }
  resetHint(nonce) {
    applic.$.set(`hint.${nonce}.show`, false);
  }
  
};
