import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {deleteBranch as deleteRepoBranch} from '@shelf/gh-sdk';

export async function publishDraftRelease({org, repo, releaseId}) {
  const gh = getClient();

  const {data} = await gh.repos.updateRelease({
    owner: org,
    repo,
    release_id: releaseId,
    draft: false,
  });

  return data;
}

export function deleteBranch({org, repo, name}): Promise<any> {
  return deleteRepoBranch({
    owner: org,
    repo,
    ref: `heads/${name}`,
  });
}
