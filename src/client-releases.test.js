jest.mock('./client');

const {getClient} = require('./client');
const {
  getLastRelease,
  createReleaseNotes,
  getOpenReleasePRs,
  publishRelease,
  getLastDraftReleaseTag
} = require('./client-releases');

const getLatestReleaseMock = jest.fn().mockReturnValue({data: {tag_name: 'v1.0.1'}});
const getReleasesMock = jest.fn().mockReturnValue({
  data: [{tag_name: 'v1.0.0', draft: false}, {tag_name: 'v1.0.1', draft: true}]
});
const createReleaseMock = jest.fn().mockReturnValue({data: {}});
const editReleaseMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  repos: {
    getLatestRelease: getLatestReleaseMock,
    getReleases: getReleasesMock,
    createRelease: createReleaseMock,
    editRelease: editReleaseMock
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

describe('#getLastDraftReleaseTag', () => {
  it('should export getLastDraftReleaseTag function', () => {
    expect(getLastDraftReleaseTag).toBeInstanceOf(Function);
  });

  it('should call getReleases w/ repo name', async () => {
    await getLastDraftReleaseTag({org: 'my-org', repo: 'my-repo'});
    expect(getReleasesMock).toBeCalledWith({owner: 'my-org', repo: 'my-repo'});
  });

  it('should return tag name of last draft release', async () => {
    const lastDraftRelease = await getLastDraftReleaseTag({org: 'my-org', repo: 'my-repo'});
    expect(lastDraftRelease).toEqual('v1.0.1');
  });
});

describe('#getOpenReleasePRs', () => {
  it('should export getOpenReleasePRs function', () => {
    expect(getOpenReleasePRs).toBeInstanceOf(Function);
  });
});

describe('#createReleaseNotes', () => {
  it('should export createReleaseNotes function', () => {
    expect(createReleaseNotes).toBeInstanceOf(Function);
  });

  it('should call createRelease w/ proper params', async () => {
    const params = {
      org: 'my-org',
      repo: 'my-repo',
      version: '1.0.0',
      releaseTitle: 'New Login Page'
    };
    await createReleaseNotes(params);

    expect(createReleaseMock).toBeCalledWith({
      draft: true,
      name: 'Release v1.0.0: New Login Page',
      owner: 'my-org',
      repo: 'my-repo',
      tag_name: 'v1.0.0',
      target_commitish: 'release/v1.0.0'
    });
  });
});

describe('#publishRelease', () => {
  it('should export publishRelease function', () => {
    expect(publishRelease).toBeInstanceOf(Function);
  });

  it('should call editRelease w/ proper params', async () => {
    const params = {
      org: 'my-org',
      repo: 'my-repo',
      releaseId: 'q1w2e3rr4'
    };
    await publishRelease(params);

    expect(editReleaseMock).toBeCalledWith({
      draft: false,
      owner: 'my-org',
      release_id: 'q1w2e3rr4',
      repo: 'my-repo'
    });
  });
});
