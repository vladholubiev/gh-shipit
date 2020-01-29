jest.mock('@shelf/gh-sdk/lib/rest-client');

const {getClient} = require('@shelf/gh-sdk/lib/rest-client');
const {getRepoLabels, createReleaseLabel, assignReleaseLabel} = require('./github-labels');

const labelsMock = [
  {
    id: 208045946,
    url: 'https://api.github.com/repos/octocat/Hello-World/labels/bug',
    name: 'bug',
    color: 'f29513',
    default: true
  }
];
const listLabelsForRepoMock = jest.fn().mockReturnValue({data: labelsMock});
const createLabelMock = jest.fn().mockReturnValue({data: {}});
const addLabelsMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  issues: {
    listLabelsForRepo: listLabelsForRepoMock,
    createLabel: createLabelMock,
    addLabels: addLabelsMock
  }
});

describe('#getRepoLabels', () => {
  it('should call listLabelsForRepo w/ org and repo', async () => {
    await getRepoLabels({org: 'my-org', repo: 'my-repo'});

    expect(listLabelsForRepoMock).toHaveBeenCalledWith({
      owner: 'my-org',
      per_page: 100,
      repo: 'my-repo'
    });
  });

  it('should return array of label names', async () => {
    const labels = await getRepoLabels({org: 'my-org', repo: 'my-repo'});

    expect(labels).toEqual(['bug']);
  });
});

describe('#createReleaseLabel', () => {
  it('should call createLabel w/ label name and color', async () => {
    await createReleaseLabel({org: 'my-org', repo: 'my-repo'});

    expect(createLabelMock).toHaveBeenCalledWith({
      color: 'ff0000',
      name: 'release',
      owner: 'my-org',
      repo: 'my-repo'
    });
  });
});

describe('#assignReleaseLabel', () => {
  const params = {org: 'my-org', repo: 'my-repo', pr: 123};

  it('should call addLabels w/ 1 label and pr number', async () => {
    await assignReleaseLabel(params);

    expect(addLabelsMock).toHaveBeenCalledWith({
      labels: ['release'],
      number: 123,
      owner: 'my-org',
      repo: 'my-repo'
    });
  });
});
