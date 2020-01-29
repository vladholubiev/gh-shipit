jest.mock('@shelf/gh-sdk');
jest.mock('@shelf/gh-sdk/lib/rest-client');

import {listOrgRepos} from '@shelf/gh-sdk';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {compareBranches, getOrgRepoNames, getRepoBranches} from './client-repos';

const getBranchesMock = jest.fn().mockReturnValue({data: [{name: 'develop'}, {name: 'master'}]});
const compareCommitsMock = jest.fn().mockReturnValue({data: []});
const getBranchMock = jest.fn().mockReturnValue({data: {commit: {sha: 'a1b2c3'}}});

(getClient as jest.Mock).mockReturnValue({
  repos: {
    getBranches: getBranchesMock,
    compareCommits: compareCommitsMock,
    getBranch: getBranchMock
  }
});
(listOrgRepos as jest.Mock).mockResolvedValue([
  {name: 'repo-1', archived: false},
  {name: 'repo-2', archived: true},
  {name: 'repo-3', archived: false}
]);

describe('#getRepoBranches', () => {
  beforeEach(() => {
    getBranchesMock.mockClear();
  });

  it('should call getBranches w/ 100 page size', async () => {
    await getRepoBranches({org: 'my-org', repo: 'my-repo'});

    expect(getBranchesMock).toHaveBeenCalledWith({owner: 'my-org', per_page: 100, repo: 'my-repo'});
  });

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
      repo: 'my-repo'
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
