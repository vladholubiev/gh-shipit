jest.mock('./client');

const {getClient} = require('./client');
const {createReleasePR, createMasterDevelopPR, mergePR} = require('./client-prs');

const createMock = jest.fn().mockReturnValue({data: {}});
const mergeMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  pullRequests: {
    create: createMock,
    merge: mergeMock
  }
});

beforeEach(() => {
  createMock.mockClear();
});

describe('#createReleasePR', () => {
  it('should export createReleasePR function', () => {
    expect(createReleasePR).toBeInstanceOf(Function);
  });

  it('should call pullRequests.create w/ proper branches', async () => {
    await createReleasePR({
      org: 'my-org',
      repo: 'my-repo',
      version: '1.0.0',
      releaseTitle: 'New Login Page'
    });

    expect(createMock).toBeCalledWith({
      base: 'master',
      head: 'release/v1.0.0',
      owner: 'my-org',
      repo: 'my-repo',
      title: 'Release v1.0.0: New Login Page'
    });
  });
});

describe('#createMasterDevelopPR', () => {
  it('should export createMasterDevelopPR function', () => {
    expect(createMasterDevelopPR).toBeInstanceOf(Function);
  });

  it('should call pullRequests.create w/ proper branches', async () => {
    await createMasterDevelopPR({
      org: 'my-org',
      repo: 'my-repo'
    });

    expect(createMock).toBeCalledWith({
      base: 'develop',
      head: 'master',
      owner: 'my-org',
      repo: 'my-repo',
      title: "Merge 'master' back to 'develop'"
    });
  });
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
