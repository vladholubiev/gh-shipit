import {prompt} from 'enquirer';
import {orderBy} from 'lodash';
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

  const prsToMerge = await prompt({
    type: 'autocomplete',
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    multiple: true,
    name: 'prNumber',
    message: 'Pick a PR',
    choices: items.map(item => {
      const [_, repoWithPrNumber] = item.url.split(`/${org}/`);
      const [repo, prNumber] = repoWithPrNumber.split('/issues/');

      return {
        name: `${repo}: ${item.title}`,
        value: `${repo}/${prNumber}`
      };
    })
  });

  console.log(items.length);
  console.log(prsToMerge);
}
