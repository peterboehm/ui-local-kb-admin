import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Accordion, Badge, MultiColumnList } from '@folio/stripes/components';

export default class ErrorLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderBadge = () => {
    const count = get(this.props.job, 'errorLog.length', 0);
    return <Badge>{count}</Badge>;
  }

  renderErrorLogs = (job) => {
    const { errorLog } = job;
    if (errorLog) {
      const { recordNumber } = errorLog;
      return (
        <MultiColumnList
          contentData={errorLog}
          id="list-errorLog"
          visibleColumns={['recordNumber', 'message']}
          columnMapping={{
            recordNumber: <FormattedMessage id="ui-local-kb-admin.columns.recordNumber" />,
            message: <FormattedMessage id="ui-local-kb-admin.columns.errorLogMessage" />,
          }}
          formatter={{
            recordNumber: () => {
              if (!recordNumber) return '-';
              return recordNumber;
            },
          }}
        />
      );
    } else {
      return <FormattedMessage id="ui-local-kb-admin.errorLogNo" />;
    }
  }

  render() {
    const { id, job, onToggle, open } = this.props;
    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-local-kb-admin.errorLog" />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderErrorLogs(job) }
      </Accordion>
    );
  }
}
