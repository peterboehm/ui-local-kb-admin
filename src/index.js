import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
  }

  render() {
    const { actAs } = this.props;

    return (
      <div>
        <h2>Local KB Admin</h2>
        <h4>
          Acting as:
          {actAs}
        </h4>
      </div>
    );
  }
}
