import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';


class ViewJobRoute extends React.Component {

  render() {
    console.log('here');
    return (
      <div>
        view page
      </div>
    );
  }
}

export default stripesConnect(ViewJobRoute);
