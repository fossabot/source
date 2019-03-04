/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {model as frame} from './frame/model.js';
import {model as header} from './header/model.js';
import {model as mount} from './mount/model.js';
import {model as overlay} from './overlay/model.js';

export const model = {
  // wireframe
  mount, frame,
  header,
  overlay,
};
