import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Accordion, Badge, MultiColumnList } from '@folio/stripes/components';

export default class InfoLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderBadge = () => {
    const count = get(this.props.job, 'infoLog.length', 0);
    return <Badge>{count}</Badge>;
  }

  renderInfoLogs = (job) => {
    const { infoLog } = job;
    if (infoLog) {
      return (
        <MultiColumnList
          columnMapping={{
            recordNumber: <FormattedMessage id="ui-local-kb-admin.columns.recordNumber" />,
            message: <FormattedMessage id="ui-local-kb-admin.columns.infoLogMessage" />,
          }}
          columnWidths={{
            recordNumber: '10%',
            message: '90%',
          }}
          contentData={infoLog}
          formatter={{ recordNumber: ({ recordNumber }) => (recordNumber || '-') }}
          id="list-infoLog"
          visibleColumns={['recordNumber', 'message']}
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
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-local-kb-admin.infoLog" />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderInfoLogs(job) }
      </Accordion>
    );
  }
}
