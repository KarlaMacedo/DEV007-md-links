import chalk from 'chalk';

import mdLinks from './mdlinks.js';
import { getStats, getStatsValidate, truncateText } from './functions.js';

// ------------ VARIABLES
const path = process.argv[2];
const options = process.argv;
const validate = !!options.includes('--validate');
const stats = !!options.includes('--stats');

try {
  mdLinks(path, validate)
    .then((results) => {
      results.forEach((links) => { // para cada link
        if (links && links.length > 0 && links[0].file) {
          console.log('');
          console.log(chalk.bold('Archivo: '), chalk.underline(links[0].file));

          if (stats) {
            console.log(chalk.hex('#FFA500')('Estadística del archivo:'));
            const onlyStats = getStats(links);
            console.log('Total: ', chalk.blue(onlyStats.Total));
            console.log('Unique: ', chalk.blue(onlyStats.Unique));
          }
          if (stats && validate) {
            const statsValidate = getStatsValidate(links);
            console.log('Broken: ', chalk.red(statsValidate.Broken));
            console.log('Successfull: ', chalk.green(statsValidate.Successfull));
          }
          console.log('');
          console.log(chalk.hex('#FFA500')('Links del archivo:'));

          links.forEach((link) => {
            console.log('href: ', chalk.underline.blue(link.href));
            console.log('text: ', chalk.blue(truncateText(link.text)));
            if (link.ok === 'OK ✔') {
              console.log('status: ', chalk.green(link.status));
              console.log('ok: ', chalk.green(link.ok));
            }
            if (link.ok === 'Fail ✘') {
              console.log('status: ', chalk.red(link.status));
              console.log('ok: ', chalk.red(link.ok));
            }
            console.log('');
          });
        }
      });

      console.log(chalk.bold.italic('Proceso finalizado'));
    })
    .catch((error) => {
      console.error(chalk.bgRedBright.bold(error));
    });
} catch (error) {
  console.error(chalk.bgRedBright.bold(error));
}
