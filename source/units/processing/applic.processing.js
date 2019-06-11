/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

// gif.js by Johan Nordberg (jnordberg)
// See https://github.com/jnordberg/gif.js
import {GifWriter, GifReader} from './applic.gif-decoder.js';

// console.log(GifWriter)
// console.log(GifReader)


// var imagedata = canvas_context.createImageData(width, height);
// GifReader.decodeAndBlitFrameRGBA(frame_num, imagedata.data);
// canvas_context.putImageData(imagedata, 0, 0);


applic.processing = {}

applic.processing.fragment = (_blob) => {
  return new Promise(async (resolve) => {
    const _response = new Uint8Array(await new Response(_blob).arrayBuffer())
    const _reader = new GifReader(_response);
    const frames = decodeFramesSync(_reader)
    
    resolve(await drawFrames(frames))
  })
}

const drawFrames = (frames) => {
  return new Promise(async (resolve) => {
    const blobs = [];
    
    let i = 0;
    const _render = () => {
      return new Promise((resolve) => {
        if (i >= frames.length) return resolve();

        const frame = frames[i];
        const reviver = document.createElement('canvas').getContext('2d');

        reviver.canvas.width = frame.width;
        reviver.canvas.height = frame.height;

        const _arr = reviver.getImageData(0, 0, frame.width, frame.height);

        for (let ii = 0; ii < _arr.data.length; ii++) {
          _arr.data[ii] = frame.pixels[ii]
        };
        
        reviver.putImageData(_arr, 0, 0);
        reviver.canvas.toBlob(async (blob) => {
          console.log(frame)
          blobs[i] = {
            blob: blob, 
            uri: URL.createObjectURL(blob),

            duration: frame.delay * 10,
            disposal: frame.disposal,
            interlaced: frame.interlaced,

            height: frame.height,
            width: frame.width,
            x: frame.x,
            y: frame.y
          }; 

          i++; 
          await _render();
          resolve();
        })
      })
    }

    await _render();
    resolve(blobs);
  })
}

const decodeFramesSync = function(reader) {
  var j, ref, results;
  return (function() {
    results = [];

    for (var j = 0, ref = reader.numFrames(); 
      0 <= ref ? j < ref : j > ref; 
      0 <= ref ? j++ : j--){ results.push(j); }
      
    return results;
  }).apply(this).map(function(frameIndex) {
    return decodeFrame(reader, frameIndex);
  });
};

const decodeFrame = function(reader, frameIndex) {
  var frameInfo;
  frameInfo = reader.frameInfo(frameIndex);
  frameInfo.pixels = new Uint8ClampedArray(reader.width * reader.height * 4);
  reader.decodeAndBlitFrameRGBA(frameIndex, frameInfo.pixels);
  return frameInfo;
};
