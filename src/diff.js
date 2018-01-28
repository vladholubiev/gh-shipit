const pProgress = require('p-progress');
const pMap = require('p-map');
const {getBranchDiff} = require('./repos');

module.exports.getAllReposDiffs = function({org, repos}) {
  return pProgress.fn((repos, progress) => {
    let i = 0;

    return pMap(
      repos,
      repo =>
        getBranchDiff({org, repo}).then(resp => {
          progress(i++ / repos.length);
          return resp;
        }),
      {concurrency: 24}
    );
  })(repos);
};
