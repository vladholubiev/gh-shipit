jest.mock('@shelf/gh-sdk');
jest.mock('@shelf/gh-sdk/lib/rest-client');

import {getRepoBranchesNames, listOrgRepos} from '@shelf/gh-sdk';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {compareBranches, getOrgRepoNames, getRepoBranches} from './client-repos';

const compareCommitsMock = jest.fn().mockReturnValue({data: []});

(getClient as jest.Mock).mockReturnValue({
  repos: {
    compareCommits: compareCommitsMock,
  },
});
(listOrgRepos as jest.Mock).mockResolvedValue([
  {name: 'repo-1', archived: false},
  {name: 'repo-2', archived: true},
  {name: 'repo-3', archived: false},
]);
(getRepoBranchesNames as jest.Mock).mockResolvedValue(['develop', 'master']);

describe('#getRepoBranches', () => {
  it('should return 2 branches', async () => {
    const branches = await getRepoBranches({org: 'my-org', repo: 'my-repo'});

    expect(branches).toEqual(['develop', 'master']);
  });
});

describe('#compareBranches', () => {
  beforeEach(() => {
    compareCommitsMock.mockClear();
  });

  it('should call compareCommits w/ develop and master', async () => {
    await compareBranches({org: 'my-org', repo: 'my-repo'});

    expect(compareCommitsMock).toHaveBeenCalledWith({
      base: 'master',
      head: 'develop',
      owner: 'my-org',
      repo: 'my-repo',
    });
  });

  it('should return array of changes', async () => {
    const changes = await compareBranches({org: 'my-org', repo: 'my-repo'});

    expect(changes).toEqual([]);
  });
});

describe('#getOrgRepos', () => {
  it('should return array of non-archived repos', async () => {
    const repos = await getOrgRepoNames('my-org');

    expect(repos).toEqual(['repo-1', 'repo-3']);
  });
});
