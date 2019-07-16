import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getSASParams } from '@folio/stripes-erm-components';
import { StripesConnectedSource } from '@folio/stripes/smart-components';

import View from '../components/LocalKbAdmin';
import { stripesConnect } from '@folio/stripes/core';

// columnMap: {
//   'Job name': 'jobName',
//   'Running status': 'runningStatus',
//   'Result': 'result',
//   'No. of errors': 'noOfErrors',
//   'Started': 'started',
//   'Ended': 'ended'
// },

const RESULT_COUNT_INCREMENT = 100;

class LocalKbAdminRoute extends React.Component {
  
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      records: 'results',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      path: 'erm/jobs',
    },
    outcomeValues: {
      type: 'okapi',
      path: 'erm/refdataValues/persistentJob/result',
      shouldRefresh: () => false,
    },
    statusValues: {
      type: 'okapi',
      path: 'erm/refdataValues/persistentJob/status',
      shouldRefresh: () => false,
    },
    query: { initialValue: {} },
  });

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();
  }

  querySetter = ({ nsValues, state }) => {
    const defaults = {
      filters: null,
      query: null,
      sort: null,
    };

    if (/reset/.test(state.changeType)) {
      // A mutator's `replace()` function doesn't update the URL of the page. As a result,
      // we always use `update()` but fully specify the values we want to null out.
      this.props.mutator.query.update({ ...defaults, ...nsValues });
    } else {
      this.props.mutator.query.update(nsValues);
    }
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }


  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger);

    if (this.searchField.current) {
      this.searchField.current.focus();
    }
  }

  render() {
    const { children, location, resources } = this.props;
    if (this.source) {
      this.source.update(this.props);
    }

    console.log(this.props.resources,'res');
    return (
      <View
        data={{
          jobs: get(resources, 'jobs.records', []),
          statusValues: get(resources, 'statusValues.records', []),
          typeValues: get(resources, 'typeValues.records', []),
        }}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        searchString={location.search}
        source={this.source}
      >
      {children}
      </View>
    )
  }
}

export default stripesConnect(LocalKbAdminRoute);
