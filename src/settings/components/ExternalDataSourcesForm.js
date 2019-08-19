import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ExternalDataSourcesList from './ExternalDataSourcesList';

class ExternalDataSourcesForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      externalKbs: PropTypes.arrayOf(PropTypes.object),
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    const { form: { mutators }, onDelete, onSave } = this.props;

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
            name="externalKbs"
            onDelete={onDelete}
            onSave={onSave}
            mutators={mutators}
          />
        </form>
      </Pane>
    );
  }
}
export default stripesFinalForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  mutators: {
    resetTermState: (args, state, tools) => {
      tools.resetFieldState(args[0]);
    },
    setTermValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true
})(ExternalDataSourcesForm);
