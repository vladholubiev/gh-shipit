jest.mock('./client');

const {getClient} = require('./client');
const {getUserOrgs} = require('./client-users');

const getOrgsMock = jest.fn().mockReturnValue({data: [{login: 'org-1'}, {login: 'org-2'}]});
getClient.mockReturnValue({
  orgs: {
    listForAuthenticatedUser: getOrgsMock
  }
});

describe('#getUserOrgs', () => {
  it('should export  getUserOrgs function', () => {
    expect(getUserOrgs).toBeInstanceOf(Function);
  });

  it('should call getOrgs w/o params', async () => {
    await getUserOrgs();
    expect(getOrgsMock).toBeCalledWith();
  });

  it('should return array of user orgs', async () => {
    const orgs = await getUserOrgs();
    expect(orgs).toEqual(['org-1', 'org-2']);
  });
});
