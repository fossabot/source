/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/static/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/static/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/static/CONTRIBUTORS.md
*/

import {fetch as fetchPolyfill} from 'whatwg-fetch';

// console.log(Dropbox)

const DropboxApp = {
  AppFolder: '/Apps/Contrast Tool',
  AppKey: 'dlxog8x736ba0rl',
};

export class ApplicCloud {
  constructor() {
    this.conected = true;
    this.dropbox = null;
    this.__reconnectDropbox();


    applic.on('applic-state:changed', this.__onStateChanged.bind(this));
  }

  __onStateChanged(params) {
    utils.buffer(() => {
      if (0 == params.path.indexOf('storage')) {
        const storageConected = !!applic.get('storage.client.uid');
        if (this.conected && !storageConected) {
          this.revoke();
        } else if (!this.conected && storageConected) {
          this.conected = true;
          this.__reconnectDropbox();
        }
      }
    });
  }

  revoke() {
    this.__disconnectDropbox();
  }
  oauth2() {
    const instance = self.utils.window(`${self.location.origin}/oauth2/`, 620, 820);

    this.conected = true;
    const instanceClose = () => {
      instance.close();
      this.conected = false;
    };

    self.addEventListener('beforeunload', instanceClose);
    self.addEventListener('oauth:done', (evt) => {
      if (!evt.detail.access_token) return instanceClose();

      this.__connectDropbox({
        token: evt.detail.access_token,
        uid: evt.detail.account_id,
      });
      requestAnimationFrame(instanceClose);
    });

    instance.addEventListener('beforeunload ', instanceClose);
  }


  __connectDropbox(params) {
    if (!params || !Object.keys(params).length) return this.conected = false;
    if (this.dropbox) return;

    applic.set('state.client', {});
    applic.set('state.client.profile', params.profile);
    applic.set('storage.client', params);

    this.conected = true;

    try {
      this.dropbox = new Dropbox.Dropbox({
        accessToken: params.token,
        fetch: fetchPolyfill,
      });

      // this.dropbox.usersGetAccount({ account_id: params.uid })
      //   }).then((client) => {
      this.dropbox.usersGetCurrentAccount().then((client) => {
        const profile = {
          name: client.name.given_name,
          nameDisplay: client.name.display_name,
          email: client.email,
          emailDisplay: __maskEmail(client.email),

          photoUri: client.profile_photo_url,
        };

        console.info(`dropbox:auth`, `${profile.nameDisplay} <${profile.email}>`);

        this.conected = true;
        applic.set('state.client.profile', profile);
        applic.set('storage.client.profile', profile);
      }).catch((err) => {
        this.__disconnectDropbox();
      });
    } catch (err) {
      this.__disconnectDropbox();
      console.log(err);
    }
  }
  __reconnectDropbox() {
    const params = applic.get('storage.client');
    this.__connectDropbox(params);
  }
  __disconnectDropbox() {
    if (!!applic.get('storage.client.token')) {
      if (this.dropbox) {
        this.dropbox.authTokenRevoke()
            .then(() => {
              console.info(`dropbox:revoked`);
            })
            .catch((err) => console.error);
      }
    };

    this.conected = false;
    this.dropbox = null;

    applic.set('state.client', {});
    applic.set('storage.client', {});
  }
}

const __maskEmail = (string) => {
  const at = string.indexOf('@');

  string = string.replace(string.substring(4, at - 2), '***');

  return string;
};
