import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import LogsList from '../../components/LogsList';

const RECORDS_PER_REQUEST = 100;
const RECORD_INCREMENT = 5000;

export default class JobLogContainer extends React.Component {
  static manifest = Object.freeze({
    logs: {
      type: 'okapi',
      path: 'erm/jobs/!{job.id}/!{type}Log',
      records: 'results',
      perRequest: RECORDS_PER_REQUEST,
      recordsRequired: '%{logsCount}',
      limitParam: 'perPage',
      params: {
        stats: 'true',
      },
      throwErrors: false,
    },
    logsCount: { initialValue: RECORD_INCREMENT },
  });

  static defaultProps = {
    job: {},
  }

  static propTypes = {
    job: PropTypes.shape({
      id: PropTypes.string,
    }),
    mutator: PropTypes.shape({
      logsCount: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
    resources: PropTypes.shape({
      logs: PropTypes.object,
      logsCount: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    type: PropTypes.string, // used in `logs` manifest
  };

  handleNeedMoreLogs = () => {
    const { mutator, resources } = this.props;
    mutator.logsCount.replace(resources.logsCount + RECORD_INCREMENT);
  }

  render() {
    const { resources, ...rest } = this.props;

    const records = get(resources, 'logs.records', []);
    const hasLoaded = get(resources, 'logs.hasLoaded', false);

    // We want to send any logs if we've fetched them, and only send an empty array
    // if the fetch is complete. Otherwise send an undefined to indicate that we're loading.
    let logs;
    if (records.length) logs = records;
    else if (hasLoaded) logs = [];

    return (
      <LogsList
        logs={logs}
        onNeedMoreLogs={this.handleNeedMoreLogs}
        {...rest}
      />
    );
  }
}
