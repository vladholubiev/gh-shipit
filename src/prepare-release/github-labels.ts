import _ from 'lodash';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';

export async function getRepoLabels({org, repo}) {
  const gh = getClient();
  const {data} = await gh.issues.listLabelsForRepo({owner: org, repo, per_page: 100});

  return _.map(data, 'name');
}

export async function createReleaseLabel({org, repo}) {
  const gh = getClient();
  const {data} = await gh.issues.createLabel({owner: org, repo, name: 'release', color: 'ff0000'});

  return data;
}

export async function assignReleaseLabel({org, repo, pr}) {
  const gh = getClient();
  const {data} = await gh.issues.addLabels({owner: org, repo, labels: ['release'], number: pr});

  return data;
}
