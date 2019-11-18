import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import router from 'umi/router';

import Builder from './Builder/';

class EmailTemplateBuilder extends PureComponent {
  state = { visible: true };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      })
    }).isRequired,
  }

  componentDidMount() {
    this.setState({
      visible: true
    });
  }

  handleOnCancel = () => {
    router.push('/library/email_templates/');
  }

  render() {
    const { visible } = this.state;
    const { id } = this.props.match.params;

    return (
      <Modal
        width="80%"
        destroyOnClose
        bodyStyle={{ padding: 0 }}
        visible={visible}
        footer={null}
        closable={false}
        onCancel={this.handleOnCancel}
      >
        <Builder id={id} />
      </Modal>
    );
  }
}

export default EmailTemplateBuilder;
