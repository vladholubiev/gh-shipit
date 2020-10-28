import {getRepoLabels} from '@shelf/gh-sdk';

export async function hasReleaseLabel({org, repo}): Promise<boolean> {
  const labels = await getRepoLabels(org, repo);

  return labels.includes('release');
}
