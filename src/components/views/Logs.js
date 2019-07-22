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

  renderLogs = (id) => {
    return <FormattedMessage id={`ui-local-kb-admin.${id}no`} />;
  }

  render() {
    const { id, onToggle, open } = this.props;
    return (
      <Accordion
        id={id}
        label={<FormattedMessage id={`ui-local-kb-admin.${id}`} />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderLogs(id) }
      </Accordion>
    );
  }
}
