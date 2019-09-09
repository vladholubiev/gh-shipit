jest.mock('../client');

const {getClient} = require('../client');
const {
  getLastDevelopCommitSHA,
  createReleaseBranch,
  createReleaseNotes,
  createReleasePR
} = require('./github');

const createMock = jest.fn().mockReturnValue({data: {}});
const createReleaseMock = jest.fn().mockReturnValue({data: {}});
const createRefMock = jest.fn().mockReturnValue({data: []});
const getBranchMock = jest.fn().mockReturnValue({data: {commit: {sha: 'a1b2c3'}}});

getClient.mockReturnValue({
  repos: {
    getBranch: getBranchMock,
    createRelease: createReleaseMock
  },
  gitdata: {
    createRef: createRefMock
  },
  pullRequests: {
    create: createMock
  }
});

describe('#getLastDevelopCommitSHA', () => {
  it('should export getLastDevelopCommitSHA function', () => {
    expect(getLastDevelopCommitSHA).toBeInstanceOf(Function);
  });

  it('should call getBranch w/ develop branch in params', async () => {
    await getLastDevelopCommitSHA({org: 'my-org', repo: 'my-repo'});

    expect(getBranchMock).toHaveBeenCalledWith({
      branch: 'develop',
      owner: 'my-org',
      per_page: 1,
      repo: 'my-repo'
    });
  });

  it('should return sha of last commit in develop', async () => {
    const sha = await getLastDevelopCommitSHA({org: 'my-org', repo: 'my-repo'});

    expect(sha).toEqual('a1b2c3');
  });
});

describe('#createReleaseBranch', () => {
  it('should export createReleaseBranch function', () => {
    expect(createReleaseBranch).toBeInstanceOf(Function);
  });

  it('should call createRef w/ all branch name and commit hash', async () => {
    const params = {org: 'my-org', repo: 'my-repo', version: '1.0.0', commitHash: 'b4c59e'};
    await createReleaseBranch(params);

    expect(createRefMock).toHaveBeenCalledWith({
      owner: 'my-org',
      ref: 'refs/heads/release/v1.0.0',
      repo: 'my-repo',
      sha: 'b4c59e'
    });
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

    expect(createReleaseMock).toHaveBeenCalledWith({
      draft: true,
      name: 'Release v1.0.0: New Login Page',
      owner: 'my-org',
      repo: 'my-repo',
      tag_name: 'v1.0.0',
      target_commitish: 'release/v1.0.0'
    });
  });
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

    expect(createMock).toHaveBeenCalledWith({
      base: 'master',
      head: 'release/v1.0.0',
      owner: 'my-org',
      repo: 'my-repo',
      title: 'Release v1.0.0: New Login Page'
    });
  });
});
