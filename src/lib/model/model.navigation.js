/** !
@license
Copyright (c) 2019 The Contrast Tool Authors. All rights reserved.
This code may only be used under the BSD style license found at https://contrast-tool.github.io/docs/LICENSE.md
The complete set of authors may be found at https://contrast-tool.github.io/docs/AUTHORS.md
The complete set of contributors may be found at https://contrast-tool.github.io/docs/CONTRIBUTORS.md
*/

import {html} from 'lit-html';

export const model = function() {
  return html`
    <style>
      ${this.css.include('applic::bar')}

      ._navigation-header {
        ${this.css.apply('--layout--sizing--border-box')} 

        margin: -60px 0 0 -30px;
        padding: 60px 0 0 30px;

        border-bottom: 1px solid #d6d6d6;
        background: #f4f4f4; }

      ._name {
        ${this.css.apply('--layout--sizing--border-box')} 
        ${this.css.apply('--layout--horizontal')} 
        ${this.css.apply('--layout--center')} 
        ${this.css.apply('--layout--felx-none')} 

        ${this.css.apply('--typo')}

        font-size: 13px;
        line-height: 22px;
        font-weight: 500;
        letter-spacing: -0.18px;
        text-transform: uppercase;
        
        color: #636364;

        padding: 0px 8px 0 24px; }

    </style>  

    <div class="_navigation-header applic bar">
      <div class="applic bar-row">
        <div class="applic bar-section align-start"></div>
      </div>
      <div class="applic bar-row">
        <div class="applic bar-section align-start">
          <span class="_name">Contrast Tool</span>
        </div>
      </div>
    </div>

    <applic-scrollable class="_navigation"> 
        <applic-list>
          ${this.get('section').map((_section) => html`
            <applic-list-item ?active="${_section.active}"
              @click="${_section.show}">
              <applic-image slot="graphic" aspect="1:1" 
                uri="${_section.graphics ? _section.graphics[0].uri : ''}">
              </applic-image>
              <span>${_section.name}</span>
              <span slot="meta">${_section.graphics.length}</span>
            </applic-list-item>
          `)}

          <applic-list-item
            @click="${applic.newSection}">
            <applic-icon name="add" slot="graphic"></applic-icon>
            <span>Add Canvas</span>
          </applic-list-item>

<!--
          <div class="applic list-divider"></div>

     
          <applic-list-collection>
            <span slot="label">All Collections</span>

            <applic-list-item>
              <applic-icon name="folder_shared" slot="graphic"></applic-icon>
              <span>Showcase</span>
              <span slot="meta">733</span>
            </applic-list-item>

            <applic-list-item>
              <applic-icon name="folder" slot="graphic"></applic-icon>
              <span>Brainstorming</span>
              <span slot="meta">0</span>
            </applic-list-item>

            <applic-list-item>
              <applic-icon name="folder" slot="graphic"></applic-icon>
              <span>Uncategorized</span>
              <span slot="meta">10</span>
            </applic-list-item>

            <applic-list-item>
              <applic-icon name="edit" slot="graphic"></applic-icon>
              <span>Manage collections</span>
            </applic-list-item>

          </applic-list-collection>
-->
        </applic-list>
     
    </applic-scrollable>

  `
}