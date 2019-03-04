/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

export class stateHandler {
  constructor() {
    applic.on('applic-state:changed', this.__onStateChanged.bind(this));
  }

  __onStateChanged(params) {
    const hasChanged = (nonce) => {
      return params.path.indexOf(nonce) == 0;
    };

    if (hasChanged('importedFiles')) {
      this.__handleImported();
    }

    if (hasChanged('graphic')) {
      this.__handleGrafics();
    }
  }

  __handleGrafics() {
    // const graphicClass = applic.get('graphicClass');
    const graphicType = applic.get('graphicType');
    const graphics = applic.get('graphic');

    utils.arrayify(graphics).forEach((graphic) => {
      const tp = graphicType[graphic.type];
      const sizes = [];

      for (const size of tp.export) {
        if (graphic.dp[`${size}dp`] == undefined) {
          sizes.push(size);
        }
      }

      const newDp = (params) => {
        return {
          nonce: params.nonce,
          // size: params.size || false,

          frames: [],
          rendered: false,
        };
      };
      if (graphic.dp.raw && !sizes.length) return;

      if (!graphic.dp.raw) {
        graphic.dp['raw'] = newDp({nonce: 'raw'});

        const worker = applic.worker.draw(graphic.og.uri, {
          size: false,
        });

        worker.on('init', (params) => {
          utils.buffer(() => {
            console.log('init', params);
          });
        });

        worker.on('changed', (params) => {
          utils.buffer(() => {
            console.log('changed', params);
          });
        });

        worker.on('resolved', (params) => {
          utils.buffer(() => {
            console.log('resolved', params);
          });
        });

        console.log('draw raw');
      }

      for (const size of sizes) {
        graphic.dp[`${size}dp`] = newDp({
          nonce: `${size}dp`,
          // size: size
        });

        console.log('draw', size);
      }

      utils.buffer(() => {
        applic.set(`graphic.${graphic.nonce}`, graphic);
      });
    });
  }

  __handleImported() {
    const imports = applic.get('importedFiles');

    utils.arrayify(imports).forEach((fileNode) => {
      if (!applic.get(`importedFiles.${fileNode.nonce}.resolved`)) {
        applic.set(`importedFiles.${fileNode.nonce}.resolved`, true);
        this.__registerFile(fileNode);
      };
    });
  }


  __registerFile(fileNode) {
    const graphicClass = fileNode.importParams.graphicClass;
    const graphicType = (() => {
      const types = utils.arrayify(applic.get('graphicType'));
      let graphicType;

      types.forEach((t) => {
        if (t.class == graphicClass &&
          -1 != t.fileType.indexOf(fileNode.fileType)) {
          graphicType = t.nonce;
        }
      });

      return graphicType;
    })();

    applic.set(`graphic.${fileNode.nonce}`, {
      nonce: fileNode.nonce,

      og: {
        name: fileNode.name,
        date: fileNode.date,
        type: fileNode.fileType,
        uri: fileNode.fileUri,
      },

      type: graphicType,
      class: graphicClass,

      dp: { },

    });
  }
}
