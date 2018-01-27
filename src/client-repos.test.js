jest.mock('./client');

const {getClient} = require('./client');
const {getRepoBranches, compareBranches} = require('./client-repos');

const getBranchesMock = jest.fn().mockReturnValue({data: [{name: 'develop'}, {name: 'master'}]});
const compareCommitsMock = jest.fn().mockReturnValue({data: []});

getClient.mockReturnValue({
  repos: {
    getBranches: getBranchesMock,
    compareCommits: compareCommitsMock
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
