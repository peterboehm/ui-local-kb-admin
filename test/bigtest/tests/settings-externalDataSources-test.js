import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ExternalDataSourcesInteractor from '../interactors/externalDataSources';

describe('ExternalDataSources', () => {
  setupApplication();
  const externaldatasources = new ExternalDataSourcesInteractor();

  describe('externaldatasources settings pane', () => {
    beforeEach(async function () {
      this.server.create('externalDataSource');
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    it('shows the list of external data sources', () => {
      expect(externaldatasources.isFormPresent).to.be.true;
    });

    it('shows the expected count of external data sources', () => {
      expect(externaldatasources.externalDataSourceList.size).to.equal(1);
    });

    it('shows the delete button', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isDeleteButtonPresent).to.be.true;
    });

    it('shows the edit button', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isEditButtonPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isNamePresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isTypePresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isRecordTypePresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isURIPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isActivePresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvestingPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabledPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isListPrefixPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isFullPrefixPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isPrincipalPresent).to.be.true;
    });

    it('shows the name Field', () => {
      expect(externaldatasources.externalDataSourceList.items(0).isCredentialsPresent).to.be.true;
    });
  });
});
