import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    const { actAs, match: { path } } = this.props;

    return (
      <div>
        <h2>Local KB Admin</h2>
        <h4>Acting as: {actAs}</h4>
      </div>
    );
  }
}
