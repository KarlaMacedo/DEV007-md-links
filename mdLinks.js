// importar librerías
import chalk from 'chalk';

// importar funciones
import {
  getFilesRecursively, processMarkdownFile, processMarkdownFileWithStatus,
} from './functions.js';

// FUNCIÓN PRINCIPAL DE ENLACE
export default function mdLinks(path, options) {
  console.log(chalk.bold.italic('The path you provided was: ') + chalk.bgBlue(path));

  const filesArray = getFilesRecursively(path);

  if (filesArray.length === 0) {
    return Promise.reject(new Error(chalk.bgRedBright.bold(' No .md file found ')));
  }

  const promises = filesArray.map((file) => { // array de promesas
    if (options === false) {
      return processMarkdownFile(file);
    } if (options === true) {
      return processMarkdownFileWithStatus(file);
    }
    return Promise.reject(new Error(chalk.bgRedBright.bold(' The option you chose is not valid ')));
  });
  return Promise.all(promises);
}
