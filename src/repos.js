const _ = require('lodash');
const {getClient} = require('./client');

async function getUserOrgs() {
  const gh = getClient();
  const orgs = await gh.users.getOrgs();

  return _.map(orgs.data, 'login');
}

module.exports = {
  getUserOrgs
};
