import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';

import Logs from '../../components/Logs';

class JobLogContainer extends React.Component {
  static manifest = Object.freeze({
    logs: {
      type: 'okapi',
      path: 'erm/jobs/!{job.id}/!{type}Log',
      fetch: props => props.fetch,
      throwErrors: false
    },
  });

  static defaultProps = {
    fetch: false,
    job: {},
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    fetch: PropTypes.bool, // used in `logs` manifest
    job: PropTypes.shape({
      id: PropTypes.string,
    }),
    resources: PropTypes.shape({
      logs: PropTypes.object,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    type: PropTypes.string, // used in `logs` manifest
  };

  render() {
    const { resources, ...rest } = this.props;

    const logs = get(resources, 'logs.records');

    return <Logs logs={logs} {...rest} />;
  }
}

export default stripesConnect(JobLogContainer);
