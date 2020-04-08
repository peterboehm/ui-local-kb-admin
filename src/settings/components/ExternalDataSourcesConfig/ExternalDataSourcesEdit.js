import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Card, Checkbox, Col, Layout, Row, Select, TextArea, TextField } from '@folio/stripes/components';
import { composeValidators, requiredValidator } from '@folio/stripes-erm-components';
import { validateURLIsValid, required } from '../../../util/validators';

export default class ExternalDataSourcesEdit extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
        readonly: PropTypes.bool,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    }),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  validateUniqueName = (value, allValues) => {
    const { externalKbs } = allValues;
    const uniqueNameSources = externalKbs.filter(externalKb => externalKb.name.toLowerCase() === value.toLowerCase());
    if (uniqueNameSources.length > 1) {
      return <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.nameExists" />;
    }

    return undefined;
  }

  render() {
    const {
      input: { value, name },
      meta,
      onCancel,
      onSave,
    } = this.props;

    const isReadonly = value.readonly;
    return (
      <Card
        data-test-external-data-source-edit
        headerEnd={(
          <span>
            <Button
              data-test-external-data-source-cancel
              marginBottom0
              onClick={onCancel}
            >
              <FormattedMessage id="stripes-core.button.cancel" />
            </Button>
            <Button
              buttonStyle="primary"
              data-test-external-data-source-save
              disabled={meta.invalid || meta.pristine || meta.submitting}
              marginBottom0
              onClick={onSave}
            >
              <FormattedMessage id="stripes-core.button.save" />
            </Button>
          </span>
        )}
        headerStart={(
          <strong>
            {value.id ?
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.editExternalDataSource" />
              :
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.newExternalDataSource" />}
          </strong>
        )}
      >
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-name-edit
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
              name={`${name}.name`}
              required={!isReadonly}
              validate={composeValidators(
                requiredValidator,
                this.validateUniqueName,
              )}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Select}
              data-test-external-data-source-type-edit
              dataOptions={[
                { value: 'org.olf.kb.adapters.GOKbOAIAdapter', label: 'org.olf.kb.adapters.GOKbOAIAdapter' }
              ]}
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
              name={`${name}.type`}
              required={!isReadonly}
              validate={v => {
                if (!isReadonly) {
                  return required(v);
                }
                return undefined;
              }}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Select}
              data-test-external-data-source-record-type-edit
              dataOptions={
                [{ value: '1', label: 'Package' }]
              }
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
              name={`${name}.rectype`}
              required={!isReadonly}
              validate={required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              data-test-external-data-source-uri
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
              name={`${name}.uri`}
              required={!isReadonly}
              validate={v => {
                if (!isReadonly) {
                  return (v && v.length) ? validateURLIsValid(v) : required(v);
                }
                return undefined;
              }}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Checkbox}
              data-test-external-data-source-trusted-source-ti-edit
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
              name={`${name}.trustedSourceTI`}
              type="checkbox"
            />
          </Col>
        </Row>
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-is-active-edit
                disabled={isReadonly}
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                name={`${name}.active`}
                type="checkbox"
              />
            </Col>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-supports-harvesting-edit
                disabled={isReadonly}
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                name={`${name}.supportsHarvesting`}
                type="checkbox"
              />
            </Col>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-activation-enabled-edit
                disabled={isReadonly}
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                name={`${name}.activationEnabled`}
                type="checkbox"
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-list-prefix-edit
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
              name={`${name}.listPrefix`}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-full-prefix-edit
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
              name={`${name}.fullPrefix`}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-principal-edit
              disabled={isReadonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
              name={`${name}.principal`}
            />
          </Col>
        </Row>
        <Field
          component={TextArea}
          data-test-external-data-source-credentials-edit
          disabled={isReadonly}
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
          name={`${name}.credentials`}
        />
      </Card>
    );
  }
}
