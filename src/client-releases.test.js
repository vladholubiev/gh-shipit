jest.mock('./client');

const {getClient} = require('./client');
const {getLastRelease} = require('./client-releases');

const getLatestReleaseMock = jest.fn().mockReturnValue({data: {tag_name: 'v1.0.1'}});
getClient.mockReturnValue({
  repos: {
    getLatestRelease: getLatestReleaseMock
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
