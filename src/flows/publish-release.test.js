jest.mock('../inquirer');

const {askDraftReleaseVersion} = require('../inquirer');
const {publishRelease} = require('./publish-release');

const params = {org: 'my-org', repo: 'my-repo'};

askDraftReleaseVersion.mockReturnValue('v1.0.1');

it('should export publishRelease function', () => {
  expect(publishRelease).toBeInstanceOf(Function);
});

it('should call askDraftReleaseVersion w/ org & repo', async () => {
  await publishRelease(params);
  expect(askDraftReleaseVersion).toBeCalledWith(params);
});
