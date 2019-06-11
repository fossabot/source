/**
 * @license
 * Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
 * The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
 * The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
 */

/** 
 * gif.js by Dean McNamee(deanm)
 * See https://github.com/deanm/omggif
 */
self.importScripts('../applic.gif-decoder.js')


const worker = {}

worker.resolve = (data) => {
  postMessage(['worker:resolve', data]);
}

onmessage = async (event) => {
   switch (event.data[0]) {
     case 'fragment':
        const frames = await gif.fragment(event.data[1].blob);
        worker.resolve({frames});
        break;

   }
}

Promise.resolve().then(() => {
  postMessage(['worker:ready', {}])
});



const gif = {}

gif.fragment = (blob) => {
  return new Promise(async (resolve) => {
    const _response = new Uint8Array(await new Response(blob).arrayBuffer())
    const _reader = new GifReader(_response);
    const _frames = decodeFramesSync(_reader)
    
    resolve(await gif.redraw(_frames, _reader))
  });
}

gif.redraw = (frames, reader) => {
  return new Promise(async (resolve) => {
    const blobs = [];

    const progress = {}
    progress.context = new OffscreenCanvas(reader.width, reader.height).getContext('2d');
    
    await new Promise((resolve) => {
      let tr = 0;
      for (let i = 0; i < frames.length; i++) {
        const changeDetail = frames[i];
        const change = {}; 

        change.context = new OffscreenCanvas(reader.width, reader.height).getContext('2d');
        change.pixels = change.context.getImageData(0, 0, reader.width, reader.height);

        for (let ii = 0; ii < change.pixels.data.length; ii++) {
          change.pixels.data[ii] = changeDetail.pixels[ii]
        };
        
        change.context.putImageData(change.pixels, 0, 0);

        // -----
        if (i === 0 || changeDetail.disposal === 2) {
          progress.context.clearRect(0, 0, reader.width, reader.height);
        };

        progress.context.drawImage(change.context.canvas, 0, 0);
        
        const combined = {}
        combined.context = new OffscreenCanvas(reader.width, reader.height).getContext('2d');
        combined.context.drawImage(progress.context.canvas, 0, 0);
        // -----

        blobs[i] = {
          canvas: combined.context.canvas,
          canvas_source: change.context.canvas,
          duration: changeDetail.delay * 10,
          disposal: changeDetail.disposal
        };

        tr++; if (tr >= frames.length) resolve()
      }
    })


    await new Promise((resolve) => {
      let tr = 0; for (let i = 0; i < blobs.length; i++) {
        blobs[i].canvas.convertToBlob().then((blob) => {
          blobs[i].blob = blob; delete blobs[i].canvas;
          tr++; if (tr >= blobs.length) resolve()
        });
      }
    })

    await new Promise((resolve) => {
      let tr = 0; for (let i = 0; i < blobs.length; i++) {
        blobs[i].canvas_source.convertToBlob().then((blob) => {
          blobs[i].blob_source = blob; delete blobs[i].canvas_source;
          tr++; if (tr >= blobs.length) resolve()
        });
      }
    })

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
