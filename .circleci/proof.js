#! /usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const getStorybookUrl = require('./get-storybook-url');

const user =
  process.env.CIRCLE_PR_USERNAME || process.env.CIRCLE_PROJECT_USERNAME;
const repo =
  process.env.CIRCLE_PR_REPONAME || process.env.CIRCLE_PROJECT_REPONAME;

function main() {
  const url = getStorybookUrl();

  execSync(
    `yarn ds proof -u ${url} --remote --browser-name chrome --browser-platform mac`,
    { stdio: 'inherit' }
  );
}
