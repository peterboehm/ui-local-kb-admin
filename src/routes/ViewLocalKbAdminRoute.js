import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';


class ViewLocalKbAdminRoute extends React.Component {


  render() {
   
    return (
        <div>
            View local kb admin
        </div>
    )
  }
}

export default stripesConnect(ViewLocalKbAdminRoute);
