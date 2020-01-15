import _ from 'lodash';
import {getClient} from './client';

module.exports.getUserOrgs = async function() {
  const gh = getClient();
  const orgs = await gh.orgs.listForAuthenticatedUser();
  const orgNames = _.map(orgs.data, 'login');

  return orgNames.sort();
};
