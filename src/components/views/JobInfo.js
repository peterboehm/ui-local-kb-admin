import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import { get } from 'lodash';

import {
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  KeyValue,
  Layout,
  Pane,
  Row,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import { Spinner } from '@folio/stripes-erm-components';
import ErrorLogs from './ErrorLogs';
import InfoLogs from './InfoLogs';

class JobInfo extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      job: PropTypes.object,
    }),
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    sections: {
      errorLogs: false,
      infoLogs: false,
    }
  }

  renderDateTime = (date) => {
    return (
      <span>
        <div>
          <FormattedDate value={date} />
          &nbsp;
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

  getSectionProps = (id) => {
    return {
      id,
      onToggle: this.handleSectionToggle,
      open: this.state.sections[id],
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState((prevState) => ({
      sections: {
        ...prevState.sections,
        [id]: !prevState.sections[id],
      }
    }));
  }

  handleAllSectionsToggle = (sections) => {
    this.setState({ sections });
  }

  render() {
    const { data: { job }, isLoading } = this.props;

    if (isLoading) return this.renderLoadingPane();
    const isJobQueued = get(job, ['status', 'label'], '-') === 'Queued';
    const isJobInProgress = get(job, ['status', 'label'], '-') === '"In progress"';

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
              <Col xs={9}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.jobName" />}>
                  <div data-test-job-name>
                    { this.renderName(job) }
                  </div>
                </KeyValue>
              </Col>
              {
                isJobInProgress ? (
                  <Col xs={2} xsOffset={1}>
                    <Button
                      buttonStyle="danger"
                      id="clickable-delete-job"
                      onClick={() => {}}
                    >
                      <FormattedMessage id="ui-local-kb-admin.job.delete" />
                    </Button>
                  </Col>) : null
              }

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
                {
                  !isJobQueued && (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.outcome" />}>
                      <div data-test-job-result>
                        {get(job, ['result', 'label'], '-')}
                      </div>
                    </KeyValue>
                  )
                }
              </Col>
              <Col xs={4}>
                {
                  !isJobQueued && (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.errors" />}>
                      <div data-test-job-errors>
                        {'-'}
                      </div>
                    </KeyValue>
                  )
                }
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                {
                  !isJobQueued && (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.started" />}>
                      <div data-test-job-started>
                        {job.started ? this.renderDateTime(job.started) : '-'}
                      </div>
                    </KeyValue>
                  )
                }
              </Col>
              <Col xs={4}>
                {
                  !isJobQueued && (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.ended" />}>
                      <div data-test-job-ended>
                        {job.ended ? this.renderDateTime(job.ended) : '-'}
                      </div>
                    </KeyValue>
                  )
                }
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
          {
            !isJobQueued ? (
              <AccordionSet>
                <Row end="xs">
                  <Col xs>
                    <ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleAllSectionsToggle} />
                  </Col>
                </Row>
                <ErrorLogs {...this.getSectionProps('errorLogs')} />
                <InfoLogs {...this.getSectionProps('infoLogs')} />
              </AccordionSet>
            ) : null
          }
        </TitleManager>
      </Pane>
    );
  }
}

export default JobInfo;
