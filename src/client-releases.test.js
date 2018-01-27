jest.mock('./client');

const {getClient} = require('./client');
const {getLastRelease, createReleaseNotes} = require('./client-releases');

const getLatestReleaseMock = jest.fn().mockReturnValue({data: {tag_name: 'v1.0.1'}});
const createReleaseMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  repos: {
    getLatestRelease: getLatestReleaseMock,
    createRelease: createReleaseMock
  }
});

describe('#getLastRelease', () => {
  it('should export getLastRelease function', () => {
    expect(getLastRelease).toBeInstanceOf(Function);
  });

  it('should call getLatestRelease w/ repo name', async () => {
    await getLastRelease({org: 'my-org', repo: 'my-repo'});
    expect(getLatestReleaseMock).toBeCalledWith({owner: 'my-org', repo: 'my-repo'});
  });

  it('should return tag name of last release', async () => {
    const lastRelease = await getLastRelease({org: 'my-org', repo: 'my-repo'});
    expect(lastRelease).toEqual('v1.0.1');
  });
});

describe('#createReleaseNotes', () => {
  it('should export createReleaseNotes function', () => {
    expect(createReleaseNotes).toBeInstanceOf(Function);
  });

  it('should call createRelease w/ proper params', async () => {
    const params = {org: 'my-org', repo: 'my-repo', version: '1.0.0'};
    await createReleaseNotes(params);

    expect(createReleaseMock).toBeCalledWith({
      draft: true,
      name: 'Release v1.0.0: ...',
      owner: 'my-org',
      repo: 'my-repo',
      tag_name: 'v1.0.0'
    });
  });
});
