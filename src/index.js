import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import { Route } from '@folio/stripes/core';

import CreateJobRoute from './routes/CreateJobRoute';
import LocalKbAdminRoute from './routes/LocalKbAdminRoute';
import ViewJobRoute from './routes/ViewJobRoute';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route path={`${path}/create`} component={CreateJobRoute} />
        <Route path={path} component={LocalKbAdminRoute}>
          <Route path={`${path}/:id`} component={ViewJobRoute} />
        </Route>
      </Switch>
    );
  }
}

export default App;
export { default as LocalKbAdmin } from './components/LocalKbAdmin';
