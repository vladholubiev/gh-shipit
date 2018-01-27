const {formatReposDiffsForChoices} = require('./format');

describe('#formatReposDiffsForChoices', () => {
  const diffs = [
    {
      org: 'some-org',
      repo: 'some-repo-1',
      status: 'ahead',
      ahead_by: 12,
      behind_by: 1,
      lastCommitDate: '2010-01-31T22:00:00.000Z'
    },
    {
      org: 'some-org',
      repo: 'some-repo-2',
      status: 'no-branch'
    },
    {
      org: 'some-org',
      repo: 'some-repo-3',
      status: 'behind',
      ahead_by: 0,
      behind_by: 4,
      lastCommitDate: '2014-01-31T22:00:00.000Z'
    }
  ];

  it('should export formatReposDiffsForChoices function', () => {
    expect(formatReposDiffsForChoices).toBeInstanceOf(Function);
  });

  it('should return formatted array of repos diffs', async () => {
    const result = formatReposDiffsForChoices(diffs);
    expect(result).toEqual([
      {
        name: expect.stringContaining('years ago   -4 +0   some-repo-3'),
        value: 'some-repo-3'
      },
      {
        name: expect.stringContaining('years ago   -1 +12  some-repo-1'),
        value: 'some-repo-1'
      }
    ]);
  });
});
