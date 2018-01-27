jest.mock('./client-repos');

const {getRepoBranches} = require('./client-repos');
const {hasMasterAndDevelop} = require('./helpers-repos');

getRepoBranches.mockReturnValue([]);

describe('#hasMasterAndDevelop', () => {
  it('should export hasMasterAndDevelop function', () => {
    expect(hasMasterAndDevelop).toBeInstanceOf(Function);
  });

  it('should call getRepoBranches w/ org and repo', async () => {
    await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});
    expect(getRepoBranches).toBeCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should return true when repo has both branches', async () => {
    getRepoBranches.mockReturnValueOnce(['master', 'develop', 'feature/cool']);
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(true);
  });

  it('should return false when repo has no branches', async () => {
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(false);
  });

  it('should return false when repo has only master', async () => {
    getRepoBranches.mockReturnValueOnce(['master']);
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(false);
  });
});
