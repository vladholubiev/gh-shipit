jest.mock('../inquirer');

const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('../inquirer');
const {publishRelease} = require('./publish-release');

const params = {org: 'my-org', repo: 'my-repo'};

askDraftReleaseVersion.mockReturnValue({version: 'v1.0.1', releaseId: '1'});
askDraftReleasePRNumber.mockReturnValue('1');

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
