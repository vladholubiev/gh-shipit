jest.mock('@shelf/gh-sdk/lib/rest-client');
jest.mock('@shelf/gh-sdk/lib/repos/get-latest-branch-commit');
jest.mock('@shelf/gh-sdk/lib/prs/create-release-pr');

import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {
  createReleasePR as createReleasePullRequest,
  getLatestDevelopCommitSHA as getLatestDevCommitSHA
} from '@shelf/gh-sdk';
import {
  createReleaseBranch,
  createReleaseNotes,
  createReleasePR,
  getLastDevelopCommitSHA
} from './github';

const createReleaseMock = jest.fn().mockReturnValue({data: {}});
const createRefMock = jest.fn().mockReturnValue({data: []});

(getClient as jest.Mock).mockReturnValue({
  repos: {
    createRelease: createReleaseMock
  },
  git: {
    createRef: createRefMock
  }
});

(getLatestDevCommitSHA as jest.Mock).mockResolvedValue('a1b2c3');
(createReleasePullRequest as jest.Mock).mockResolvedValue({id: 'some-id', url: 'some-url'});

describe('#getLastDevelopCommitSHA', () => {
  it('should return correct value', async () => {
    const result = await getLastDevelopCommitSHA({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual('a1b2c3');
  });

  it('should return sha of last commit in develop', async () => {
    const sha = await getLastDevelopCommitSHA({org: 'my-org', repo: 'my-repo'});

    expect(sha).toEqual('a1b2c3');
  });
});

describe('#createReleaseBranch', () => {
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
  it('should return correct response', async () => {
    const PR = await createReleasePR({
      org: 'my-org',
      repo: 'my-repo',
      version: '1.0.0',
      releaseTitle: 'New Login Page'
    });

    expect(PR).toEqual({id: 'some-id', url: 'some-url'});
  });
});
