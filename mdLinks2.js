/* eslint-disable no-unused-vars */
// ----------- IMPORTAR LIBRERÍAS
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
// import { marked } from 'marked';
// import cheerio from 'cheerio';
// import { JSDOM } from 'jsdom';
import axios from 'axios';

// ------------ IMPORTAR FUNCIONES NECESARIAS
import getFiles2 from './getFiles2.js';
import { convertToHtml, getLinksFalse, getLinksTrue } from './functions.js';

// ------------ DIRECTORIO Y DONDE SE ALMACENARÁN FILES .md
const mainDirectory = './tryOut';
const filesArray = [];

// ----------- FUNCIÓN GET FILES .md
/* console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(`
          `);
console.log(chalk.bgRed(typeof getFiles(mainDirectory, filesArray)));
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray));
console.log(`
          `);

mdlinks(filesArray); */

// ------------ MDLINKS (BUSCAR LINKS DENTRO DE CADA ARCHIVO)
function mdlinks(path, options) { // parámetro archivos .md
  if (path.length === 0) {
    return console.error(chalk.bgRedBright.bold(' ERROR: No se encontró ningún archivo .md '));
  }
  return Promise.all( // trabaja con el array de promesas que se va a crear
    path.map((content) => new Promise((resolve, reject) => { // creación array de promesas de files
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
}

function executeFunctions() {
  (getFiles2(mainDirectory, filesArray)).then(
    () => mdlinks(filesArray, true), // Si la función 1 tuvo éxito, entonces ejecuta la función 2
  ).catch((error) => {
    console.error(chalk.bgRedBright.bold(error));
  });
}

executeFunctions();

/* mdlinks.then((result) => {
  console.log(result);
}); */
