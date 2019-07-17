import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import { get } from 'lodash';

import {
  Col,
  Layout,
  Pane,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import { Spinner } from '@folio/stripes-erm-components';

class JobInfo extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      job: PropTypes.object,
    }),
    onClose: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  renderDateTime = (date) => {
    return (
      <span>
        <div>
          <FormattedDate value={date} />
          {' '}
          <FormattedTime value={date} />
        </div>
      </span>
    );
  }

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="45%"
        dismissible
        id="pane-view-job"
        onClose={this.props.onClose}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.loading" />}
      >
        <Layout className="marginTop1">
          <Spinner />
        </Layout>
      </Pane>
    );
  }

  renderName = (job) => {
    return (
      <Row>
        <Col xs={12}>
          <strong data-test-job-name>
            {job.name}
          </strong>
        </Col>
      </Row>
    );
  }

  render() {
    const { data: { job }, isLoading } = this.props;

    if (isLoading) return this.renderLoadingPane();

    return (
      <Pane
        defaultWidth="45%"
        dismissible
        id="pane-view-job"
        onClose={this.props.onClose}
        paneTitle={job.name}
      >
        <TitleManager record={job.name}>
          <div>
            <Row>
              <Col xs={12}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.jobName" />}>
                  <div data-test-job-name>
                    { this.renderName(job) }
                  </div>
                </KeyValue>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />}>
                  <div data-test-job-status>
                    {get(job, ['status', 'label'], '-')}
                  </div>
                </KeyValue>
              </Col>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.outcome" />}>
                  <div data-test-job-result>
                    {get(job, ['result', 'label'], '-')}
                  </div>
                </KeyValue>
              </Col>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.errors" />}>
                  <div data-test-job-errors>
                    {'-'}
                  </div>
                </KeyValue>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.started" />}>
                  <div data-test-job-started>
                    {job.started ? this.renderDateTime(job.started) : ''}
                  </div>
                </KeyValue>
              </Col>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.ended" />}>
                  <div data-test-job-ended>
                    {job.ended ? this.renderDateTime(job.ended) : ''}
                  </div>
                </KeyValue>
              </Col>
              <Col xs={4}>
                {
                  job.fileName ? (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.filename" />}>
                      <div data-test-job-filename>
                        {job.fileName}
                      </div>
                    </KeyValue>) : null
                }
              </Col>
            </Row>
          </div>
        </TitleManager>
      </Pane>
    );
  }
}

export default JobInfo;
