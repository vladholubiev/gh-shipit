import {prompt} from 'enquirer';
import {orderBy, sum} from 'lodash';
import logSymbols from 'log-symbols';
import pMap from 'p-map';
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
  const items = orderBy([...items1, ...items2], ['updated_at'], ['desc']);

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

  const failedToMergePRsURLs = [];

  const mergedPrsCounts = await pMap(
    prsToMerge,
    async (prToMerge: string) => {
      const {prNumber, repo} = /#(?<prNumber>\d+) \[(?<repo>.+)\]/gi.exec(prToMerge).groups;

      try {
        await gh.pulls.createReview({
          owner: org,
          repo,
          event: 'APPROVE',
          pull_number: Number(prNumber)
        });
        console.log(`${logSymbols.info} Approved PR #${prNumber} in ${repo}`);

        await gh.pulls.merge({
          repo,
          pull_number: Number(prNumber),
          owner: org,
          merge_method: 'merge'
        });
        console.log(`${logSymbols.success} Merged PR #${prNumber} in ${repo}`);

        return 1;
      } catch (error) {
        console.error(
          `${logSymbols.error} Failed to merge PR #${prNumber} in ${repo}: ${error.message}`
        );

        failedToMergePRsURLs.push(`https://github.com/${org}/${repo}/pull/${prNumber}`);

        return 0;
      }
    },
    {concurrency: 10}
  );

  console.log(`\n${logSymbols.success} Merged ${sum(mergedPrsCounts)} PRs!`);
  console.log(`\n${logSymbols.error} Failed to merge ${failedToMergePRsURLs.length} PRs!`);
  console.log(failedToMergePRsURLs.join('\n'));
}
