#!/usr/bin/env node

const inquirer = require('inquirer');
const {getUserOrgs, getBranchDiff} = require('./repos');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'org',
      message: 'Select organization',
      choices() {
        return getUserOrgs();
      }
    }
  ])
  .then(async ({org}) => {});
