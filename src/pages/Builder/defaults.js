import grapesJSMJML from 'grapesjs-mjml'

const defaults = {
  container: '#gjs',
  height: '600px',
  width: 'auto',
  fromElement: true,

  plugins: [grapesJSMJML],
  pluginsOpts: {
    [grapesJSMJML]: {
      cmdBtnMoveLabel: 'Move',
      cmdBtnUndoLabel: 'Undo',
      cmdBtnRedoLabel: 'Redo',
      cmdBtnDesktopLabel: 'Desktop',
      cmdBtnTabletLabel: 'Tablet',
      cmdBtnMobileLabel: 'Mobile',

      expTplBtnTitle: 'View Code',
      fullScrBtnTitle: 'FullScreen',
      swichtVwBtnTitle: 'View Components',
      defaultTemplate: '', // Default template in case the canvas is empty
      categoryLabel: 'Basic',
    }
  },
  storageManager: {
    id: '', // 'gjs-',             // Prefix identifier that will be used on parameters
    type: 'remote', // Type of the storage
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
    contentTypeJson: true,
    credentials: 'same-origin',
  },
  colorPicker: {
    appendTo: '#picker-container',
  },
  blockManager: {
    appendTo: '#mjml-editor-blocks',
  },
  deviceManager: {
    devices: [{
      name: 'Desktop',
      width: '', // default size
    }, {
      name: 'Mobile',
      width: '320px', // this value will be used on canvas width
      widthMedia: '480px', // this value will be used in CSS @media
    }]
  },
  layerManager: {
    appendTo: '.layers-container'
  },
  traitManager: {
    appendTo: '.styles-container',
  },
  styleManager: {
    appendTo: '.styles-container',
    sectors: [
      {
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          },
        ]
      }
    ]
  },
  commands: {
    defaults: [
      {
        id: 'show-layers',
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('.layers-container') },

        run(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = '';
        },
        stop(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = 'none';
        },
      },
      {
        id: 'show-styles',
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row) { return row.querySelector('.styles-container') },

        run(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = '';
        },
        stop(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = 'none';
        },
      },
      {
        id: 'show-traits',
        getTraitsEl(editor) {
          const row = editor.getContainer().closest('.editor-row');
          return row.querySelector('.traits-container');
        },
        run(editor, sender) {
          this.getTraitsEl(editor).style.display = '';
        },
        stop(editor, sender) {
          this.getTraitsEl(editor).style.display = 'none';
        },
      },
    ]
  },
  panels: {
    defaults: [
      {
        id: 'layers',
        el: '.panel__right',
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          // Being a flex child we need to change `flex-basis` property
          // instead of the `width` (default)
          keyWidth: 'flex-basis',
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
          id: 'show-layers',
          active: true,
          className: 'fa fa-bars',
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: false,
        }, {
          id: 'show-style',
          active: true,
          className: 'fa fa-paint-brush',
          command: 'show-styles',
          togglable: false,
        }, {
          id: 'show-traits',
          active: true,
          className: 'fa fa-cog',
          command: 'show-traits',
          togglable: false,
        }],
      },
      {
        id: 'panel-devices',
        el: '.panel__devices',
        buttons: [{
          id: 'device-desktop',
          className: 'fa fa-desktop',
          command: 'set-device-desktop',
          active: true,
          togglable: false,

        }, {
          id: 'device-mobile',
          className: 'fa fa-mobile',
          command: 'set-device-mobile',
          togglable: false,
        }],
      },
      {
        id: 'panel-options',
        el: '#panel__options',
        buttons: [{
          id: 'undo',
          className: 'fa fa-undo',
          command: 'undo',
        }, {
          id: 'redo',
          className: 'fa fa-repeat',
          command: 'redo',
        }, {
          id: 'mjml-import',
          className: 'fa fa-download',
          command: 'mjml-import',
        }],
      },
      {
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [{
          id: 'visibility',
          active: true, // active by default
          className: 'fa fa-square-o',
          command: 'sw-visibility', // Built-in command
        }, {
          id: 'preview',
          className: 'fa fa-eye',
          command: 'preview',
          context: 'preview',
          attributes: { title: 'Preview' }
        }, {
          id: 'export',
          className: 'fa fa-upload',
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        }, {
          id: 'show-json',
          className: 'fa fa-code',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(`<textarea style="width:100%; height: 450px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`)
              .open();
          },
        }
        ],
      },
    ]
  }
}

export default defaults;
