jest.mock('./client');

const {getClient} = require('./client');
const {createReleasePR} = require('./client-prs');

const createMock = jest.fn().mockReturnValue({data: {}});
getClient.mockReturnValue({
  pullRequests: {
    create: createMock
  }
});

describe('#createReleasePR', () => {
  it('should export createReleasePR function', () => {
    expect(createReleasePR).toBeInstanceOf(Function);
  });

  it('should call pullRequests.create w/ proper branches', async () => {
    await createReleasePR({org: 'my-org', repo: 'my-repo', version: '1.0.0'});
    expect(createMock).toBeCalledWith({
      base: 'master',
      head: 'release/v1.0.0',
      owner: 'my-org',
      repo: 'my-repo',
      title: 'Release v1.0.0: ...'
    });
  });
});
