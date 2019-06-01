/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

export const mixins = {
  '--layout--block': () => `
    display: block;
  `,
  '--layout--inline-block': () => `
    display: block-inline;
  `,
  '--layout--inline': () => `
    display: inline;
  `,

  '--layout--sizing--border-box': () => `
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  `,
  '--layout--sizing--content-box': () => `
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  `,

  '--layout--overflow': () => `
    overflow: visible;
  `,
  '--layout--overflow-none': () => `
    overflow: hidden;
  `,

  '--layout--scroll': () => `
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  `,
  '--layout--scroll-y': () => `
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden !important;
    overflow-y: auto;
    overflow-y: overlay;
  `,
  '--layout--scroll-x': () => `
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden !important;
    overflow-x: auto;
    overflow-x: overlay;
  `,

  '--layout': () => `
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  `,
  '--layout--inline': () => `
    display: -ms-inline-flexbox;
    display: -webkit-inline-flex;
    display: inline-flex;
  `,

  '--layout--horizontal': (css) => `
    ${css.apply('--layout')}
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
  `,
  '--layout--horizontal-reverse': (css) => `
    ${css.apply('--layout')}
    -ms-flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
  `,

  '--layout--vertical': (css) => `
    ${css.apply('--layout')}
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  `,
  '--layout--vertical-reverse': (css) => `
    ${css.apply('--layout')}
    -ms-flex-direction: column-reverse;
    -webkit-flex-direction: column-reverse;
    flex-direction: column-reverse;
  `,

  '--layout--start': () => `
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  `,
  '--layout--center': () => `
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  `,
  '--layout--end': () => `
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  `,
  '--layout--baseline': () => `
    -ms-flex-align: baseline;
    -webkit-align-items: baseline;
    align-items: baseline;
  `,

  '--layout--start-justified': () => `
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
  `,
  '--layout--center-justified': () => `
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  `,
  '--layout--end-justified': () => `
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  `,
  '--layout--around-justified': () => `
    -ms-flex-pack: distribute;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  `,
  '--layout--justified': () => `
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  `,

  '--layout--center-center': () => `
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  `,

  '--layout--wrap': () => `
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  `,
  '--layout--wrap-reverse': () => `
    -ms-flex-wrap: wrap-reverse;
    -webkit-flex-wrap: wrap-reverse;
    flex-wrap: wrap-reverse;
  `,

  '--layout--flex': () => `
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
  `,
  '--layout--flex-auto': () => `
    -ms-flex: 1 1 auto;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
  `,
  '--layout--flex-none': () => `
    -ms-flex: none;
    -webkit-flex: none;
    flex: none;
  `,

};
