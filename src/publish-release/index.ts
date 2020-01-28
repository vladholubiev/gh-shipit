const logSymbols = require('log-symbols');
const {print1Release} = require('../view-releases/print');
const {publishDraftRelease, mergePR, deleteBranch} = require('./github');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('./inquirer');

export async function publishRelease({org, repo}) {
  try {
    const {version, releaseId} = await askDraftReleaseVersion({org, repo});
    const prNumber = await askDraftReleasePRNumber({org, repo, version});

    console.log(
      logSymbols.info,
      `You are about to publish release ${version} and merge PR to master`
    );

    const {name, published_at} = await publishDraftRelease({org, repo, releaseId});
    console.log(logSymbols.success, `Release ${version} published`);

    await mergePR({org, repo, number: prNumber});
    console.log(logSymbols.success, `Pull request merged to master`);

    await deleteBranch({org, repo, name: `release/${version}`});
    console.log(logSymbols.success, `Deleted release branch`);

    print1Release({name, repo, date: new Date(published_at), version});
  } catch (error) {
    console.log(logSymbols.error, error.message);
  }
}
