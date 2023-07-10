import chalk from 'chalk';

import {
  getFilesRecursively, processMarkdownFile, processMarkdownFileWithStatus,
} from './functions.js';

// FUNCIÓN PRINCIPAL DE ENLACE
export default function mdLinks(path, options) {
  console.log(chalk.bold.italic('La ruta que proporcionaste fue: ') + chalk.bgBlue(path));

  const filesArray = getFilesRecursively(path);

  if (filesArray.length === 0) {
    return Promise.reject(new Error(chalk.bgRedBright.bold(' No se encontró ningún archivo .md ')));
  }

  const promises = filesArray.map((file) => { // array de promesas
    if (options === false) {
      return processMarkdownFile(file);
    } if (options === true) {
      return processMarkdownFileWithStatus(file);
    }
    return Promise.reject(new Error(chalk.bgRedBright.bold(' La opción que elegiste no es válida ')));
  });
  return Promise.all(promises);
}
