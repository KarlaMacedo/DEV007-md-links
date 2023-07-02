import chalk from 'chalk';

import getFiles from './getFiles.js';

const mainDirectory = './tryOut';
const filesArray = [];

// Uso:
console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray));

const mdlinks = () => {

};

mdlinks.then((result) => {
  console.log(result);
});
