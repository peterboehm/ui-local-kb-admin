import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, MultiColumnList } from '@folio/stripes/components';

export default class InfoLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderInfoLogs = (id, job) => {
    const { infoLog } = job;
    if (infoLog) {
      return (
        <MultiColumnList
          contentData={infoLog}
          id={`list-${id}`}
        />
      );
    } else {
      return <FormattedMessage id="ui-local-kb-admin.infoLogNo" />;
    }
  }

  render() {
    const { id, job, onToggle, open } = this.props;
    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-local-kb-admin.infoLog" />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderInfoLogs(id, job) }
      </Accordion>
    );
  }
}
