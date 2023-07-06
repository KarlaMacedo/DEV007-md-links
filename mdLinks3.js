/* eslint-disable no-unused-vars */
import chalk from 'chalk';
import fs from 'fs';

import getFiles2 from './getFiles2.js';
import { convertToHtml, getLinksFalse, getLinksTrue } from './functions.js';

function mdlinks(path, options) {
  const filesArray = [];
  (getFiles2(path, filesArray)).then(
    () => {
      if (filesArray.length === 0) {
        return console.error(chalk.bgRedBright.bold(' ERROR: No se encontró ningún archivo .md '));
      }
      return Promise.all( // trabaja con el array de promesas que se va a crear
        filesArray.map((content) => new Promise((resolve, reject) => {
          fs.readFile(content, 'utf-8', (error, markdownContent) => { // lee cada archivo
            if (error) { // en caso de error
              reject(chalk.bgRedBright.bold(error));
              return;
            }

            // si se leen correctamente
            const document = convertToHtml(markdownContent);

            if (options === false) {
              const option = {
                validate: options,
              };

              const linksFalse = getLinksFalse(document, content);

              console.log('');
              console.log(chalk.bold('Links encontrados en: '), chalk.underline(content));

              if (linksFalse.length === 0) {
                console.log(chalk.bold.red('Este archivo no tiene links'));
                console.log('');
              }

              linksFalse.forEach((element) => {
                console.log('href: ', chalk.magenta(element.href));
                console.log('text: ', chalk.magenta(element.text));
                console.log('');
              });
            }

            if (options && options !== false && options !== true) {
              reject(new Error(chalk.bgRedBright.bold('La opción que elegiste no es válida ')));
              return;
            }

            if (!options && options !== false) {
              const option = {
                validate: undefined,
              };

              reject(new Error(chalk.bgRedBright.bold('No elegiste ninguna opción ')));
              return;
            }

            if (options === true) {
              const option = {
                validate: options,
              };

              const linksTrue = getLinksTrue(document, content);

              console.log('');
              console.log(chalk.bold('Links encontrados en: '), chalk.underline(content));

              if (linksTrue.length === 0) {
                console.log(chalk.bold.red('Este archivo no tiene links'));
                console.log('');
              }

              linksTrue.forEach((element) => {
                console.log('href: ', chalk.blue(element.href));
                console.log('text: ', chalk.blue(element.text));
                console.log('status: ', chalk.blue(element.status));
                console.log('ok: ', chalk.blue(element.ok));
                console.log('');
              });
            }
          });
        })),
      ).then(() => {
        console.log('Proceso finalizado'); // saber que finalizó la función
      });
    }, // Si la función 1 tuvo éxito, entonces ejecuta la función 2
  ).catch((error) => {
    console.error(chalk.bgRedBright.bold(error));
  });
}

const mainDirectory = './tryOut';
// mdlinks(mainDirectory, false);

try {
  mdlinks(mainDirectory, true)
    .then(() => {
      console.log(chalk.bgGreenBright.bold('mdlinks completada'));
    })
    .catch((error) => {
      chalk.bgRedBright.bold(error);
    });
} catch (error) {
  chalk.bgRedBright.bold(error);
}
