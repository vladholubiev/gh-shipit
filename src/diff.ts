const pProgress = require('p-progress');
const pMap = require('p-map');
const {getBranchDiff} = require('./repos');

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
