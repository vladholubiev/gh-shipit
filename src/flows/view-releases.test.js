jest.mock('../client-releases');
jest.mock('../helpers-releases');
jest.mock('../releases-table');

const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTable} = require('../releases-table');
const {viewReleases} = require('./view-releases');

const latestReleasesMock = [{a: 1}];
getOrgReleases.mockReturnValue(latestReleasesMock);
getLatestReleases.mockReturnValue(latestReleasesMock);

const params = {org: 'my-org', format: 'table'};

it('should export viewReleases function', () => {
  expect(viewReleases).toBeInstanceOf(Function);
});

it('should call getOrgReleases w/ org name', async () => {
  await viewReleases(params);
  expect(getOrgReleases).toBeCalledWith('my-org');
});

it('should call getLatestReleases w/ releases response', async () => {
  await viewReleases(params);
  expect(getLatestReleases).toBeCalledWith(latestReleasesMock);
});

it('should call printReleasesTable w/ releases response for this week', async () => {
  await viewReleases(params);
  expect(printReleasesTable).toBeCalledWith(latestReleasesMock);
});
