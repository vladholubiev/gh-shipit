jest.mock('./client-repos');

import {getRepoBranches} from './client-repos';
import {hasMasterAndDevelop} from './helpers-repos';

(getRepoBranches as jest.Mock).mockReturnValue([]);

describe('#hasMasterAndDevelop', () => {
  it('should call getRepoBranches w/ org and repo', async () => {
    await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(getRepoBranches).toHaveBeenCalledWith({org: 'my-org', repo: 'my-repo'});
  });

  it('should return true when repo has both branches', async () => {
    (getRepoBranches as jest.Mock).mockReturnValueOnce(['master', 'develop', 'feature/cool']);
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(true);
  });

  it('should return false when repo has no branches', async () => {
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(false);
  });

  it('should return false when repo has only master', async () => {
    (getRepoBranches as jest.Mock).mockReturnValueOnce(['master']);
    const result = await hasMasterAndDevelop({org: 'my-org', repo: 'my-repo'});

    expect(result).toEqual(false);
  });
});
