import React from 'react';
import compose from 'compose-function';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

class JobCreateRoute extends React.Component {
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      path: 'erm/jobs',
      fetch: false,
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    mutator: PropTypes.shape({
      jobs: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div>
        Create page
      </div>
    );
  }
}

export default compose(
  stripesConnect
)(JobCreateRoute);
