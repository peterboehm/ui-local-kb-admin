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
    const count = get(this.props.job, ['infoLog', 'length']);
    return count !== undefined ? <Badge>{count}</Badge> : <Badge>0</Badge>;
  }

  renderInfoLogs = (id, job) => {
    const { infoLog } = job;
    if (infoLog) {
      const { recordNumber } = infoLog;
      return (
        <MultiColumnList
          contentData={infoLog}
          id={`list-${id}`}
          visibleColumns={['recordNumber', 'message']}
          columnMapping={{
            recordNumber: <FormattedMessage id="ui-local-kb-admin.columns.recordNumber" />,
            message: <FormattedMessage id={`ui-local-kb-admin.columns.${id}Message`} />,
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
      return <FormattedMessage id={`ui-local-kb-admin.${id}No`} />;
    }
  }

  render() {
    const { id, job, onToggle, open } = this.props;
    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id={`ui-local-kb-admin.${id}`} />}
        onToggle={onToggle}
        open={open}
      >
        { this.renderInfoLogs(id, job) }
      </Accordion>
    );
  }
}
