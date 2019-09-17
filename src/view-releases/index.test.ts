jest.mock('./format');
jest.mock('./print');
jest.mock('./github');

const {getLatestReleases} = require('./format');
const {printReleasesTable} = require('./print');
const {getOrgReleases} = require('./github');
const {viewReleases} = require('./');

const latestReleasesMock = [{a: 1}];
getOrgReleases.mockReturnValue(latestReleasesMock);
getLatestReleases.mockReturnValue(latestReleasesMock);

const params = {org: 'my-org', format: 'table'};

it('should export viewReleases function', () => {
  expect(viewReleases).toBeInstanceOf(Function);
});

it('should call getOrgReleases w/ org name', async () => {
  await viewReleases(params);

  expect(getOrgReleases).toHaveBeenCalledWith('my-org');
});

it('should call getLatestReleases w/ releases response', async () => {
  await viewReleases(params);

  expect(getLatestReleases).toHaveBeenCalledWith(latestReleasesMock);
});

it('should call printReleasesTable w/ releases response for this week', async () => {
  await viewReleases(params);

  expect(printReleasesTable).toHaveBeenCalledWith(latestReleasesMock);
});
