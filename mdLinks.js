import chalk from 'chalk';

import {
  getFilesRecursively, processMarkdownFile, processMarkdownFileWithStatus, truncateText,
} from './functions.js';

// FUNCIÓN PRINCIPAL DE ENLACE
export default function mdLinks(path, options) {
  console.log(chalk.bold.italic('La ruta que proporcionaste fue: ') + chalk.bgBlue(path));
  const filesArray = getFilesRecursively(path);

  if (filesArray.length === 0) {
    console.error(chalk.bgRedBright.bold(' ERROR: No se encontró ningún archivo .md '));
    return;
  }

  const promises = filesArray.map((file) => { // array de promesas
    if (options === false) {
      return processMarkdownFile(file);
    } if (options === true) {
      return processMarkdownFileWithStatus(file);
    }
    return Promise.reject(new Error(chalk.bgRedBright.bold(' La opción que elegiste no es válida ')));
  });

  Promise.all(promises) // si se resuelven todas las promesas
    .then((results) => {
      results.forEach((links) => { // para cada link
        if (links && links.length > 0 && links[0].file) {
          console.log('');
          console.log(chalk.bold('Links encontrados en: '), chalk.underline(links[0].file));

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
}
