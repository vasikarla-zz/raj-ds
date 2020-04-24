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
    `yarn ds proof -u ${url} --add-all --a11y --headless --skip-tests || true`,
    { stdio: 'inherit' }
  );

  const proofJSON = JSON.parse(
    fs.readFileSync('proof-a11y.json', { encoding: 'utf-8' })
  );

  const lines = [['Test', 'Violations'], ['----', '----']];
  let violations = false;

  proofJSON.forEach(test => {
    if (test.violations.length === 0) {
      return;
    }
    violations = true;
    const name = `${test.kind}/${test.story}`;
    lines.push([name.replace(/\|/g, '\\|'), test.violations.length]);
  });

  if (violations) {
    const table = lines.map(cols => `| ${cols.join(' | ')} |`).join('\n');
    const message = `## ☠️ Accessibility Violations ☠️\n\n${table}`;

    execSync(
      `npx auto comment --context 'Proof A11Y' --message \"${message}\"`,
      { stdio: 'inherit' }
    );
    process.exit(1);
  } else {
    execSync(
      `npx auto comment --context 'Proof A11Y' --message \"## 🥳 No Accessibility Violations Found 🥳\"`,
      { stdio: 'inherit' }
    );
  }
}

main();
