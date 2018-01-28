jest.mock('./client');

const {getClient} = require('./client');
const {getRepoLabels, createReleaseLabel} = require('./client-labels');

const labelsMock = [
  {
    id: 208045946,
    url: 'https://api.github.com/repos/octocat/Hello-World/labels/bug',
    name: 'bug',
    color: 'f29513',
    default: true
  }
];
const getLabelsMock = jest.fn().mockReturnValue({data: labelsMock});
const createLabelMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  issues: {
    getLabels: getLabelsMock,
    createLabel: createLabelMock
  }
});

describe('#getRepoLabels', () => {
  it('should export getRepoLabels function', () => {
    expect(getRepoLabels).toBeInstanceOf(Function);
  });

  it('should call getLabels w/ org and repo', async () => {
    await getRepoLabels({org: 'my-org', repo: 'my-repo'});
    expect(getLabelsMock).toBeCalledWith({owner: 'my-org', per_page: 100, repo: 'my-repo'});
  });

  it('should return array of label names', async () => {
    const labels = await getRepoLabels({org: 'my-org', repo: 'my-repo'});
    expect(labels).toEqual(['bug']);
  });
});

describe('#createReleaseLabel', () => {
  it('should export createReleaseLabel function', () => {
    expect(createReleaseLabel).toBeInstanceOf(Function);
  });

  it('should call createLabel w/ label name and color', async () => {
    await createReleaseLabel({org: 'my-org', repo: 'my-repo'});
    expect(createLabelMock).toBeCalledWith({
      color: 'ff0000',
      name: 'release',
      owner: 'my-org',
      repo: 'my-repo'
    });
  });
});
