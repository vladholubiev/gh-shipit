import logSymbols from 'log-symbols';
import {mergePR} from '@shelf/gh-sdk';
import {deleteBranch, publishDraftRelease} from './github';
import {askDraftReleasePRNumber, askDraftReleaseVersion} from './inquirer';

export async function publishRelease({org, repo}) {
  try {
    const {version, releaseId} = await askDraftReleaseVersion({org, repo});
    const prNumber = await askDraftReleasePRNumber({org, repo, version});

    console.log(
      logSymbols.info,
      `You are about to publish release ${version} and merge PR to master`
    );

    await publishDraftRelease({org, repo, releaseId});
    console.log(logSymbols.success, `Release ${version} published`);

    await mergePR({owner: org, repo, pr: Number(prNumber)});
    console.log(logSymbols.success, `Pull request merged to master`);

    await deleteBranch({org, repo, name: `release/${version}`});
    console.log(logSymbols.success, `Deleted release branch`);
  } catch (error) {
    console.log(logSymbols.error, error.message);
  }
}
