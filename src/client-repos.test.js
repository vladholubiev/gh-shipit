jest.mock('./client');

const {getClient} = require('./client');
const {
  getRepoBranches,
  compareBranches,
  getOrgRepos,
  createReleaseBranch
} = require('./client-repos');

const getBranchesMock = jest.fn().mockReturnValue({data: [{name: 'develop'}, {name: 'master'}]});
const compareCommitsMock = jest.fn().mockReturnValue({data: []});
const getForOrgMock = jest.fn().mockReturnValue({data: []});
const createReferenceMock = jest.fn().mockReturnValue({data: []});

getClient.mockReturnValue({
  repos: {
    getBranches: getBranchesMock,
    compareCommits: compareCommitsMock,
    getForOrg: getForOrgMock
  },
  gitdata: {
    createReference: createReferenceMock
  }
});

describe('#getRepoBranches', () => {
  beforeEach(() => {
    getBranchesMock.mockClear();
  });

  it('should export getRepoBranches function', () => {
    expect(getRepoBranches).toBeInstanceOf(Function);
  });

  it('should call getBranches w/ 100 page size', async () => {
    await getRepoBranches({org: 'my-org', repo: 'my-repo'});
    expect(getBranchesMock).toBeCalledWith({owner: 'my-org', per_page: 100, repo: 'my-repo'});
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

  it('should export compareBranches function', () => {
    expect(compareBranches).toBeInstanceOf(Function);
  });

  it('should call compareCommits w/ develop and master', async () => {
    await compareBranches({org: 'my-org', repo: 'my-repo'});
    expect(compareCommitsMock).toBeCalledWith({
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
  it('should export getOrgRepos function', () => {
    expect(getOrgRepos).toBeInstanceOf(Function);
  });

  it('should call getForOrg w/ type:sources and size:100', async () => {
    await getOrgRepos('my-org');
    expect(getForOrgMock).toBeCalledWith({org: 'my-org', per_page: 100, type: 'sources'});
  });

  it('should return array of non-archived repos', async () => {
    getForOrgMock.mockReturnValueOnce({
      data: [
        {name: 'repo-1', archived: false},
        {name: 'repo-2', archived: true},
        {name: 'repo-3', archived: false}
      ]
    });
    const repos = await getOrgRepos('my-org');

    expect(repos).toEqual(['repo-1', 'repo-3']);
  });
});

describe('#createReleaseBranch', () => {
  it('should export createReleaseBranch function', () => {
    expect(createReleaseBranch).toBeInstanceOf(Function);
  });

  it('should call createReference w/ all branch name and commit hash', async () => {
    const params = {org: 'my-org', repo: 'my-repo', version: '1.0.0', commitHash: 'b4c59e'};
    await createReleaseBranch(params);

    expect(createReferenceMock).toBeCalledWith({
      owner: 'my-org',
      ref: 'release/v1.0.0',
      repo: 'my-repo',
      sha: 'b4c59e'
    });
  });
});
