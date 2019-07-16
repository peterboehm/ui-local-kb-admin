import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Col, KeyValue, Row } from '@folio/stripes/components';


export default class JobInfo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    job: PropTypes.shape({
      id: PropTypes.string,
      dateCreated: PropTypes.string,
      logEntries: PropTypes.array,
      name: PropTypes.string,
      ended: PropTypes.string,
      started: PropTypes.string,
      status: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      result: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    }),
    renderName: PropTypes.bool,
  }

  static defaultProps = {
    job: {},
    renderName: true,
  }

  /* renderLicensor = () => {
    const { license: { orgs = [] } } = this.props;
    const licensor = orgs.find(o => get(o, ['role', 'value']) === 'licensor');
    const licensorName = get(licensor, ['org', 'name']) || <FormattedMessage id="stripes-erm-components.licenseCard.notSet" />;

    return licensorName;
  } */

  renderName = () => {
    const { job, renderName } = this.props;

    if (!renderName) return null;

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
    const { job, className } = this.props;

    return (
      <div className={className}>
        { this.renderName() }
        <Row>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />}>
              <div data-test-job-status>
                {get(job, ['status', 'label'], '-')}
              </div>
            </KeyValue>
          </Col>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.result" />}>
              <div data-test-job-result>
                {get(job, ['result', 'label'], '-')}
              </div>
            </KeyValue>
          </Col>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.errors" />}>
              <div data-test-job-errors>
                {'errors'}
              </div>
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.started" />}>
              <div data-test-job-started>
                {job.started ? <FormattedDate value={job.started} /> : '-'}
              </div>
            </KeyValue>
          </Col>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.ended" />}>
              <div data-test-job-ended>
                {job.ended ? <FormattedDate value={job.ended} /> : '-'}
              </div>
            </KeyValue>
          </Col>
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.filename" />}>
              <div data-test-job-filename>
                {'filename'}
              </div>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }
}
