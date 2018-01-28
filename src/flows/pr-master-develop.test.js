jest.mock('../inquirer');
jest.mock('../client-prs');

const {askToOpenPR} = require('../inquirer');
const {createMasterDevelopPR} = require('../client-prs');
const {prMasterDevelop} = require('./pr-master-develop');

describe('#prMasterDevelop', () => {
  createMasterDevelopPR.mockReturnValue({number: 123});

  const params = {org: 'my-org', repo: 'my-repo'};

  it('should export prMasterDevelop function', () => {
    expect(prMasterDevelop).toBeInstanceOf(Function);
  });

  it('should call createMasterDevelopPR w/ org, repo', async () => {
    await prMasterDevelop(params);
    expect(createMasterDevelopPR).toBeCalledWith(params);
  });

  it('should call askToOpenPR w/ org, repo, pr number', async () => {
    await prMasterDevelop(params);
    expect(askToOpenPR).toBeCalledWith({...params, pr: 123});
  });
});
