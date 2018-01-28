const MockDate = require('mockdate');
const {getLatestReleases} = require('./helpers-releases');

MockDate.set('1/1/2018', 0);

describe('#getLatestReleases', () => {
  const releases = [
    {
      repo: 'my-repo-1',
      releases: [
        {
          publishedAt: new Date('2017-04-12T14:08:46.000Z'),
          name: 'Release v0.5.1: Some title 1',
          version: '0.5.1'
        },
        {
          publishedAt: new Date('2017-05-18T15:05:44.000Z'),
          name: 'Release v0.6.0: Some title 2',
          version: '0.6.0'
        }
      ]
    },
    {
      repo: 'my-repo-2',
      releases: [
        {
          publishedAt: new Date('2017-12-05T09:04:58.000Z'),
          name: 'Release v0.6.3: Fixes fixes',
          version: '0.6.3'
        },
        {
          publishedAt: new Date('2017-12-19T09:51:10.000Z'),
          name: 'Release v0.6.4: Even more fixes',
          version: '0.6.4'
        }
      ]
    }
  ];

  it('should export getLatestReleases function', () => {
    expect(getLatestReleases).toBeInstanceOf(Function);
  });

  it('should return array of latest releases', () => {
    const latestReleases = getLatestReleases(releases);

    expect(latestReleases).toEqual([
      {
        repo: 'my-repo-2',
        date: expect.any(Date),
        name: 'Release v0.6.4: Even more fixes',
        version: '0.6.4'
      },
      {
        repo: 'my-repo-2',
        date: expect.any(Date),
        name: 'Release v0.6.3: Fixes fixes',
        version: '0.6.3'
      },
      {
        repo: 'my-repo-1',
        date: expect.any(Date),
        name: 'Release v0.6.0: Some title 2',
        version: '0.6.0'
      },
      {
        repo: 'my-repo-1',
        date: expect.any(Date),
        name: 'Release v0.5.1: Some title 1',
        version: '0.5.1'
      }
    ]);
  });
});
