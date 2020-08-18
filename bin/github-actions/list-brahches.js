/* eslint-disable no-console */

/*
 * USAGE:
 *  node list-branches [OPTION]
 *
 * OPTIONS:
 *  --disused : Return disused branches (default)
 *  --illegal : Return illegal named branches
 */

const { execSync } = require('child_process');

const EXCLUDE_TERM_DAYS = 14;
const EXCLUDE_PATTERNS = [
  /feat\/custom-sidebar-2$/,
  // https://regex101.com/r/Lnx7Pz/2
  /dev\/[\d.x]*$/,
];
const LEGAL_PATTERNS = [
  /^origin\/master$/,
  // https://regex101.com/r/p9xswM/3
  /^origin\/(dev|feat|imprv|support|fix|rc|release|tmp)\/.+$/,
];

class BranchSummary {

  constructor(line) {
    const splitted = line.split('\t'); // split with '%09'

    this.authorDate = new Date(splitted[0].trim());
    this.authorName = splitted[1].trim();
    this.refName = splitted[2].trim();
    this.subject = splitted[3].trim();
  }

}

function getExcludeTermDate() {
  const date = new Date();
  date.setDate(date.getDate() - EXCLUDE_TERM_DAYS);
  return date;
}

function getBranchSummaries() {
  // exec git for-each-ref
  const out = execSync(`\
    git for-each-ref refs/remotes \
      --sort=-committerdate \
      --format='%(authordate:iso) %09 %(authorname) %09 %(refname:short) %09 %(subject)'
  `).toString();

  // parse
  const summaries = out
    .split('\n')
    .filter(v => v !== '') // trim empty string
    .map(line => new BranchSummary(line))
    .filter((summary) => { // exclude branches that matches to patterns
      return !EXCLUDE_PATTERNS.some(pattern => pattern.test(summary.refName));
    });

  return summaries;
}

async function main(mode) {
  const summaries = getBranchSummaries();

  let filteredSummaries;

  switch (mode) {
    case 'illegal':
      filteredSummaries = summaries
        .filter((summary) => { // exclude branches that matches to patterns
          return !LEGAL_PATTERNS.some(pattern => pattern.test(summary.refName));
        });
      break;
    default: {
      const excludeTermDate = getExcludeTermDate();
      filteredSummaries = summaries
        .filter((summary) => {
          return summary.authorDate < excludeTermDate;
        });
      break;
    }
  }

  console.log(filteredSummaries);
}

const args = process.argv.slice(2);

let mode = 'disused';
if (args.length > 0 && args[0] === '--illegal') {
  mode = 'illegal';
}

main(mode);
