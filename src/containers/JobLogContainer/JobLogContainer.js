import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';

class JobLogContainer extends React.Component {
  static manifest = Object.freeze({
    logs: {
      type: 'okapi',
      path: 'erm/jobs/!{jobId}/!{logType}Log',
      fetch: props => props.fetch,
      throwErrors: false
    },
  });

  static defaultProps = {
    fetch: false,
  }

  static propTypes = {
    children: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetch: PropTypes.bool, // used in `logs` manifest
    // eslint-disable-next-line react/no-unused-prop-types
    jobId: PropTypes.string,  // used in `logs` manifest
    // eslint-disable-next-line react/no-unused-prop-types
    logType: PropTypes.string, // used in `logs` manifest
    resources: PropTypes.shape({
      logs: PropTypes.object,
    }),
  };

  render() {
    const logs = get(this.props.resources, 'logs.records');
    return this.props.children({ logs });
  }
}

export default stripesConnect(JobLogContainer);
