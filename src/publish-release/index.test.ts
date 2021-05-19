jest.mock('@shelf/gh-sdk');
jest.mock('./github');
jest.mock('./inquirer');

import {mergePR} from '@shelf/gh-sdk';
import {deleteBranch, publishDraftRelease} from './github';
import {askDraftReleasePRNumber, askDraftReleaseVersion} from './inquirer';
import {publishRelease} from './';

const params = {org: 'my-org', repo: 'my-repo'};

(askDraftReleaseVersion as jest.Mock).mockReturnValue({version: 'v1.0.1', releaseId: '1'});
(askDraftReleasePRNumber as jest.Mock).mockReturnValue('123');
(publishDraftRelease as jest.Mock).mockResolvedValue({
  name: 'release 1',
  published_at: new Date('2010-10-10'),
});

it('should call askDraftReleaseVersion w/ org & repo', async () => {
  await publishRelease(params);

  expect(askDraftReleaseVersion).toHaveBeenCalledWith(params);
});

it('should call askDraftReleasePRNumber w/ org & repo & version', async () => {
  await publishRelease(params);

  expect(askDraftReleasePRNumber).toHaveBeenCalledWith({...params, version: 'v1.0.1'});
});

it('should call publishDraftRelease w/ org & repo & release id', async () => {
  await publishRelease(params);

  expect(publishDraftRelease).toHaveBeenCalledWith({...params, releaseId: '1'});
});

it('should call mergePR w/ org & repo & release PR number', async () => {
  await publishRelease(params);

  expect(mergePR).toHaveBeenCalledWith({owner: 'my-org', pr: 123, repo: 'my-repo'});
});

it('should call deleteBranch w/ org & repo & branch name', async () => {
  await publishRelease(params);

  expect(deleteBranch).toHaveBeenCalledWith({
    name: 'release/v1.0.1',
    org: 'my-org',
    repo: 'my-repo',
  });
});
