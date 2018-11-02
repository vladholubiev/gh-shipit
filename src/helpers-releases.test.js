const MockDate = require('mockdate');
const {getLatestReleases} = require('./helpers-releases');
const edges = require('./helpers-releases-edges.fixture');

MockDate.set('5/1/2017', 0);

describe('#getLatestReleases', () => {
  it('should export getLatestReleases function', () => {
    expect(getLatestReleases).toBeInstanceOf(Function);
  });

  it('should return array of latest releases grouped by period', () => {
    const latestReleases = getLatestReleases(edges);

    expect(latestReleases).toEqual([
      {
        repo: 'iopipe-js',
        date: expect.any(Date),
        name: 'v1.5.0',
        version: '1.5.0',
        week: 4,
        quarter: 2
      },
      {
        repo: 'iopipe-js-config',
        date: expect.any(Date),
        name: 'v0.3.0',
        version: '0.3.0',
        week: 4,
        quarter: 2
      },
      {
        repo: 'iopipe-js-config',
        date: expect.any(Date),
        name: 'v0.2.1',
        version: '0.2.1',
        week: 4,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'v1.5.0',
        version: '1.5.0',
        week: 4,
        quarter: 2
      },
      {
        repo: 'iopipe-js-config',
        date: expect.any(Date),
        name: 'v0.2.0',
        version: '0.2.0',
        week: 3,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'v1.0.0',
        version: '1.0.0',
        week: 3,
        quarter: 2
      },
      {
        repo: 'iopipe-js-config',
        date: expect.any(Date),
        name: 'Initial Release',
        version: '0.1.0',
        week: 2,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Configuration Additions - Employ Cosmiconfig',
        version: '1.4.0',
        week: 1,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: 'v1.4.0',
        version: '1.4.0',
        week: 51,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: 'v1.3.0',
        version: '1.3.0',
        week: 51,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: 'v1.2.0',
        version: '1.2.0',
        week: 51,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Enhanced configuration options',
        version: '1.3.0',
        week: 50,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: 'Add babel async transform',
        version: '1.1.1',
        week: 50,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: 'Node 6 support',
        version: '1.1.0',
        week: 50,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-trace',
        date: expect.any(Date),
        name: 'Rename to @iopipe/trace',
        version: '0.3.0',
        week: 50,
        quarter: 2
      },
      {
        repo: 'iopipe-scripts',
        date: expect.any(Date),
        name: '1.0.10',
        version: '1.0.10',
        week: 50,
        quarter: 2
      },
      {
        repo: 'eslint-config-iopipe',
        date: expect.any(Date),
        name: '1.0.2',
        version: '1.0.2',
        week: 50,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'v0.9.2',
        version: '0.9.2',
        week: 49,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'v0.9.1',
        version: '0.9.1',
        week: 49,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-profiler',
        date: expect.any(Date),
        name: 'Initial Release',
        version: '0.1.0',
        week: 49,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Function timeout bugfix',
        version: '1.2.1',
        week: 46,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Ability to disable IOpipe in development via environment variable',
        version: '0.8.0',
        week: 45,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Async hooks support and end timestamp collection',
        version: '1.2.0',
        week: 44,
        quarter: 2
      },
      {
        repo: 'sqs-to-lambda-async',
        date: expect.any(Date),
        name: 'Better error handling',
        version: '0.2.0',
        week: 42,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-trace',
        date: expect.any(Date),
        name: 'Allow plugin meta data',
        version: '0.2.0',
        week: 39,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Plugin reporting and async hooks',
        version: '1.1.0',
        week: 37,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Allow missing package.json next to serverless.yml',
        version: '0.3.3',
        week: 35,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-trace',
        date: expect.any(Date),
        name: 'Upgrade iopipe dependency',
        version: '0.1.2',
        week: 34,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Add ap-northeast-1 to supported regions',
        version: '0.7.1',
        week: 33,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Add support for ap-northeast-1 region',
        version: '1.0.1',
        week: 33,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Adding support for environment variable configuration',
        version: '0.7.0',
        week: 33,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Fix auto-upgrade',
        version: '0.3.2',
        week: 33,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: '1.0 Release',
        version: '1.0.0',
        week: 32,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-trace',
        date: expect.any(Date),
        name: 'iopipe lib as dependency',
        version: '0.1.1',
        week: 32,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Dependency bug fix',
        version: '0.6.1',
        week: 32,
        quarter: 2
      },
      {
        repo: 'iopipe-plugin-trace',
        date: expect.any(Date),
        name: 'Initial Release',
        version: '0.1.0',
        week: 32,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Critical fixes for errors and duration capture',
        version: '0.6.0',
        week: 30,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Plugin Support',
        version: '0.8.0',
        week: 30,
        quarter: 2
      },
      {
        repo: 'performance-node',
        date: expect.any(Date),
        name: 'Add Timestamp Option',
        version: '0.2.0',
        week: 30,
        quarter: 2
      },
      {
        repo: 'performance-node',
        date: expect.any(Date),
        name: 'Initial Release',
        version: '0.1.0',
        week: 30,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Output Fixes',
        version: '0.7.0',
        week: 29,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'context.iopipe',
        version: '0.6.0',
        week: 29,
        quarter: 2
      },
      {
        repo: 'sqs-to-lambda-async',
        date: expect.any(Date),
        name: 'Initial',
        version: '0.1.0',
        week: 26,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Bug fix',
        version: '0.3.1',
        week: 25,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Webpack',
        version: '0.3.0',
        week: 25,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Timeouts!',
        version: '0.5.0',
        week: 24,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Python 3 support, code improvements',
        version: '0.5.1',
        week: 24,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Support Node 4',
        version: '0.2.1',
        week: 23,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'npm publish updates',
        version: '0.4.2',
        week: 23,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Update CD',
        version: '0.4.1',
        week: 23,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Drop AST Transform',
        version: '0.2.0',
        week: 23,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Size, speed, and a bit more data',
        version: '0.4.0',
        week: 23,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Update dependency checks',
        version: '0.1.16',
        week: 21,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Nix network dependency in test',
        version: '0.1.15',
        week: 20,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Fix auto-upgrade',
        version: '0.1.14',
        week: 20,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'New Serverless Packaging Commands',
        version: '0.1.13',
        week: 19,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Rename source key to installMethod',
        version: '0.1.12',
        week: 18,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Update naming of client key',
        version: '0.3.1',
        week: 17,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Add Stats',
        version: '0.1.11',
        week: 16,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Performance improvements and non-blocking behavior',
        version: '0.3.0',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Transform Test',
        version: '0.1.10',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Use only Node.js Functions',
        version: '0.1.9',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Wanted version fix',
        version: '0.1.8',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Node 4 Support',
        version: '0.1.7',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Remove postinstall-build',
        version: '0.1.6',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Move some deps => devdeps',
        version: '0.1.5',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Release to NPM',
        version: '0.1.4',
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Greeting',
        version: null,
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Use postinstall-build',
        version: null,
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Build updates',
        version: null,
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: '.iopipe folder',
        version: null,
        week: 16,
        quarter: 2
      },
      {
        repo: 'serverless-plugin-iopipe',
        date: expect.any(Date),
        name: 'Initial 0.0.1',
        version: '0.0.1',
        week: 15,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Errors patch & improving TLS sessions',
        version: '0.4.1',
        week: 12,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Error fixes, CPU data',
        version: '0.4.0',
        week: 11,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Key updates',
        version: '0.2.1',
        week: 10,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Coldstarts patch',
        version: '0.3.1',
        week: 9,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Coldstart and load time support',
        version: '0.3.0',
        week: 9,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Regional collector support',
        version: '0.2.0',
        week: 8,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Improving CD',
        version: '0.1.9',
        week: 8,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Coldstarts, regional collectors, and stats fixes',
        version: '0.2.0',
        week: 7,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: 'Clear custom metrics between invocations',
        version: '0.1.8',
        week: 5,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'Metrics bugfix and .decorate alias',
        version: '0.1.2',
        week: 5,
        quarter: 2
      },
      {
        repo: 'iopipe-js-core',
        date: expect.any(Date),
        name: 'v0.1.1 - metrics, fixes Serverless Framework local exec',
        version: '0.1.1',
        week: 2,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: '',
        version: '0.1.7',
        week: 1,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: '',
        version: '0.1.6',
        week: 49,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: '',
        version: '0.1.5',
        week: 49,
        quarter: 2
      },
      {
        repo: 'iopipe-python',
        date: expect.any(Date),
        name: '',
        version: '0.1.4',
        week: 48,
        quarter: 2
      },
      {
        repo: 'turtle',
        date: expect.any(Date),
        name: '0.0.1 - Alpha 2',
        version: null,
        week: 2,
        quarter: 2
      },
      {
        repo: 'turtle',
        date: expect.any(Date),
        name: 'Alpha 1',
        version: null,
        week: 2,
        quarter: 2
      },
      {
        repo: 'v8-profiler-lambda',
        date: expect.any(Date),
        name: '',
        version: null,
        week: 5,
        quarter: 2
      }
    ]);
  });
});
