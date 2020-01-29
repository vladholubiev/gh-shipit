jest.mock('@shelf/gh-sdk/lib/rest-client');

const {getClient} = require('@shelf/gh-sdk/lib/rest-client');
const {getLastRelease, getLastDraftReleaseTag, getDraftReleaseTags} = require('./client-releases');

const getLatestReleaseMock = jest.fn().mockReturnValue({data: {tag_name: 'v1.0.1'}});
const listReleasesMock = jest.fn().mockReturnValue({
  data: [
    {id: 1, tag_name: 'v1.0.0', draft: false},
    {id: 2, tag_name: 'v1.0.1', draft: true}
  ]
});

getClient.mockReturnValue({
  repos: {
    getLatestRelease: getLatestReleaseMock,
    listReleases: listReleasesMock
  }
});

describe('#getLastRelease', () => {
  it('should call getLatestRelease w/ repo name', async () => {
    await getLastRelease({org: 'my-org', repo: 'my-repo'});

    expect(getLatestReleaseMock).toHaveBeenCalledWith({owner: 'my-org', repo: 'my-repo'});
  });

  it('should return tag name of last release', async () => {
    const lastRelease = await getLastRelease({org: 'my-org', repo: 'my-repo'});

    expect(lastRelease).toEqual('v1.0.1');
  });
});

describe('#getLastDraftReleaseTag', () => {
  it('should call getReleases w/ repo name', async () => {
    await getLastDraftReleaseTag({org: 'my-org', repo: 'my-repo'});

    expect(listReleasesMock).toHaveBeenCalledWith({owner: 'my-org', repo: 'my-repo'});
  });

  it('should return tag name of last draft release', async () => {
    const lastDraftRelease = await getLastDraftReleaseTag({org: 'my-org', repo: 'my-repo'});

    expect(lastDraftRelease).toEqual('v1.0.1');
  });
});

describe('#getDraftReleaseTags', () => {
  it('should call getReleases w/ repo name', async () => {
    await getDraftReleaseTags({org: 'my-org', repo: 'my-repo'});

    expect(listReleasesMock).toHaveBeenCalledWith({owner: 'my-org', repo: 'my-repo'});
  });

  it('should return tag names of last draft releases', async () => {
    const lastDraftReleases = await getDraftReleaseTags({org: 'my-org', repo: 'my-repo'});

    expect(lastDraftReleases).toEqual([{id: 2, tag: 'v1.0.1'}]);
  });
});
