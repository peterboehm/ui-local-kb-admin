import React from 'react';
import PropTypes from 'prop-types';
// import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';


class LocalKbAdminRoute extends React.Component {


  render() {

    return (
        <div>
            Home local kb admin
        </div>
    )
  }
}

export default stripesConnect(LocalKbAdminRoute);
