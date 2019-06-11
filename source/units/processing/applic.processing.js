/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

// gif.js by Johan Nordberg (jnordberg)
// See https://github.com/jnordberg/gif.js
// import {GifWriter, GifReader} from './applic.gif-decoder.js';

// console.log(GifWriter)
// console.log(GifReader)


// var imagedata = canvas_context.createImageData(width, height);
// GifReader.decodeAndBlitFrameRGBA(frame_num, imagedata.data);
// canvas_context.putImageData(imagedata, 0, 0);


applic.processing = {}

applic.processing.fragment = (blob) => {
  return new Promise(async (resolve) => {
    const _path = '/source/units/processing/workers/worker.graphic-fragment.js';
    const _worker = new Worker(_path);

    _worker.onmessage = async (event) => {
      switch (event.data[0] ) {
        case 'worker:ready':
          _worker.postMessage(['fragment', {blob: blob}]);
          break;
          
        case 'worker:resolve':
          const frames = await getObjectURL(event.data[1].frames)
          resolve(frames)
          _worker.terminate();
          break;
      }
    }

  })
}

const getObjectURL = (frames) => {
  return new Promise((resolve) => {
    let tr = 0;
    for (let i = 0; i < frames.length; i++) {
      frames[i].nonce = applic.utils.nonce(),
      frames[i].uri = URL.createObjectURL(frames[i].blob),
      frames[i].uri_source = URL.createObjectURL(frames[i].blob_source),
      tr++; if (tr >= frames.length) resolve(frames)
    }
  })
}