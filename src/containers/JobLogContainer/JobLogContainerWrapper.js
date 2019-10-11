import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

import JobLogContainer from './JobLogContainer';

class JobLogContainerWrapper extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.connectedJobLogContainer = props.stripes.connect(
      JobLogContainer,
      { dataKey: props.type }
    );
  }

  render() {
    return <this.connectedJobLogContainer {...this.props} />;
  }
}

export default withStripes(JobLogContainerWrapper);
