const _ = require('lodash');
const fp = require('lodash/fp');
const {relativeTime} = require('human-date');
const longest = require('longest');
const PProgress = require('p-progress');
const {getBranchDiff} = require('./repos');

module.exports.getReposBranchesDiff = async function({org, repos}) {
  const diffs = await getAllReposDiffs({org, repos});
  return fp.flow(sortDiffs, padDiffs)(diffs);
};

function getAllReposDiffs({org, repos}) {
  return Promise.all(
    repos.map((repo, i) =>
      PProgress.fn(async (repo, i, progress) => {
        const resp = await getBranchDiff({org, repo});

        progress(i / repos.length);

        return resp;
      })(repo, i)
    )
  );
}

function sortDiffs(diffs) {
  return fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['desc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);
}

function padDiffs(diff) {
  const widestDateLength = fp.flow(fp.map('lastCommitDateFormatted'), longest, fp.size)(diff);

  return _.map(diff, d => {
    _.set(d, 'lastCommitDateFormatted', _.padStart(d.lastCommitDateFormatted, widestDateLength));
    _.set(d, 'ahead_by', _.padEnd(`+${d.ahead_by}`, 4));
    _.set(d, 'behind_by', _.padStart(`-${d.behind_by}`, 4));

    return d;
  });
}

function formatDate(date) {
  return relativeTime(new Date(date));
}
