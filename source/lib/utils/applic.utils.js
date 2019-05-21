/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

applic.__proto__.utils = {};

applic.__proto__.utils.readable = {};
applic.__proto__.utils.readable.date = (_date) => {
  let _string = '', _today = new Date() - _date <= 12 * 60 * 60 * 1000;

  if (_today) {
    let hours = _date.getHours() > 12 ? _date.getHours() - 12 : _date.getHours();
    hours = hours < 10 ? "0" + hours : hours;

    const am_pm = _date.getHours() >= 12 ? 'pm' : 'am';
    const minutes = _date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes();
    
    _string += `Today ${hours}:${minutes} ${am_pm}`;
  } else {
    const _month = _date.toLocaleString('en-us', { month: 'short' });
    const _year = 1900 + _date.getYear();

    _string += `${_date.getDate()} ${_month} ${_year}`;
  };
  
  return _string;
};

applic.__proto__.utils.buffer = (callback) => {
  Promise.resolve().then(() => {
    setTimeout(callback);
  });
};

applic.__proto__.utils.switch = (key, template) => {
  return template[key]();
};
applic.__proto__.utils.map = (object, template) => {
  if (!object) return object;
  return Object.keys(object).map(
      (nonce) => template(object[nonce], nonce));
};
applic.__proto__.utils.pick = (object, key, value) => {
  if (!object) return object;
  const picks = {};
  Object.keys(object).forEach((nonce) => {
    if (object[nonce][key] == value) {
      picks[nonce] = object[nonce];
    }
  });
  return picks;
};

applic.__proto__.utils.arrayify = (obj) => {
  const _list = []; 
  for (const _nonce in obj) {
    _list.push(obj[_nonce])
  };
  return _list;
};

applic.__proto__.utils.object = {};
/**
 * @param {object} obj0
 * @param {object} obj1
 * @return {object}
 */
applic.__proto__.utils.object.concat = (obj0, obj1) => {
  for (const p in obj1) {
    try {
      if (obj1[p].constructor == Object) {
        obj0[p] = utils.object.concat(obj0[p], obj1[p]);
      } else {
        obj0[p] = obj1[p];
      }
    } catch (e) {
      obj0[p] = obj1[p];
    }
  }

  return obj1;
};


applic.__proto__.utils.object.set = (obj, path, value) => {
  if (!obj) return null;
  const stack = path.split('.');

  while (stack.length > 1) {
    const key = stack.shift();
    if (!obj[key]) obj[key] = {};
    obj = obj[key];
  }

  const key = stack.shift();
  if (!obj[key]) obj[key] = {};

  if (value == null) {
    delete obj[key];
  } else {
    obj[key] = value;
  }
};

/**
 * @param {object} obj
 * @param {string} path
 * @return {*}
 */
applic.__proto__.utils.object.get = (obj, path) => {
  if (!obj) return null;
  if ('*' == path) return obj;

  path = path.split('.');
  const len = path.length;

  let target = obj;
  for (let i = 0; i < len; i++) {
    if (!target[path[i]]) return null;
    target = target[path[i]];
  };

  return target;
};


/**
 * @param {object} obj0
 * @param {object} obj1
 * @return {*}
 */
applic.__proto__.utils.equal = (obj0, obj1) => {
  return JSON.stringify(obj0) == JSON.stringify(obj1);
};

/**
 * @param {HTMLDocument} $node
 * @return {object}
 */
applic.__proto__.utils.node = {}
applic.__proto__.utils.node.bounds = ($node) => {
  const width = $node.scrollWidth;
  const height = $node.scrollHeight;

  let x = 0; let y = 0;
  while ($node) {
    // console.log(x, y, $node)
    x += $node.offsetLeft - $node.scrollLeft;
    y += $node.offsetTop - $node.scrollTop;

    $node = $node.offsetParent;
  };

  return {
    width: width,
    height: height,
    startX: x,
    startY: y,
    endX: x + width,
    endY: y + height,
  };
};

/**
 * @return {string}
 */
applic.__proto__.utils.nonce = () => {
  return Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
};

/**
 * @return {string}
 */
applic.__proto__.utils.alias = () => {
  return `${Math.random().toString(16).substring(2, 8)}`.toUpperCase();
};

/**
 * @param {string} uri
 * @param {number} w
 * @param {number} h
 */
applic.__proto__.utils.window = (uri, w, h) => {
  const left = (screen.width / 2) - (w / 2);
  const top = (screen.height / 2) - (h / 2) - 68;
  return self.open(uri, '', `width=${w},height=${h},top=${top},left=${left}`);
};


/**
 * @param {object} obj
 * @return {array}
 */
applic.__proto__.utils.arrayify = (obj) => {
  if (!obj) return [];
  const array = [];
  Object.keys(obj).forEach((key) => {
    array.push(obj[key]);
  });
  return array;
};

/**
 * @param {object} obj
 * @return {object}
 */
applic.__proto__.utils.clone = (obj) => {
  if (obj == null || typeof obj != 'object') return obj;

  if (obj instanceof Array) {
    const copy = []; for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  };

  if (obj instanceof Object) {
    const copy = {}; for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  };
};


/**
 * @param {string} uri
 * @return {object}
 */
applic.__proto__.utils.fetchJson = (uri) => {
  return new Promise((resolve) => {
    const xobj = new XMLHttpRequest(); (() => {
      xobj.overrideMimeType('application/json');
      xobj.open('GET', uri, 'true');
      xobj.onreadystatechange = () => {
        if (xobj.readyState == 4 && xobj.status == 200) {
          resolve(JSON.parse(xobj.responseText));
        }
      };
      xobj.send(null);
    })();
  });
};


applic.__proto__.utils.cipher = (salt) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return (text) => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
};

applic.__proto__.utils.decipher = (salt) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  // const saltChars = textToChars(salt);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return (encoded) => encoded.match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join('');
};
