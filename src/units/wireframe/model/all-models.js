/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { model as body } from './model.body.js';
import { model as mount } from './model.mount.js';

// import { model as bodyAside } from './model.body-aside.js';
// import { model as bodyInner } from './model.body-inner.js';
// import { model as navigation } from './model.navigation.js';

const MODEL_STATE = {
   'wireframe:body': body, 
   'wireframe:mount': mount, 
   // navigation, 
   // bodyAside, 
   // bodyInner
};

export const model = (_nonce) => { 
   return MODEL_STATE[_nonce]
};
