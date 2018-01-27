jest.mock('./client');

const {getClient} = require('./client');
const {getRepoBranches, compareBranches} = require('./client-repos');

describe('#getRepoBranches', () => {
  const getBranchesMock = jest.fn();
  getBranchesMock.mockReturnValue({
    data: [{name: 'develop'}, {name: 'master'}]
  });

  getClient.mockReturnValue({
    repos: {
      getBranches: getBranchesMock
    }
  });

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
