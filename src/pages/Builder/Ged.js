import GrapesJS from 'grapesjs';
import _ from 'lodash';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import defaults from './defaults';

class Ged {
  constructor(id) {
    const accessToken = localStorage.getItem('KeetAuthClient.accessToken')
    const config = _.defaultsDeep({
      storageManager: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        urlStore: `${REACT_APP_API_URL}/api/email_templates/${id}/builder_store`,
        urlLoad: `${REACT_APP_API_URL}/api/email_templates/${id}/builder_load`,
      },
      richTextEditor: {
        actions: this.getActions(),
      },
    }, defaults)
    if (Ged.editor) {
      Ged.editor.destroy();
    }
    Ged.editor = GrapesJS.init(config);

    this.removeDevicePanel();
    this.addDeviceCommands();
    this.updateImage();
    this.addVariables();
  }

  updateImage() {
    const comps = Ged.editor.DomComponents;
    const originalImage = comps.getType('mj-image')
    comps.addType('mj-image', {
      model: {
        defaults: {
          traits: ['href', 'rel', 'alt', 'title', 'src'],
          void: false,
        }
      }
    })
  }

  getActions() {
    const { editor } = Ged;
    const options = [
      {
        value: '{{ firstName }}',
        label: 'First Name',
      }
    ]
    const selectDropdown = (
      <select className="gjs-field">
        <option value="" disabled selected>Variables</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    )
    const actions = [
      'bold', 'italic', 'underline', 'strikethrough',
      {
        name: 'keet-vars',
        icon: ReactDOMServer.renderToString(selectDropdown),
          // Bind the 'result' on 'change' listener
        event: 'change',
        result: (rte, action) => rte.insertHTML(action.btn.firstChild.value),
        // Reset the select on change
        update: (rte, action) => { action.btn.firstChild.value = "";}
      }
    ]

    return actions;
  }

  removeDevicePanel() {
    const { editor } = Ged
    editor.Panels.removePanel('devices-c');
  }

  addDeviceCommands() {
    const { editor } = Ged

    editor.Commands.add('set-device-desktop', {
      run: editor => editor.setDevice('Desktop')
    });

    editor.Commands.add('set-device-mobile', {
      run: editor => editor.setDevice('Mobile')
    });
  }

  addVariables() {
    const { editor } = Ged;

    const buttonOptions = [
      {
        value: 'https://www.keethealth.com',
        name: 'Website',
      }
    ]

    editor.DomComponents.addType('mj-button', {
      model: {
        defaults: {
          traits: [{
            type: 'select',
            label: 'Variable',
            name: 'href',
            options: buttonOptions,
          }]
        }
      }
    })
  }
}

export default Ged;
