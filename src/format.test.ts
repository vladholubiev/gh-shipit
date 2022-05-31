import MockDate from 'mockdate';
import {formatReposDiffsForChoices} from './format';

MockDate.set('1/1/2018', 0);

describe('#formatReposDiffsForChoices', () => {
  const diffs = [
    {
      org: 'some-org',
      repo: 'some-repo-1',
      status: 'ahead',
      ahead_by: 12,
      behind_by: 1,
      lastCommitDate: '2010-01-01T00:00:00.000Z',
      lastRelease: 'v1.0.0',
      lastDraftReleaseTag: '-',
    },
    {
      org: 'some-org',
      repo: 'some-repo-2',
      status: 'no-branch',
      lastDraftReleaseTag: '-',
    },
    {
      org: 'some-org',
      repo: 'some-repo-long-name-3',
      status: 'behind',
      ahead_by: 0,
      behind_by: 4,
      lastRelease: 'v1.0.0',
      lastCommitDate: '2014-01-01T00:00:00.000Z',
      lastDraftReleaseTag: 'v1.1.0',
    },
    {
      org: 'some-org',
      repo: 'some-repo-no-diff-4',
      status: 'behind',
      ahead_by: 0,
      behind_by: 0,
      lastRelease: 'v1.0.0',
      lastCommitDate: '2014-01-01T00:00:00.000Z',
      lastDraftReleaseTag: '-',
    },
  ];

  it('should return formatted array of repos diffs', () => {
    const result = formatReposDiffsForChoices(diffs);

    expect(result).toEqual([
      {
        name: '  -1 +12   some-repo-1           v1.0.0   -        8 years ago',
        value: 'some-repo-1',
      },
      {
        name: '  -4 0     some-repo-long-name-3 v1.0.0   v1.1.0   4 years ago',
        value: 'some-repo-long-name-3',
      },
    ]);
  });
});
