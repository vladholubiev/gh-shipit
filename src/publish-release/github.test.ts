jest.mock('@shelf/gh-sdk/lib/rest-client');

import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {publishDraftRelease} from './github';

const updateReleaseMock = jest.fn().mockReturnValue({data: {}});

(getClient as jest.Mock).mockReturnValue({
  repos: {
    updateRelease: updateReleaseMock,
  },
});

describe('#publishDraftRelease', () => {
  it('should call editRelease w/ proper params', async () => {
    const params = {
      org: 'my-org',
      repo: 'my-repo',
      releaseId: 'q1w2e3rr4',
    };
    await publishDraftRelease(params);

    expect(updateReleaseMock).toHaveBeenCalledWith({
      draft: false,
      owner: 'my-org',
      release_id: 'q1w2e3rr4',
      repo: 'my-repo',
    });
  });
});
