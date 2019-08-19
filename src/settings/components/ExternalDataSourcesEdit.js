import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Card, Checkbox, Col, Layout, Row, Select, TextArea, TextField } from '@folio/stripes/components';
import { required } from '../../util/validators';

export default class ExternalDataSourcesEdit extends React.Component {
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
    const { input: { value, name } } = this.props;
    const kbadapterTypes = [{ label: '', value: '' }, { value: 'org.olf.kb.adapters.EbscoKBAdapter', label: 'org.olf.kb.adapters.EbscoKBAdapter' }];
    const recordTypes = [{ label: '', value: '' }, { value: '1', label: 'Package' }];
    return (
      <Card
        headerStart={<strong>{value.id ? 'Edit External kb' : 'New External kb'}</strong>}
        headerEnd={this.props.actionButtons}
      >
        <Row>
          <Col xs={4} md={4}>
            <Field
              component={TextField}
              label="Name"
              name={`${name}.name`}
              required
              validate={required}
            />
          </Col>
          <Col xs={4} md={4}>
            <Field
              component={Select}
              label="Type"
              name={`${name}.type`}
              dataOptions={kbadapterTypes}
              required
              validate={required}
            />
          </Col>
          <Col xs={4} md={4}>
            <Field
              component={Select}
              label="Record type"
              name={`${name}.rectype`}
              dataOptions={recordTypes}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Field
          component={TextField}
          label="URI"
          name={`${name}.uri`}
        />
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={4} md={4}>
              <Field
                component={Checkbox}
                label="Is active"
                name={`${name}.active`}
                type="checkbox"
              />
            </Col>
            <Col xs={4} md={4}>
              <Field
                component={Checkbox}
                label="Supports harvesting"
                name={`${name}.supportsHarvesting`}
                type="checkbox"
              />
            </Col>
            <Col xs={4} md={4}>
              <Field
                component={Checkbox}
                label="Activation enabled"
                name={`${name}.activationEnabled`}
                type="checkbox"
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={4} md={4}>
            <Field
              component={TextField}
              label="listPrefix"
              name={`${name}.listPrefix`}
            />
          </Col>
          <Col xs={4} md={4}>
            <Field
              component={TextField}
              label="fullPrefix"
              name={`${name}.fullPrefix`}
            />
          </Col>
          <Col xs={4} md={4}>
            <Field
              component={TextField}
              label="Principal"
              name={`${name}.principal`}
            />
          </Col>
        </Row>
        <Field
          component={TextArea}
          label="Credentials"
          name={`${name}.credentials`}
        />
      </Card>
    );
  }
}