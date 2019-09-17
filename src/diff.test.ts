jest.mock('./repos');

const {getBranchDiff} = require('./repos');
const {getAllReposDiffs} = require('./diff');

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
