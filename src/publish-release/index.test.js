jest.mock('../view-releases/print');
jest.mock('./github');
jest.mock('./inquirer');

const {print1Release} = require('../view-releases/print');
const {publishDraftRelease, mergePR, deleteBranch} = require('./github');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('./inquirer');
const {publishRelease} = require('./');

const params = {org: 'my-org', repo: 'my-repo'};

askDraftReleaseVersion.mockReturnValue({version: 'v1.0.1', releaseId: '1'});
askDraftReleasePRNumber.mockReturnValue('123');
publishDraftRelease.mockResolvedValue({name: 'release 1', published_at: new Date('2010-10-10')});

it('should export publishRelease function', () => {
  expect(publishRelease).toBeInstanceOf(Function);
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

  expect(mergePR).toHaveBeenCalledWith({...params, number: '123'});
});

it('should call deleteBranch w/ org & repo & branch name', async () => {
  await publishRelease(params);

  expect(deleteBranch).toHaveBeenCalledWith({
    name: 'release/v1.0.1',
    org: 'my-org',
    repo: 'my-repo'
  });
});

it('should call print1Release w/ release name, date, version, repo', async () => {
  await publishRelease(params);

  expect(print1Release).toHaveBeenCalledWith({
    date: expect.any(Date),
    name: 'release 1',
    repo: 'my-repo',
    version: 'v1.0.1'
  });
});
