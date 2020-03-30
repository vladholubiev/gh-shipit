import path from 'path';
import debug0 from 'debug';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {deleteBranch as deleteRepoBranch} from '@shelf/gh-sdk';

const debug = debug0(`gh-shipit:${path.basename(__filename)}`);

export async function publishDraftRelease({org, repo, releaseId}) {
  const gh = getClient();

  const {data} = await gh.repos.updateRelease({
    owner: org,
    repo,
    release_id: releaseId,
    draft: false
  });

  return data;
}

export async function deleteBranch({org, repo, name}): Promise<any> {
  return deleteRepoBranch({
    owner: org,
    repo,
    ref: `heads/${name}`
  });
}
