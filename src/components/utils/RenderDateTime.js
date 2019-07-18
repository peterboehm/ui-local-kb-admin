import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

const RenderDateTime = ({ dateString }) => {
  return (
    <div>
      <FormattedDate value={dateString} />
          &nbsp;
      <FormattedTime value={dateString} />
    </div>
  );
};

RenderDateTime.propTypes = {
  dateString: PropTypes.string,
};

export default RenderDateTime;
