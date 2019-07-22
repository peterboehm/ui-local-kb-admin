import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion } from '@folio/stripes/components';

export default class ErrorLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderErrorLogs = () => {
    return <FormattedMessage id="ui-local-kb-admin.noErrorLogs" />;
  }

  render() {
    const { id, onToggle, open } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-local-kb-admin.errorLog" />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderErrorLogs() }
      </Accordion>
    );
  }
}
