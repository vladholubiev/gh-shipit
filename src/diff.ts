import pProgress from 'p-progress';
import pMap from 'p-map';
import {getBranchDiff} from './repos';

export function getAllReposDiffs({org, repos}) {
  return pProgress.fn((repos, progress) => {
    let i = 0;

    return pMap(
      repos,
      repo =>
        getBranchDiff({org, repo}).then(resp => {
          progress(i++ / repos.length);

          return resp;
        }),
      {concurrency: 32}
    );
  })(repos);
}
