jest.mock('../client-releases');
jest.mock('../helpers-releases');
jest.mock('../releases-table');
jest.mock('../releases-histogram');

const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTableInRange} = require('../releases-table');
const {printReleasesHistogram} = require('../releases-histogram');
const {viewReleases} = require('./view-releases');

const latestReleasesMock = [{a: 1}];
getOrgReleases.mockReturnValue(latestReleasesMock);
getLatestReleases.mockReturnValue(latestReleasesMock);

it('should export viewReleases function', () => {
  expect(viewReleases).toBeInstanceOf(Function);
});

it('should call getOrgReleases w/ org name', async () => {
  await viewReleases('my-org');
  expect(getOrgReleases).toBeCalledWith('my-org');
});

it('should call getLatestReleases w/ releases response', async () => {
  await viewReleases('my-org');
  expect(getLatestReleases).toBeCalledWith(latestReleasesMock);
});

it('should call printReleasesHistogram w/ releases response', async () => {
  await viewReleases('my-org');
  expect(printReleasesHistogram).toBeCalledWith(latestReleasesMock);
});

it('should call printReleasesTableInRange w/ releases response for this week', async () => {
  await viewReleases('my-org');
  expect(printReleasesTableInRange).toBeCalledWith(latestReleasesMock, 'thisWeek');
});
