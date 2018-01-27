jest.mock('./repos');

const {getBranchDiff} = require('./repos');
const {getAllReposDiffs, formatDiffs} = require('./diff');

getBranchDiff.mockReturnValue(Promise.resolve({}));

describe('#getAllReposDiffs', () => {
  beforeEach(() => {
    getBranchDiff.mockClear();
  });

  it('should export getAllReposDiffs function', () => {
    expect(getAllReposDiffs).toBeInstanceOf(Function);
  });

  it('should call getBranchDiff 3 times for 3 repos', async () => {
    await getAllReposDiffs({
      org: 'some-org',
      repos: ['some-repo-1', 'some-repo-2', 'some-repo-3']
    });

    expect(getBranchDiff).toHaveBeenCalledTimes(3);
  });
});

describe('#formatDiffs', () => {
  const diff = [
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

  it('should export formatDiffs function', () => {
    expect(formatDiffs).toBeInstanceOf(Function);
  });

  it('should return formatted diff', async () => {
    const formattedDiff = await formatDiffs(diff);

    expect(formattedDiff).toEqual([
      {
        ahead_by: '+0  ',
        behind_by: '  -4',
        lastCommitDate: expect.any(String),
        lastCommitDateFormatted: expect.stringContaining('years ago'),
        org: 'some-org',
        repo: 'some-repo-3',
        status: 'behind'
      },
      {
        ahead_by: '+12 ',
        behind_by: '  -1',
        lastCommitDate: expect.any(String),
        lastCommitDateFormatted: expect.stringContaining('years ago'),
        org: 'some-org',
        repo: 'some-repo-1',
        status: 'ahead'
      }
    ]);
  });
});
