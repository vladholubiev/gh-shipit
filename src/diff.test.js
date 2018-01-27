jest.mock('./repos');

const {getBranchDiff} = require('./repos');
const {getReposBranchesDiff} = require('./diff');

describe('#getReposBranchesDiff', () => {
  it('should export getReposBranchesDiff function', () => {
    expect(getReposBranchesDiff).toBeInstanceOf(Function);
  });

  it('should return repos diff', async () => {
    getBranchDiff
      .mockReturnValueOnce({
        org: 'some-org',
        repo: 'some-repo-1',
        status: 'ahead',
        ahead_by: 12,
        behind_by: 1,
        lastCommitDate: '2010-01-31T22:00:00.000Z'
      })
      .mockReturnValueOnce({
        org: 'some-org',
        repo: 'some-repo-2',
        status: 'no-branch'
      })
      .mockReturnValueOnce({
        org: 'some-org',
        repo: 'some-repo-3',
        status: 'behind',
        ahead_by: 0,
        behind_by: 4,
        lastCommitDate: '2014-01-31T22:00:00.000Z'
      });

    const diff = await getReposBranchesDiff({
      org: 'some-org',
      repos: ['some-repo-1', 'some-repo-2', 'some-repo-3']
    });

    expect(diff).toEqual(
      expect.arrayContaining([
        {
          ahead_by: '+0  ',
          behind_by: '  -4',
          lastCommitDate: '2014-01-31T22:00:00.000Z',
          lastCommitDateFormatted: expect.stringContaining('years ago'),
          org: 'some-org',
          repo: 'some-repo-3',
          status: 'behind'
        },
        {
          ahead_by: '+12 ',
          behind_by: '  -1',
          lastCommitDate: '2010-01-31T22:00:00.000Z',
          lastCommitDateFormatted: expect.stringContaining('years ago'),
          org: 'some-org',
          repo: 'some-repo-1',
          status: 'ahead'
        }
      ])
    );
  });
});
