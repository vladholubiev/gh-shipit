jest.mock('./repos');

import {getBranchDiff} from './repos';
import {getAllReposDiffs} from './diff';

(getBranchDiff as jest.Mock).mockReturnValue(Promise.resolve({}));

describe('#getAllReposDiffs', () => {
  beforeEach(() => {
    (getBranchDiff as jest.Mock).mockClear();
  });

  it('should call getBranchDiff 3 times for 3 repos', async () => {
    await getAllReposDiffs({
      org: 'some-org',
      repos: ['some-repo-1', 'some-repo-2', 'some-repo-3'],
    });

    expect(getBranchDiff).toHaveBeenCalledTimes(3);
  });
});
