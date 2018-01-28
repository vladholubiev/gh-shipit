jest.mock('../inquirer');
jest.mock('../client-repos');
jest.mock('../client-prs');
jest.mock('../client-releases');
jest.mock('../client-labels');
jest.mock('../helpers-labels');

const {askVersion, askReleaseTitle, askToOpenPR} = require('../inquirer');
const {createReleaseBranch, getLastDevelopCommitSHA} = require('../client-repos');
const {createReleasePR} = require('../client-prs');
const {createReleaseNotes} = require('../client-releases');
const {createReleaseLabel, assignReleaseLabel} = require('../client-labels');
const {hasReleaseLabel} = require('../helpers-labels');
const {prepareRelease} = require('./prepare-release');

describe('#prepareRelease', () => {
  askVersion.mockReturnValue('1.0.1');
  askReleaseTitle.mockReturnValue('My new release');
  createReleasePR.mockReturnValue({number: 123});

  const params = {org: 'my-org', repo: 'my-repo'};

  beforeEach(() => {
    createReleaseLabel.mockClear();
  });

  it('should export prepareRelease function', () => {
    expect(prepareRelease).toBeInstanceOf(Function);
  });

  it('should call askVersion w/ org and repo', async () => {
    await prepareRelease(params);
    expect(askVersion).toBeCalledWith(params);
  });

  it('should call getLastDevelopCommitSHA w/ org and repo', async () => {
    await prepareRelease(params);
    expect(getLastDevelopCommitSHA).toBeCalledWith(params);
  });

  it('should call createReleaseBranch w/ org, repo and version', async () => {
    await prepareRelease(params);
    expect(createReleaseBranch).toBeCalledWith({...params, version: '1.0.1'});
  });

  it('should call askReleaseTitle w/ org and repo', async () => {
    await prepareRelease(params);
    expect(askReleaseTitle).toBeCalledWith(params);
  });

  it('should call askReleaseTitle w/ org, repo, version, title', async () => {
    await prepareRelease(params);
    expect(createReleaseNotes).toBeCalledWith({
      ...params,
      version: '1.0.1',
      releaseTitle: 'My new release'
    });
  });

  it('should call createReleasePR w/ org, repo, version, title', async () => {
    await prepareRelease(params);
    expect(createReleasePR).toBeCalledWith({
      ...params,
      version: '1.0.1',
      releaseTitle: 'My new release'
    });
  });

  it('should call hasReleaseLabel w/ org, repo', async () => {
    await prepareRelease(params);
    expect(hasReleaseLabel).toBeCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should call createReleaseLabel if one not exists', async () => {
    await prepareRelease(params);
    expect(createReleaseLabel).toBeCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should not call createReleaseLabel if one exists', async () => {
    hasReleaseLabel.mockReturnValueOnce(true);
    await prepareRelease(params);

    expect(createReleaseLabel).not.toBeCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should call assignReleaseLabel w/ repo and pr number', async () => {
    await prepareRelease(params);
    expect(assignReleaseLabel).toBeCalledWith({org: 'my-org', pr: 123, repo: 'my-repo'});
  });

  it('should call askToOpenPR w/ org, repo, pr number', async () => {
    await prepareRelease(params);
    expect(askToOpenPR).toBeCalledWith({
      ...params,
      pr: 123
    });
  });
});
