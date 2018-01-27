#!/usr/bin/env node

const inquirer = require('inquirer');
const {getUserOrgs} = require('./repos');

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
  .then(answers => {
    console.log(answers);
  });
