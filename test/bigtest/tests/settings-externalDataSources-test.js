import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ExternalDataSourcesInteractor from '../interactors/externalDataSources';

describe('ExternalDataSources', () => {
  setupApplication();
  const externaldatasources = new ExternalDataSourcesInteractor();

  const dataSource = {
    active: true,
    activationEnabled: false,
    credentials: 'test credentials',
    name: 'test source',
    fullPrefix: 'test fullprefix',
    listPrefix: 'test listPrefix',
    principal: 'test principal',
    type: 'org.olf.kb.adapters.EbscoKBAdapter',
    uri: 'http://abcd.com',
    supportsHarvesting: true,
  };

  describe('externaldatasources tests for one data source', () => {
    beforeEach(async function () {
      this.server.create('externalDataSource', dataSource);
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    describe('viewing the fetched data source', () => {
      it('renders the external data source', () => {
        expect(externaldatasources.isFormPresent).to.be.true;
      });

      it('renders the expected count of external data sources', () => {
        expect(externaldatasources.externalDataSourceList.size).to.equal(1);
      });

      it('renders the delete button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isDeleteButtonPresent).to.be.true;
      });

      it('renders the edit button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isEditButtonPresent).to.be.true;
      });

      it('renders the name Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isNamePresent).to.be.true;
      });

      it('renders the expected name', () => {
        expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(dataSource.name);
      });

      it('renders the type Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isTypePresent).to.be.true;
      });

      it('renders the expected type', () => {
        expect(externaldatasources.externalDataSourceList.items(0).type.value.text).to.equal(dataSource.type);
      });

      it('renders the record type Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isRecordTypePresent).to.be.true;
      });

      it('renders the expected record type', () => {
        expect(externaldatasources.externalDataSourceList.items(0).recordType.value.text).to.equal('Package');
      });

      it('renders the URI Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isURIPresent).to.be.true;
      });

      it('renders the expected URI', () => {
        expect(externaldatasources.externalDataSourceList.items(0).uri.value.text).to.equal(dataSource.uri);
      });

      it('renders the isActive checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivePresent).to.be.true;
      });

      it('renders the expected isActive checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActive.value.text).to.equal('Yes');
      });

      it('renders the supportsHarvesting checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvestingPresent).to.be.true;
      });

      it('renders the expected isSupportsHarvesting checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvesting.value.text).to.equal('Yes');
      });

      it('renders the activationEnabled checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabledPresent).to.be.true;
      });

      it('renders the expected isActivationEnabled checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabled.value.text).to.equal('No');
      });

      it('renders the listPrefix Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isListPrefixPresent).to.be.true;
      });

      it('renders the expected listPrefix', () => {
        expect(externaldatasources.externalDataSourceList.items(0).listPrefix.value.text).to.equal(dataSource.listPrefix);
      });

      it('renders the fullPrefix Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isFullPrefixPresent).to.be.true;
      });

      it('renders the expected fullPrefix', () => {
        expect(externaldatasources.externalDataSourceList.items(0).fullPrefix.value.text).to.equal(dataSource.fullPrefix);
      });

      it('renders the principal Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isPrincipalPresent).to.be.true;
      });

      it('renders the expected principal', () => {
        expect(externaldatasources.externalDataSourceList.items(0).principal.value.text).to.equal(dataSource.principal);
      });

      it('renders the credentials Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isCredentialsPresent).to.be.true;
      });

      it('renders the expected credentials', () => {
        expect(externaldatasources.externalDataSourceList.items(0).credentials.value.text).to.equal(dataSource.credentials);
      });
    });
  });

  describe('Creating and editing data source', () => {
    const name = 'aaaaa';
    const type = 'org.olf.kb.adapters.EbscoKBAdapter';
    const recordType = 'Package';

    beforeEach(async function () {
      this.visit('/settings/local-kb-admin/external-data-sources');
      await externaldatasources.clickNewButton();
      await externaldatasources.externalDataSourceList.itemsEdit(0).editName(name);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editType(type);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editRecordType(recordType);
      await externaldatasources.externalDataSourceList.itemsEdit(0).clickSaveButton();
    });

    describe('createing a new data source', () => {
      it('sholud render the expected name', () => {
        expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(name);
      });

      describe('Editing the source', () => {
        const editedName = 'aaaaa edited name';

        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickEditButton();
          await externaldatasources.externalDataSourceList.itemsEdit(0).editName(editedName);
          await externaldatasources.externalDataSourceList.itemsEdit(0).clickSaveButton();
        });

        it('should render the edited data source name', () => {
          expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(editedName);
        });
      });
    });
  });

  describe('externaldatasources tests for multiple data sources', () => {
    const externalDataSourceCount = 10;
    beforeEach(async function () {
      this.server.createList('externalDataSource', 10);
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    describe('viewing the data sources', () => {
      it('renders the list of external data sources', () => {
        expect(externaldatasources.isFormPresent).to.be.true;
      });

      it('renders the expected count of external data sources', () => {
        expect(externaldatasources.externalDataSourceList.size).to.equal(externalDataSourceCount);
      });

      describe('deleting 2 sources', () => {
        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickDeleteButton();
          await externaldatasources.externalDataSourceList.items(1).clickDeleteButton();
        });

        it('reduces the count of data sourcesby 2', () => {
          expect(externaldatasources.externalDataSourceList.size).to.equal(externalDataSourceCount - 2);
        });
      });
    });
  });
});
