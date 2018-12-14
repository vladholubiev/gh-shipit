jest.mock('../client');

const {getClient} = require('../client');
const {mergePR, publishDraftRelease} = require('./github');

const mergeMock = jest.fn().mockReturnValue({data: {}});
const updateReleaseMock = jest.fn().mockReturnValue({data: {}});

getClient.mockReturnValue({
  pullRequests: {
    merge: mergeMock
  },
  repos: {
    updateRelease: updateReleaseMock
  }
});

describe('#mergePR', () => {
  it('should export mergePR function', () => {
    expect(mergePR).toBeInstanceOf(Function);
  });

  it('should call pullRequests.merge w/ proper params', async () => {
    await mergePR({
      org: 'my-org',
      repo: 'my-repo',
      number: 1
    });

    expect(mergeMock).toBeCalledWith({
      number: 1,
      owner: 'my-org',
      repo: 'my-repo'
    });
  });
});

describe('#publishDraftRelease', () => {
  it('should export publishDraftRelease function', () => {
    expect(publishDraftRelease).toBeInstanceOf(Function);
  });

  it('should call editRelease w/ proper params', async () => {
    const params = {
      org: 'my-org',
      repo: 'my-repo',
      releaseId: 'q1w2e3rr4'
    };
    await publishDraftRelease(params);

    expect(updateReleaseMock).toBeCalledWith({
      draft: false,
      owner: 'my-org',
      release_id: 'q1w2e3rr4',
      repo: 'my-repo'
    });
  });
});
