import {
  createNewProjectDir,
  initJSProjectWithProfile,
  addApiWithoutSchema,
  amplifyPush,
  deleteProject,
  deleteProjectDir,
  putItemInTable,
  scanTable,
  rebuildApi,
  getProjectMeta,
  updateApiSchema,
} from '@aws-amplify/amplify-e2e-core';
import { testTableAfterRebuildApi, testTableBeforeRebuildApi } from './api_6a.test';

// Set longer timeout as the test involves creation and deletion of opensearch domain for twice
jest.setTimeout(1000 * 60 * 90); // 90 minutes

const projName = 'apitest';

let projRoot;
beforeEach(async () => {
  projRoot = await createNewProjectDir(projName);
});
afterEach(async () => {
  await deleteProject(projRoot);
  deleteProjectDir(projRoot);
});

describe('amplify rebuild api', () => {
  it('recreates tables and opensearch service for searchable models', async () => {
    await initJSProjectWithProfile(projRoot, { name: projName });
    await addApiWithoutSchema(projRoot, { transformerVersion: 2 });
    await updateApiSchema(projRoot, projName, 'searchable_model_v2.graphql');
    await amplifyPush(projRoot);
    const projMeta = getProjectMeta(projRoot);
    const apiId = projMeta?.api?.[projName]?.output?.GraphQLAPIIdOutput;
    const region = projMeta?.providers?.awscloudformation?.Region;
    expect(apiId).toBeDefined();
    expect(region).toBeDefined();
    await testTableBeforeRebuildApi(apiId, region, 'Todo');
    await rebuildApi(projRoot, projName);
    await testTableAfterRebuildApi(apiId, region, 'Todo');
  });
});