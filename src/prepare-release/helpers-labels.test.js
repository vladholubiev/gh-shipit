jest.mock('./github-labels');

const {getRepoLabels} = require('./github-labels');
const {hasReleaseLabel} = require('./helpers-labels');

describe('#hasReleaseLabel', () => {
  getRepoLabels.mockReturnValue([]);

  const params = {org: 'my-org', repo: 'my-repo'};

  it('should export hasReleaseLabel function', () => {
    expect(hasReleaseLabel).toBeInstanceOf(Function);
  });

  it('should call getRepoLabels for repo to get list of labels', async () => {
    await hasReleaseLabel(params);
    expect(getRepoLabels).toBeCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should return false if repo has no release label', async () => {
    const result = await hasReleaseLabel(params);
    expect(result).toEqual(false);
  });

  it('should return true if repo has no release label', async () => {
    getRepoLabels.mockReturnValueOnce(['release', 'bug']);
    const result = await hasReleaseLabel(params);

    expect(result).toEqual(true);
  });
});
