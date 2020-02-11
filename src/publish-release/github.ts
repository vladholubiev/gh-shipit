import path from 'path';
import debug0 from 'debug';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';

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

export async function deleteBranch({org, repo, name}) {
  const gh = getClient();

  try {
    const {data} = await gh.gitdata.deleteRef({owner: org, repo, ref: `heads/${name}`});

    return data;
  } catch (error) {
    debug(
      `Error deleting branch, possibly branch auto-delete feature is enabled in the repo settings`,
      error
    );
  }
}
