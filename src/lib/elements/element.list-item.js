/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import { LitElement, html } from 'lit-element';

class ApplicListItem extends LitElement {
  static get properties() {
    return {
      name: ''
    };
  }

  render() {
    return html`
      <style>
        :host {
          ${applic.$.css.apply('--stance--relative')} 
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 
        
          padding: 0 20px 0 20px;
          min-height: 38.25px;
          max-width: 100%;

          cursor: pointer; 
          border-radius: 2px;}

        ._graphic {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--center-center')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          color: #acacac; }

        ._graphic {
          height: 28px;
          width: 28px; 
          margin: 0 10px 0 0; }

        :host(:hover){
          background: #f3f3f3; 
          border-radius: 2px; }

        :host(:active){
          background: #ececec; 
          border-radius: 2px; }


        ._text {
          ${applic.$.css.apply('--stance--relative')} 
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex')} 

          max-width: 100%;
          overflow: hidden;
        }
   

        ._text > ._text-primary {
          ${applic.$.css.apply('--typo')}

          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
          letter-spacing: 0.06px;
          color: #646464; }

        :host([active]) ._text > ._text-primary {
          font-weight: 600; }

        ._text > ._text-secondary {
          ${applic.$.css.apply('--typo--caption')}
          ${applic.$.css.apply('--typo--nowrap')} 
        
          color: #acacac; }

        ._meta {
          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--vertical')} 
          ${applic.$.css.apply('--layout--flex-none')} 

          ${applic.$.css.apply('--typo--overline')}

          margin-left: 4px;
          color: #acacac; }

        ._action {
          ${applic.$.css.apply('--stance--absolute')} 
          ${applic.$.css.apply('--stance--pin--end')} 

          ${applic.$.css.apply('--layout--sizing--border-box')} 
          ${applic.$.css.apply('--layout--horizontal')} 
          ${applic.$.css.apply('--layout--center')} 
          ${applic.$.css.apply('--layout--flex-none')} 
        
          padding: 0 10px 0 0; }

      
        :host(:not(:hover)) ._action {
          opacity: 0;}
        :host(:hover) ._action {
          opacity: 1;}

        :host(:not(:hover)) ._meta {
          opacity: 1;}
        :host(:hover) ._meta {
          opacity: 0;}


      </style>

      <div class="_graphic"><slot name="graphic"></slot></div>
      <div class="_text">
        <slot class="_text-primary"></slot>
        <slot class="_text-secondary" name="detail"></slot>
      </div>
      <div class="_meta"><slot name="meta"></slot></div>
      <div class="_action"><slot name="action"></slot></div>
    `;
  }
  constructor() {
    super();
  }
}

customElements.define('applic-list-item', ApplicListItem);
