import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion } from '@folio/stripes/components';

export default class InfoLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderInfoLogs = () => {
    return <FormattedMessage id="ui-local-kb-admin.noInfoLogs" />;
  }

  render() {
    const { id, onToggle, open } = this.props;
    return (
      <Accordion
        closedByDefault
        id={id}
        label={<FormattedMessage id="ui-local-kb-admin.infoLog" />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderInfoLogs() }
      </Accordion>
    );
  }
}
