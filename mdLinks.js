// ----------- IMPORTAR LIBRERÍAS
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import { marked } from 'marked';
// import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

// ------------ IMPORTAR FUNCIONES NECESARIAS
import getFiles from './getFiles.js';

// ------------ DIRECTORIO Y DONDE SE ALMACENARÁN FILES .md
const mainDirectory = './tryOut/file11.md';
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
function mdlinks(files) { // parámetro archivos .md
  if (files.length === 0) {
    return console.error(chalk.bgRedBright.bold(' ERROR: No se encontró ningún archivo .md '));
  }
  return Promise.all( // trabaja con el array de promesas que se va a crear
    files.map((content) => new Promise((resolve, reject) => { // creación array de promesas de files
      fs.readFile(content, 'utf-8', (error, markdownContent) => { // lee cada archivo
        if (error) { // en caso de error
          reject(chalk.bgRedBright.bold(error));
          return;
        }

        // si se leen correctamente
        const html = marked(markdownContent, { headerIds: false, mangle: false }); // convierte HTML

        // const $ = cheerio.load(html); // carga html en cheerio
        // const links = []; // array donde guardarán links
        // $('a').each((index, element) => { // por cada etiqueta a
        // const link = $(element).attr('href'); // obtiene el enlace
        // links.push(link); // guarda en array de links
        // });

        const dom = new JSDOM(html); // creación de instancia DOM del HTML
        const { document } = dom.window; // se ingresa al DOM
        const links = Array.from(document.querySelectorAll('a')).map((element) => element.href); // array de links

        console.log(chalk.bold('Enlaces encontrados en: '), chalk.underline(content));
        // console.log(chalk.red(links));

        if (links.length === 0) {
          console.log(chalk.bold.red('Este archivo no tiene links'));
        }

        Promise.all( // trabaja con el array de promesas que se va a crear
          links.map((linki) => new Promise((resolved) => { // creación de array de promesas de links
            resolved(console.log(chalk.blue(linki)));
            // ejecutar como resuelta promesas de links cuando termine
          })),
        ).then(() => {
          resolve(console.log('')); // ejecutar como resuelta promesas de files cuando termine
        }).catch((errors) => {
          reject(chalk.bgRedBright.bold(errors)); // error en promesas de files, ejecutar error
        });
      });
    })),
  ).then(() => {
    console.log('Proceso finalizado'); // saber que finalizó la función
  });
}

function executeFunctions() {
  (getFiles(mainDirectory, filesArray)).then(
    () => mdlinks(filesArray), // Si la función 1 tuvo éxito, entonces ejecuta la función 2
  ).catch((error) => {
    console.error(chalk.bgRedBright.bold(error));
  });
}

executeFunctions();

/* mdlinks.then((result) => {
  console.log(result);
}); */
