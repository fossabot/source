/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = (model, state) => html`
 <style>
    .applic.hint {
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--stance--fixed')}

      top: 0; left: 0;
      padding: 4px 4px;
      pointer-events: none; }
    
    .applic.hint-inner {
      ${css.apply('--stance--relative')}
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
      ${css.apply('--typo--caption')}
      ${css.apply('--typo--nowrap')}
      
      height: 24px;
      min-width: 32px;
      padding: 0 8px;
      border-radius: 4px;
      background: #000000;
      color: #ffffff; 
      overflow: visible;}

    .applic.hint[visible] .applic.hint-inner {
      opacity: 1; transition: opacity 100ms 100ms cubic-bezier(0.0, 0.0, 0.2, 1); }
    .applic.hint:not([visible]) .applic.hint-inner {
      opacity: 0; transition: opacity 40ms 0ms cubic-bezier(0.0, 0.0, 0.2, 1); }

    .applic.hint .applic.hint-pointer {
      ${css.apply('--stance--absolute')}
      top: 0; left: 0;
      height: 6px; width: 6px;
      transform: rotate(45deg);
      background: inherit; 
      background: red; }

  </style>

  ${Object.keys(state.hint).map((hintID) => {
    return template.hint(state.hint[hintID]);
  })}

`;

const template = {};
template.hint = (params) => html`
  ${params.render ? html` ${hint.update(params)}
    <div applic-role="hint" applic-nonce="${params.nonce}" class="applic hint">
      <div class="applic hint-inner">${params.inner}</div>
    </div>
  ` : ''}
`;

const hint = {};
hint.update = (params) => {
  Promise.resolve()
      .then(() => {
        const node = document.querySelector(`[applic-nonce="${params.nonce}"]`);

        if (params.show) {
          setTimeout(() => {
            node.setAttribute('visible', '');
          }, 10);
          hint.stance(node, params);
        } else {
          const event = params.event;
          const deprecat = () => {
            Promise.resolve()
                .then(() => {
                  if (event == params.event) params.deprecat();
                });
          };
          node.addEventListener('webkitTransitionEnd', deprecat, false);
          node.addEventListener('transitionend', deprecat, false);
          node.removeAttribute('visible');
        };
      });
};

hint.stance = (node, params) => {
  const bounds = hint.bounds(params.target, node, params.align);
  node.setAttribute('style', `top: ${bounds.pos.y}px; left: ${bounds.pos.x}px;`);
};
hint.bounds = (target, node, align) => {
  const contain = (cor, lim) => {
    return Math.max(lim[0], Math.min(cor, lim[1]));
  };

  let pos; const offset = {};
  const rect = node.getBoundingClientRect();
  const tr = target.getBoundingClientRect();

  switch (align) {
    case 'start':
      pos = {
        x: contain(tr.left - rect.width,
            [0, window.innerWidth - rect.width]),
        y: contain((tr.height / 2 + tr.top) - rect.height / 2,
            [0, window.innerHeight - rect.height]),
      };
      break;
    case 'end':
      pos = {
        x: contain(tr.width + tr.left,
            [0, window.innerWidth - rect.width]),
        y: contain((tr.height / 2 + tr.top) - rect.height / 2,
            [0, window.innerHeight - rect.height]),
      };
      break;
    case 'top':
      pos = {
        x: contain(tr.width / 2 + tr.left - rect.width / 2,
            [0, window.innerWidth - rect.width]),
        y: contain(tr.top - rect.height,
            [0, window.innerHeight - rect.height]),
      };
      break;
    case 'bottom':
    default:
      pos = {
        x: contain(tr.width / 2 + tr.left - rect.width / 2,
            [0, window.innerWidth - rect.width]),
        y: contain(tr.height + tr.top,
            [0, window.innerHeight - rect.height]),
      };
      break;
  };

  return {pos};
};
