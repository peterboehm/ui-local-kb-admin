import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import JobInfo from '../components/views/JobInfo';
import {
  Callout,
  ConfirmationModal,
} from '@folio/stripes/components';

class JobViewRoute extends React.Component {
  static manifest = Object.freeze({
    job: {
      type: 'okapi',
      path: 'erm/jobs/:{id}',
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      job: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { showConfirmDelete: false };
    this.callout = React.createRef();
  }

  showToast(messageId, messageType = 'success', values = {}) {
    this.callout.current.sendCallout({
      message: <FormattedMessage id={messageId} values={values} />,
      type: messageType,
    });
  }

  handleDelete = () => {
    const { resources } = this.props;
    const job = get(resources, 'job.records[0]', {});
    const name = get(job, 'name', '');

    this.props.mutator.job
      .DELETE(job)
      .then(() => { 
        this.showToast('ui-local-kb-admin.job.delete.success', 'success', { name })
      }).then(() => this.handleClose())

  }

  handleClose = () => {
    this.props.history.replace(`/local-kb-admin${this.props.location.search}`)
  }

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const { resources } = this.props;
    const job = get(resources, 'job.records[0]', {});
    const name = get(job, 'name', '');

    return (
      <React.Fragment>
        <JobInfo
          data={{
            job: get(resources, 'job.records[0]', {}),
          }}
          onClose={this.handleClose}
          onDelete={this.showDeleteConfirmationModal}
          isLoading={get(resources, 'job.isPending', true)}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            id="delete-job-confirmation"
            confirmLabel={<FormattedMessage id="ui-local-kb-admin.job.delete.confirmLabel" />}
            heading={<FormattedMessage id="ui-local-kb-admin.job.delete.heading" values={{ name }}/>}
            message={<FormattedMessage id="ui-local-kb-admin.job.delete.message" />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={this.handleDelete}
            open
          />
        )}
        <Callout ref={this.callout} />
      </React.Fragment>
    );
  }
}

export default stripesConnect(JobViewRoute);
