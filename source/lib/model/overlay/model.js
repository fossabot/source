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
      pointer-events: none; }
    
    .applic.hint-inner {
      ${css.apply('--layout--sizing--border-box')}
      ${css.apply('--layout--horizontal')}
      ${css.apply('--layout--center')}
      ${css.apply('--typo--caption')}
      ${css.apply('--typo--nowrap')}
      
      height: 24px;
      min-width: 24px;
      padding: 0 8px;
      margin: 4px 4px;
      border-radius: 16px;
      background: #6e6d6f;
      color: #ffffff; }

    .applic.hint[visible] .applic.hint-inner {
      opacity: 1; transition: opacity 200ms 0ms cubic-bezier(0.0, 0.0, 0.2, 1); }
    .applic.hint:not([visible]) .applic.hint-inner {
      opacity: 0; transition: opacity 0ms 0ms; }

  </style>
    

  ${state.hint ? html`
    <div applic-role="hint" class="applic hint" 
      aria-hidden="true" ?visible="${hint.stance(state.hint)}">
      <span class="applic hint-inner">${state.hint.inner}</span>    
    </div>
  ` : ''}

`;

const hint = {};
hint.query = '[applic-role="hint"]';
hint.stance = (params) => {
  Promise.resolve().then(() => {
    const node = document.querySelector(hint.query);
    if (!!node) {
      // node.removeAttribute('style');
      if (!!params) {
        const bounds = hint.bounds(params.target, node, params.align);
        node.setAttribute('style', `top: ${bounds.y}px; left: ${bounds.x}px;`);
      }
      // else node.setAttribute('style', `display: none;`);
    }
  });

  return !!params && !!params.inner;
};
hint.bounds = (target, node, align) => {
  const contain = (cor, lim) => {
    return Math.max(lim[0], Math.min(cor, lim[1]));
  };

  let pos;
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
        y: contain(tr.top + rect.height,
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

  return pos;
};
