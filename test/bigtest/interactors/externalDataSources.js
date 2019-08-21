import {
  interactor,
  collection,
  count,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class ExternalDataSourceInteractor {
  isDeleteButtonPresent = isPresent('[data-test-external-data-source-delete]');
  isEditButtonPresent = isPresent('[data-test-external-data-source-edit]');
  isNamePresent = isPresent('[data-test-external-data-source-name]');
  isTypePresent = isPresent('[data-test-external-data-source-type]');
  isRecordTypePresent = isPresent('[data-test-external-data-source-recordtype]');
  isURIPresent = isPresent('[data-test-external-data-source-uri]');
  isActivePresent = isPresent('[data-test-external-data-source-isactive]');
  isSupportsHarvestingPresent = isPresent('[data-test-external-data-source-supportsharvesting]');
  isActivationEnabledPresent = isPresent('[data-test-external-data-source-activationenabled]');
  isListPrefixPresent = isPresent('[data-test-external-data-source-listprefix]');
  isFullPrefixPresent = isPresent('[data-test-external-data-source-fullprefix]');
  isPrincipalPresent = isPresent('[data-test-external-data-source-principal]');
  isCredentialsPresent = isPresent('[data-test-external-data-source-credentials]');

  name = text('[data-test-external-data-source-name]');
}

@interactor class ExternalDataSourcesListInteractor {
  size = count('[data-test-external-data-source-view]');
  items = collection('[data-test-external-data-source-view]', ExternalDataSourceInteractor);
}

export default @interactor class ExternalDataSourcesInteractor {
  isFormPresent = isPresent('[data-test-external-data-sources]');
  externalDataSourceList = new ExternalDataSourcesListInteractor();
}
