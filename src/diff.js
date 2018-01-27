const PProgress = require('p-progress');
const {getBranchDiff} = require('./repos');

module.exports.getAllReposDiffs = function({org, repos}) {
  return PProgress.fn((repos, progress) => {
    let i = 0;

    return Promise.all(
      repos.map(repo =>
        getBranchDiff({org, repo}).then(resp => {
          progress(i++ / repos.length);
          return resp;
        })
      )
    );
  })(repos);
};
