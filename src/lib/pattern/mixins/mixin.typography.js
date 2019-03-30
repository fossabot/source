/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

export const mixins = {
  '--typo': () => `
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    color: #6f6f6f;
  `,

  '--typo-sans': () => `
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    color: #6f6f6f;
  `,


  '--typo--nowrap': () => `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  `,
  '--typo--noselect': () => `
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
  '--typo--selectable ': () => `
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,


  '--typo--headline1': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 96px;
    line-height: 96px;
    font-weight: 300;
    letter-spacing: -1.5px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--headline2': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 60px;
    line-height: 60px;
    font-weight: 300;
    letter-spacing: -0.5px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--headline3': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 48px;
    line-height: 50px;
    font-weight: 400;
    letter-spacing: normal;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--headline4': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 34px;
    line-height: 40px;
    font-weight: 400;
    letter-spacing: 0.25px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--headline5': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: normal;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--headline6': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: 0.15px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--subtitle1': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
    letter-spacing: 0.15px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--subtitle2': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    letter-spacing: 0.1px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--body1': (css) => `
    ${css.apply('--typo')}
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--body2': (css) => `
    ${css.apply('--typo')}
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.25px;
    text-decoration: inherit;
    text-transform: inherit;
  `,
  '--typo--caption': (css) => `
    ${css.apply('--typo')}
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.4px;
    text-decoration: inherit;
    text-transform: inherit;
  `,

  '--typo--hint': (css) => `
    ${css.apply('--typo')}
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.4px;
    text-decoration: inherit;
    text-transform: inherit;
  `,

  '--typo--button': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 12px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: 1.25px;
    text-decoration: none;
    text-transform: uppercase;
  `,
  '--typo--overline': (css) => `
    ${css.apply('--typo-sans')}
    font-size: 10px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-decoration: none;
    text-transform: uppercase;
  `,

};
