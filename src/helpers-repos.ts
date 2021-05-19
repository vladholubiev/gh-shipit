import {getRepoBranches} from './client-repos';

export async function hasMasterAndDevelop({org, repo}) {
  const branches = await getRepoBranches({org, repo});

  return branches.includes('develop') && branches.includes('master');
}
