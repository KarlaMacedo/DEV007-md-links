import argv from 'node:process';
import chalk from 'chalk';

import mdLinks from './mdlinks.js';

// ------------ VARIABLES
const path = argv.argv[2];
const options = true;

try {
  mdLinks(path, options);
} catch (error) {
  console.error(chalk.bgRedBright.bold(error));
}
