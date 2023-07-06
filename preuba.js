/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import chalk from 'chalk';
import fs from 'fs';
import { marked } from 'marked';
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import path from 'path';

// ------------ DIRECTORIO Y DONDE SE ALMACENARÁN FILES .md
const mainDirectory = './tryOut';

// ---------- FUNCIONES PURAS
// PATH ABSOLUTA
export function convertAbsolute(pathUser) {
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  }
  return path.resolve(pathUser);
}

// ES UN ARCHIVO
export function isFile(pathUser) {
  const stats = fs.statSync(pathUser);
  return stats.isFile();
}

// ES UN ARCHIVO .md
export function isMd(file) {
  return (path.extname(file) === '.md');
}

// ES UN ARCHIVO .md
export function isNotMd(file) {
  return (path.extname(file) !== '.md');
}

// ES UN DIRECTORIO
export function isDirectory(pathUser) {
  const stats = fs.statSync(pathUser);
  return stats.isDirectory();
}

// ARCHIVOS DENTRO DIRECTORIO
export function filesDir(directory) {
  const files = fs.readdirSync(directory, 'utf-8');
  return files;
}

// HACER PATH ABSOLUTA
export function pathAbsolut(directory, pathUser) {
  const filePath = path.join(directory, pathUser);
  return filePath;
}

// .md A HTML
export function convertToHtml(markdownContent) {
  const html = marked(markdownContent, { headerIds: false, mangle: false }); // convierte HTML
  const dom = new JSDOM(html); // creación de instancia DOM del HTML
  const { document } = dom.window; // se ingresa al DOM
  return document;
}

// LINKS VALID FALSE
export function getLinksFalse(dom, file) {
  const linksFalse = Array.from(dom.querySelectorAll('a')).map((element) => ({
    href: element.href,
    text: element.textContent.trim(),
    file,
  }));
  return linksFalse;
}

// LINKS VALID TRUE
export function getLinksTrue(dom, file) {
  const linksFalse = Array.from(dom.querySelectorAll('a')).map((element) => ({
    href: element.href,
    text: element.textContent.trim(),
    file,
    status: 0,
    ok: '',
  }));
  return linksFalse;
}

// --------------- GET FILES
function getFiles2(directory, array) {
  const absolute = convertAbsolute(directory);
  return new Promise((resolve, reject) => { // se crea promesa
    try {
      if (isFile(absolute) && isMd(absolute)) {
        array.push(absolute); // directo al array si el path es archivo .md
        resolve();
      }
      if (isFile(absolute) && isNotMd(absolute)) {
        reject(chalk.bgRedBright.bold(' ERROR: Tu archivo no es .md '));
      }

      // si el path proporcionado por el usuario es un directorio
      filesDir(absolute).forEach((file) => {
        const filePath = pathAbsolut(absolute, file); // obtiene ruta absoluta
        try {
          if (isFile(filePath) && isMd(file)) {
            array.push(filePath); // al array si es archivo .md
            // console.log(chalk.blue(filePath));
          } else if (isDirectory(filePath)) {
            getFiles2(filePath, array); // si es un directorio se hace recursiva
          }
        } catch (err) {
          console.error(chalk.bgRedBright.bold(err)); // error al leer cada archivo
        }
      });
      resolve(); // si se cumple lo anterior, se resuelve la promesa
    } catch (err) {
      if (err.code === 'ENOENT') { // se rechaza la promesa en error
        reject(chalk.bgRedBright.bold(' ERROR: Tu ruta no se encontró, revisa si es correcta '));
      }
    }
  });
}

// ------------ MDLINKS (BUSCAR LINKS DENTRO DE CADA ARCHIVO)
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
