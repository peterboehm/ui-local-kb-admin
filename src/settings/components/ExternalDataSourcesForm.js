import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Callout, Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ExternalDataSourcesList from './ExternalDataSourcesList';

class ExternalDataSourcesForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      mutators: PropTypes.object
    }),
    initialValues: PropTypes.shape({
      externalKbs: PropTypes.arrayOf(PropTypes.object),
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  sendCallout = (operation, outcome) => {
    this.callout.sendCallout({
      type: outcome,
      message: <FormattedMessage id={`ui-local-kb-admin.settings.externalDataSources.callout.${operation}.${outcome}`} />
    });
  }

  handleDelete = (...rest) => {
    this.props.onDelete(...rest)
      .then(() => this.sendCallout('delete', 'success'))
      .catch(() => this.sendCallout('delete', 'error'));
  }

  handleSave = (...rest) => {
    this.props.onSave(...rest)
      .then(() => this.sendCallout('save', 'success'))
      .catch(() => this.sendCallout('save', 'error'));
  }

  render() {
    const { form: { mutators } } = this.props;

    const count = get(this.props, 'initialValues.externalKbs.length', 0);
    return (
      <Pane
        defaultWidth="fill"
        id="settings-external-data-sources"
        paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
        paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.termCount" values={{ count }} />}
      >
        <form>
          <FieldArray
            component={ExternalDataSourcesList}
            mutators={mutators}
            name="externalKbs"
            onDelete={this.handleDelete}
            onSave={this.handleSave}
          />
        </form>
        <Callout ref={ref => { this.callout = ref; }} />
      </Pane>
    );
  }
}
export default stripesFinalForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  mutators: {
    resetTermState: (args, state, tools) => {
      tools.resetFieldState(args[0]);
    },
    setTermValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true,
})(ExternalDataSourcesForm);
