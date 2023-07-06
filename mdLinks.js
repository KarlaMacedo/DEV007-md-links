import chalk from 'chalk';

import { getFilesRecursively, processMarkdownFile, processMarkdownFileWithStatus } from './functions.js';
// ------------ DIRECTORIO Y DONDE SE ALMACENARÁN FILES .md
const mainDirectory = './tryOut/';

// FUNCIÓN PRINCIPAL DE ENLACE
function mdlinks(path, options) {
  const filesArray = getFilesRecursively(path);

  if (filesArray.length === 0) {
    console.error(chalk.bgRedBright.bold('ERROR: No se encontró ningún archivo .md'));
    return;
  }

  const promises = filesArray.map((file) => {
    if (options === false) {
      return processMarkdownFile(file, options);
    } if (options === true) {
      return processMarkdownFileWithStatus(file);
    }
    return Promise.reject(new Error(chalk.bgRedBright.bold('La opción que elegiste no es válida')));
  });

  Promise.all(promises)
    .then((results) => {
      results.forEach((links) => {
        if (links && links.length > 0 && links[0].file) {
          console.log('');
          console.log(chalk.bold('Links encontrados en: '), chalk.underline(links[0].file));

          if (links.length === 0) {
            console.log(chalk.bold.red('Este archivo no tiene links'));
            console.log('');
          }

          links.forEach((link) => {
            console.log('href: ', chalk.magenta(link.href));
            console.log('text: ', chalk.magenta(link.text));
            if (link.status) {
              console.log('status: ', chalk.blue(link.status));
              console.log('ok: ', chalk.blue(link.ok));
            }
            console.log('');
          });
        }
      });
      console.log('Proceso finalizado');
    })
    .catch((error) => {
      console.error(chalk.bgRedBright.bold(error));
    });
}

try {
  mdlinks(mainDirectory, true);
} catch (error) {
  console.error(chalk.bgRedBright.bold(error));
}
