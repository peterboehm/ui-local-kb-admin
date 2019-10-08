import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';

import LogsList from '../../components/LogsList';

class JobLogContainer extends React.Component {
  static manifest = Object.freeze({
    logs: {
      type: 'okapi',
      path: 'erm/jobs/!{job.id}/!{type}Log',
      throwErrors: false
    },
  });

  static defaultProps = {
    job: {},
  }

  static propTypes = {
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

    return <LogsList logs={logs} {...rest} />;
  }
}

export default stripesConnect(JobLogContainer);
