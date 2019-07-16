import React from 'react';
import compose from 'compose-function';

import { stripesConnect } from '@folio/stripes/core';

//import View from '../components/LicenseForm';

class CreateJobRoute extends React.Component {

  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      path: 'erm/jobs',
      fetch: false,
      shouldRefresh: () => false,
    },
  });
  render() {
    const { handlers, resources } = this.props;

    //if (!this.state.hasPerms) return <NoPermissions />;

    return (
        <div>
            Create page
        </div>
    );
  }
}

export default compose(
  stripesConnect
)(CreateJobRoute);
