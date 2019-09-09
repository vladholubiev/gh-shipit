const {getRepoBranches} = require('./client-repos');

module.exports.hasMasterAndDevelop = async function({org, repo}) {
  const branches = await getRepoBranches({org, repo});

  return branches.includes('develop') && branches.includes('master');
};
