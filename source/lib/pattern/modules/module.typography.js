/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export const module = {
  'applic::typography': (css) => `
    .typo {
      ${css.apply('--typo')}
      color: rgba(0,0,0,.70);
    }
    .typo.headline1 { 
      ${css.apply('--typo--headline1')}
    }
    .typo.headline2 { 
      ${css.apply('--typo--headline2')}
    }
    .typo.headline3 { 
      ${css.apply('--typo--headline3')}
    }
    .typo.headline4 { 
      ${css.apply('--typo--headline4')}
    }
    .typo.headline5 { 
      ${css.apply('--typo--headline5')}
    }
    .typo.headline6 { 
      ${css.apply('--typo--headline6')}
    }
    .typo.subtitle1 { 
      ${css.apply('--typo--subtitle1')}
    }
    .typo.subtitle2 { 
      ${css.apply('--typo--subtitle2')}
    }
    .typo.body1 { 
      ${css.apply('--typo--body1')}
    }
    .typo.body2 { 
      ${css.apply('--typo--body2')}
    }
    .typo.caption { 
      ${css.apply('--typo--caption')}
    }
    .typo.button { 
      ${css.apply('--typo--button')}
    }
    .typo.overline { 
      ${css.apply('--typo--overline')}
    }

  `,

};
