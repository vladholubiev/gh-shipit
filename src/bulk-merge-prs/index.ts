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
  const items = [...items1, ...items2];

  console.log(items.length);
}
