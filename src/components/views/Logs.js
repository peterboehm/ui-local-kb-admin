import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge, MultiColumnList } from '@folio/stripes/components';
import { Spinner } from '@folio/stripes-erm-components';

export default class InfoLogs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    logs: PropTypes.arrayOf(PropTypes.shape({
      recordNumber: PropTypes.string,
      message: PropTypes.string,
    })),
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    type=
  };

  renderErrorLogs = () => {
    const { logs } = this.props;

    if (!logs) return <Spinner />;
    if (!logs.length) return <FormattedMessage id="ui-local-kb-admin.infoLogNo" />;

    return (
      <MultiColumnList
        columnMapping={{
          recordNumber: <FormattedMessage id="ui-local-kb-admin.columns.recordNumber" />,
          message: <FormattedMessage id="ui-local-kb-admin.columns.infoLogMessage" />,
        }}
        contentData={logs}
        formatter={{ recordNumber: ({ recordNumber }) => (recordNumber !== undefined ? recordNumber : '-') }}
        id="list-infoLog"
        interactive={false}
        maxHeight={800}
        virtualize
        visibleColumns={['recordNumber', 'message']}
      />
    );
  }

  render() {
    const { id, job, onToggle, open } = this.props;
    return (
      <Accordion
        displayWhenClosed={<Badge>{job.infoLogCount}</Badge>}
        displayWhenOpen={<Badge>{job.infoLogCount}</Badge>}
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
