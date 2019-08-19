import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, KeyValue, Layout } from '@folio/stripes/components';

export default class ExternalDataSourcesView extends React.Component {
  static propTypes = {
    actionButtons: PropTypes.func,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    })
  }

  render() {
    const { input: { value } } = this.props;

    return (
      <Card
        headerStart={<strong>External Kb</strong>}
        headerEnd={this.props.actionButtons}
      >
        <Row>
          <Col xs={3} md={3}>
            <KeyValue
              label="Name"
              value={value.name}
            />
          </Col>
          <Col xs={5} md={5}>
            <KeyValue
              label="Type"
              value={value.type}
            />
          </Col>
          <Col xs={4} md={4}>
            <KeyValue
              label="Record type"
              value={value.rectype === 1 ? 'Package' : ''}
            />
          </Col>
        </Row>
        <KeyValue
          label="URI"
          value={value.uri}
        />
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={3} md={3}>
              <KeyValue
                label="Is active"
                value={value.active ? 'Yes' : 'No'}
              />
            </Col>
            <Col xs={5} md={5}>
              <KeyValue
                label="Supports harvesting"
                value={value.supportsHarvesting ? 'Yes' : 'No'}
              />
            </Col>
            <Col xs={4} md={4}>
              <KeyValue
                label="Activation enabled"
                value={value.activationEnabled ? 'Yes' : 'No'}
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={3} md={3}>
            <KeyValue
              label="listPrefix"
              value={value.listPrefix}
            />
          </Col>
          <Col xs={5} md={5}>
            <KeyValue
              label="fullPrefix"
              value={value.fullPrefix}
            />
          </Col>
          <Col xs={4} md={4}>
            <KeyValue
              label="Principal"
              value={value.principal}
            />
          </Col>
        </Row>
        <KeyValue
          label="Credentials"
          value={value.credentials}
        />
      </Card>
    );
  }
}