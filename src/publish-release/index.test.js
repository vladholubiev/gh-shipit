jest.mock('./github');
jest.mock('./inquirer');

const {publishDraftRelease, mergePR} = require('./github');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('./inquirer');
const {publishRelease} = require('./');

const params = {org: 'my-org', repo: 'my-repo'};

askDraftReleaseVersion.mockReturnValue({version: 'v1.0.1', releaseId: '1'});
askDraftReleasePRNumber.mockReturnValue('123');

it('should export publishRelease function', () => {
  expect(publishRelease).toBeInstanceOf(Function);
});

it('should call askDraftReleaseVersion w/ org & repo', async () => {
  await publishRelease(params);
  expect(askDraftReleaseVersion).toBeCalledWith(params);
});

it('should call askDraftReleasePRNumber w/ org & repo & version', async () => {
  await publishRelease(params);
  expect(askDraftReleasePRNumber).toBeCalledWith({...params, version: 'v1.0.1'});
});

it('should call publishDraftRelease w/ org & repo & release id', async () => {
  await publishRelease(params);
  expect(publishDraftRelease).toBeCalledWith({...params, releaseId: '1'});
});

it('should call mergePR w/ org & repo & release PR number', async () => {
  await publishRelease(params);
  expect(mergePR).toBeCalledWith({...params, number: '123'});
});
