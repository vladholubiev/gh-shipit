import {prompt} from 'enquirer';
import {orderBy} from 'lodash';
import logSymbols from 'log-symbols';
import {getClient} from '../client';

export async function bulkMergePRs(org: string): Promise<void> {
  const gh = await getClient();
  const [
    {
      data: {items: items1}
    },
    {
      data: {items: items2}
    }
  ] = await Promise.all([
    gh.search.issuesAndPullRequests({
      q: `is:open is:pr archived:false user:${org} renovate`,
      per_page: 100,
      page: 1
    }),
    gh.search.issuesAndPullRequests({
      q: `is:open is:pr archived:false user:${org} renovate`,
      per_page: 100,
      page: 2
    })
  ]);
  const items = orderBy([...items1, ...items2], ['title'], ['asc']);

  const {prsToMerge} = await prompt({
    type: 'autocomplete',
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    multiple: true,
    name: 'prsToMerge',
    message: 'Pick a PR',
    choices: items.map(item => {
      const [_, repoWithPrNumber] = item.url.split(`/${org}/`);
      const [repo, prNumber] = repoWithPrNumber.split('/issues/');

      return `#${prNumber} [${repo}]: ${item.title}`;
    })
  });

  for (const prToMerge of prsToMerge) {
    const {prNumber, repo} = /#(?<prNumber>\d+) \[(?<repo>.+)\]/gi.exec(prToMerge).groups;

    try {
      await gh.pulls.merge({
        repo,
        pull_number: Number(prNumber),
        owner: org,
        merge_method: 'merge'
      });
      console.log(`${logSymbols.success} Merged PR #${prNumber} in ${repo}`);
    } catch (error) {
      console.error(
        `${logSymbols.error} Failed to merge PR #${prNumber} in ${repo}: ${error.message} https://github.com/${org}/${repo}/pulls/${prNumber}`
      );
    }
  }
}
