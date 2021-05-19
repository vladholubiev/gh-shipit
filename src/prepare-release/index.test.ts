jest.mock('@shelf/gh-sdk');
jest.mock('./helpers-labels');
jest.mock('./inquirer');
jest.mock('./github');

import {assignReleaseLabelToPR, createReleaseLabel} from '@shelf/gh-sdk';
import {hasReleaseLabel} from './helpers-labels';
import {
  createReleaseBranch,
  createReleaseNotes,
  createReleasePR,
  getLastDevelopCommitSHA,
} from './github';
import {askNewReleaseVersion, askReleaseTitle, askToOpenPR} from './inquirer';
import {prepareRelease} from './';

describe('#prepareRelease', () => {
  (askNewReleaseVersion as jest.Mock).mockReturnValue('1.0.1');
  (askReleaseTitle as jest.Mock).mockReturnValue('My new release');
  (createReleasePR as jest.Mock).mockReturnValue({number: 123});

  const params = {org: 'my-org', repo: 'my-repo'};

  beforeEach(() => {
    (createReleaseLabel as jest.Mock).mockClear();
  });

  it('should call askNewReleaseVersion w/ org and repo', async () => {
    await prepareRelease(params);

    expect(askNewReleaseVersion).toHaveBeenCalledWith(params);
  });

  it('should call getLastDevelopCommitSHA w/ org and repo', async () => {
    await prepareRelease(params);

    expect(getLastDevelopCommitSHA).toHaveBeenCalledWith(params);
  });

  it('should call createReleaseBranch w/ org, repo and version', async () => {
    await prepareRelease(params);

    expect(createReleaseBranch).toHaveBeenCalledWith({...params, version: '1.0.1'});
  });

  it('should call askReleaseTitle w/ org and repo', async () => {
    await prepareRelease(params);

    expect(askReleaseTitle).toHaveBeenCalledWith(params);
  });

  it('should call askReleaseTitle w/ org, repo, version, title', async () => {
    await prepareRelease(params);

    expect(createReleaseNotes).toHaveBeenCalledWith({
      ...params,
      version: '1.0.1',
      releaseTitle: 'My new release',
    });
  });

  it('should call createReleasePR w/ org, repo, version, title', async () => {
    await prepareRelease(params);

    expect(createReleasePR).toHaveBeenCalledWith({
      ...params,
      version: '1.0.1',
      releaseTitle: 'My new release',
    });
  });

  it('should call hasReleaseLabel w/ org, repo', async () => {
    await prepareRelease(params);

    expect(hasReleaseLabel).toHaveBeenCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should call createReleaseLabel if one not exists', async () => {
    await prepareRelease(params);

    expect(createReleaseLabel).toHaveBeenCalledWith('my-org', 'my-repo');
  });

  it('should not call createReleaseLabel if one exists', async () => {
    (hasReleaseLabel as jest.Mock).mockReturnValueOnce(true);
    await prepareRelease(params);

    expect(createReleaseLabel).not.toHaveBeenCalledWith('my-org', 'my-repo');
  });

  it('should call assignReleaseLabelToPR w/ repo and pr number', async () => {
    await prepareRelease(params);

    expect(assignReleaseLabelToPR).toHaveBeenCalledWith('my-org', 'my-repo', 123);
  });

  it('should call askToOpenPR w/ org, repo, pr number', async () => {
    await prepareRelease(params);

    expect(askToOpenPR).toHaveBeenCalledWith({
      ...params,
      pr: 123,
    });
  });
});
