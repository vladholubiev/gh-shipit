const boxen = require('boxen');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);

export function verifyToken() {
  const {GITHUB_TOKEN} = process.env;

  if (GITHUB_TOKEN && GITHUB_TOKEN.length === 40) {
    return debug('[ok] GITHUB_TOKEN found in process.env');
  }

  debug('No GITHUB_TOKEN was found');

  console.log(
    boxen(
      `
    To use this CLI you need to set GITHUB_TOKEN as environment variable

    Follow the steps:

    - Go to https://github.com/settings/tokens/new?scopes=admin:org,repo&description=gh-shipit-cli
    - Click "Generate Token"
    - echo "export GITHUB_TOKEN=XXXXX" >> ~/.bashrc
  `.trim(),
      {
        align: 'left',
        float: 'center',
        borderColor: 'magenta',
        padding: 1,
      }
    )
  );

  return process.exit(0);
}
