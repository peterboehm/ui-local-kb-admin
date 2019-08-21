/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.createList('job', 10);
  server.createList('externalDataSource', 10);
}
