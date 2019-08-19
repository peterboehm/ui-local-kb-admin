import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import {
  ExternalDataSourcesSettingsRoute,
} from './routes';

export default class LocalKbAdminSettings extends React.Component {

  sections = [
    {
      label: <FormattedMessage id="ui-local-kb-admin.settings.general" />,
      pages: [
        {
          component: ExternalDataSourcesSettingsRoute,
          label: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources" />,
          perm: 'module.local-kb-admin.enabled',
          route: 'external-data-source',
        }
      ]
    },
  ]

  render() {
    return (
      <Settings
        {...this.props}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.meta.title" />}
        sections={this.sections}
      />
    );
  }
}
