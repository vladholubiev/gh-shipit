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

    expect(latestReleases).toEqual({
      thisWeek: [
        {
          repo: 'serverless-plugin-iopipe',
          date: expect.any(Date),
          name: 'Rename source key to installMethod',
          version: '0.1.12',
          week: 18,
          quarter: 2
        }
      ],
      lastWeek: [
        {
          repo: 'iopipe-js-core',
          date: expect.any(Date),
          name: 'Update naming of client key',
          version: '0.3.1',
          week: 17,
          quarter: 2
        }
      ],
      thisMonth: [
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
        }
      ],
      thisQuarter: [
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
        }
      ]
    });
  });
});
