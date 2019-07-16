import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import { Route } from '@folio/stripes/core';

import CreateLocalKbAdminRoute from './routes/CreateLocalKbAdminRoute';
import LocalKbAdminRoute from './routes/LocalKbAdminRoute';
import ViewLocalKbAdminRoute from './routes/ViewLocalKbAdminRoute';

export default class App extends React.Component {
  // static propTypes = {
  //   actAs: PropTypes.string.isRequired,
  // }

  render() {
    //const { actAs } = this.props;

    // return (
    //   <div>
    //     <h2>Local KB Admin</h2>
    //     <h4>
    //       Acting as:
    //       {actAs}
    //     </h4>
    //   </div>
    // );

    // <Switch>
    //       <Route path={`${path}/create`} component={CreateLocalKbAdminRoute} />
    //       <Route path={path} component={LocalKbAdminRoute}>
    //         <Route path={`${path}/:id`} exact component={ViewLocalKbAdminRoute} />
    //       </Route>
    //    </Switch>
    const { match: { path } } = this.props;
    console.log(path,'path');

    return (  
      <Switch>
        <Route path={`${path}/create`} component={CreateLocalKbAdminRoute} />
        <Route path={path} component={LocalKbAdminRoute}>
          <Route path={`${path}/:id`} component={ViewLocalKbAdminRoute} />
        </Route>
      </Switch>
    );
  }
}
