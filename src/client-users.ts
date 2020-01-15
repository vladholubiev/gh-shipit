import _ from 'lodash';
import {getClient} from './client';

export async function getUserOrgs() {
  const gh = getClient();
  const orgs = await gh.orgs.listForAuthenticatedUser();
  const orgNames = _.map(orgs.data, 'login');

  return orgNames.sort();
}
