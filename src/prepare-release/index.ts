import logSymbols from 'log-symbols';
import {assignReleaseLabelToPR, createReleaseLabel} from '@shelf/gh-sdk';
import {hasReleaseLabel} from './helpers-labels';
import {
  createReleaseBranch,
  createReleaseNotes,
  createReleasePR,
  getLastDevelopCommitSHA,
} from './github';
import {askNewReleaseVersion, askReleaseTitle, askToOpenPR} from './inquirer';

export async function prepareRelease({org, repo}) {
  try {
    const version = await askNewReleaseVersion({org, repo});
    const commitHash = await getLastDevelopCommitSHA({org, repo});

    await createReleaseBranch({org, repo, version, commitHash});
    console.log(logSymbols.success, `Created branch release/v${version}!`);

    const releaseTitle = await askReleaseTitle({org, repo});

    await createReleaseNotes({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Release Notes!`);

    const {number} = await createReleasePR({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Pull Request #${number}!`);

    if (!(await hasReleaseLabel({org, repo}))) {
      console.log(logSymbols.warning, `No Release Label Found`);

      await createReleaseLabel(org, repo);
      console.log(logSymbols.success, `Created Release Label!`);
    }

    await assignReleaseLabelToPR(org, repo, number);
    console.log(logSymbols.success, `Assigned Release Label to PR #${number}!`);

    await askToOpenPR({org, repo, pr: number});
  } catch (error) {
    console.log(logSymbols.error, error.message);
  }
}
