import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge, MultiColumnList } from '@folio/stripes/components';
import { Spinner } from '@folio/stripes-erm-components';

export default class Logs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    logs: PropTypes.arrayOf(PropTypes.shape({
      recordNumber: PropTypes.string,
      message: PropTypes.string,
    })),
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    type: PropTypes.string.isRequired,
  };

  renderList = () => {
    const { logs, type } = this.props;

    if (!logs) return <Spinner />;
    if (!logs.length) return <FormattedMessage id={`ui-local-kb-admin.${type}LogNo`} />;

    return (
      <MultiColumnList
        columnMapping={{
          recordNumber: <FormattedMessage id="ui-local-kb-admin.columns.recordNumber" />,
          message: <FormattedMessage id={`ui-local-kb-admin.columns.${type}LogMessage`} />,
        }}
        contentData={logs}
        formatter={{ recordNumber: ({ recordNumber }) => (recordNumber !== undefined ? recordNumber : '-') }}
        id={`list-${type}Log`}
        interactive={false}
        maxHeight={800}
        virtualize
        visibleColumns={['recordNumber', 'message']}
      />
    );
  }

  render() {
    const { id, job, onToggle, open, type } = this.props;

    return (
      <Accordion
        displayWhenClosed={<Badge>{job[`${type}LogCount`]}</Badge>}
        displayWhenOpen={<Badge>{job[`${type}LogCount`]}</Badge>}
        id={id}
        label={<FormattedMessage id={`ui-local-kb-admin.${type}Log`} />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderList(job) }
      </Accordion>
    );
  }
}
