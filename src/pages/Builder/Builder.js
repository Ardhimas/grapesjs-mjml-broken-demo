import React from 'react';
import 'grapesjs/dist/css/grapes.min.css'
import './geditor.less';
import Ged from './Ged';

const {
  useEffect,
  useState,
} = React;

// slim example from https://github.com/thanhtunguet/grapesjs-react/issues/12
function Builder(props) {
  const {
    id,
  } = props;
  const [editor, setEditor] = useState(null);
  useEffect(
    () => {
      if (!editor) {
        const newEditor = new Ged(id);
        setEditor(newEditor)
      }
    },
    [],
  );

  return (
    <div id="mjml-editor">
      <div className="mjml-editor-row" style={{ height: '100%' }}>
        <div id="mjml-editor-layers" className="mjml-editor-column" style={{ flexBasis: '200px' }}>
          <div id="panel__options"></div>
          <br/><br/>
          <div id="mjml-editor-blocks"></div>
        </div>
        <div className="mjml-editor-column mjml-editor-clm">
          <div className="panel__top">
            <div className="panel__basic-actions"></div>
            <div className="panel__devices"></div>
            <div className="panel__switcher"></div>
          </div>
          <div className="editor-row">
            <div className="editor-canvas">
              <div id="gjs" style={{ overflow: 'hidden', height: '100%' }}>
                <mjml>
                  <mj-body></mj-body>
                </mjml>
              </div>
              <div id="picker-container" className="gjs-editor-cont" />
            </div>
            <div className="panel__right">
              <div className="layers-container"></div>
              <div className="styles-container" style={{ overflow: 'auto' }}></div>
              <div className="traits-container"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Builder;
