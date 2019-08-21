import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  cursor: () => faker.date.recent(),
  active: () => faker.random.boolean(),
  activationEnabled: () => faker.random.boolean(),
  lastCheck: () => faker.date.recent().toISOString(),
  type: () => faker.random.arrayElement(['org.olf.kb.adapters.EbscoKBAdapter']),
  name: () => faker.random.words(),
  fullPrefix: () => faker.random.words(),
  uri: () => faker.internet.url(),
  supportsHarvesting: () => faker.random.boolean(),
  syncStatus: () => faker.random.arrayElement(['idle']),
  rectype: () => faker.random.arrayElement(['1']),
});
