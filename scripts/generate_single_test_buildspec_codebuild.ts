import { loadConfigBase, saveConfig } from './split-e2e-tests-codebuild';
import { AWS_REGIONS_TO_RUN_TESTS as regions } from './cci-utils';

// usage:
// yarn split-e2e-tests-codebuild-single PATH_TO_TEST OS[l or w] REGION
// example:
// yarn split-e2e-tests-codebuild-single src/__tests__/auth_2d.ts w us-east-2

// to restore the original buildspec, run the command again

const main = () => {
  let filePath: string = process.argv[2];
  const potentialPathPrefix = 'packages/amplify-e2e-tests/';
  if (filePath.startsWith(potentialPathPrefix)) {
    filePath = filePath.replace(potentialPathPrefix, '');
  }
  const os = process.argv[3];
  if (!(os === 'l' || os === 'w')) {
    throw new Error('Invalid job type.');
  }
  const region = process.argv[4];
  if (!regions.includes(region)) {
    throw new Error(`Invalid region. Region must be one of: ${regions}`);
  }

  type jobBuildSpecType = {
    identifier: string;
    buildspec: string;
    env: {
      type?: string;
      image?: string;
      variables: {
        TEST_SUITE: string;
        CLI_REGION: string;
        USE_PARENT_ACCOUNT?: string;
      };
    };
    'depend-on': string[];
  };

  const necessaryIds = [
    'build_linux',
    'publish_to_local_registry',
    'build_pkg_binaries_arm',
    'build_pkg_binaries_linux',
    'build_pkg_binaries_macos',
    'build_pkg_binaries_win',
    'upb',
  ];

  const jobBuildSpec: jobBuildSpecType = {
    identifier: `${os}_${filePath.replace('src/__tests__/', '').replace('.test', '').replace('.ts', '')}`,
    buildspec: os === 'l' ? 'codebuild_specs/run_e2e_tests_linux.yml' : 'codebuild_specs/run_e2e_tests_windows.yml',
    env: {
      variables: {
        TEST_SUITE: filePath,
        CLI_REGION: region,
      },
    },
    'depend-on': ['upb'],
  };
  if (os === 'w') {
    jobBuildSpec.env.type = 'WINDOWS_SERVER_2019_CONTAINER';
    jobBuildSpec.env.image = '$WINDOWS_IMAGE_2019';
    jobBuildSpec.env.variables.USE_PARENT_ACCOUNT = 'false';
    jobBuildSpec['depend-on'].push('build_windows');
    necessaryIds.push('build_windows');
  }
  const configBase: any = loadConfigBase();
  let baseBuildGraph = configBase.batch['build-graph'];
  baseBuildGraph = baseBuildGraph.filter((i: any) => necessaryIds.includes(i.identifier));
  const currentBatch = [...baseBuildGraph, jobBuildSpec];
  configBase.batch['build-graph'] = currentBatch;
  saveConfig(configBase);
};

main();
