import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

export default class FormattedDateTime extends React.Component {
  static propTypes = {
    dateString: PropTypes.string,
  };

  render() {
    const { dateString } = this.props;
    return (
      <div>
        <FormattedDate value={dateString} />
        &nbsp;
        <FormattedTime value={dateString} />
      </div>
    );
  }
}
