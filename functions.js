/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import marked from 'marked';
import { JSDOM } from 'jsdom';
import path from 'path';
import axios from 'axios';

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
  const infoFile = fs.statSync(pathUser);
  return infoFile.isFile();
}

// ES UN ARCHIVO .md
export function isMd(file) {
  return (path.extname(file) === '.md');
}

// NO ES UN ARCHIVO .md
export function isNotMd(file) {
  return (path.extname(file) !== '.md');
}

// ES UN DIRECTORIO
export function isDirectory(pathUser) {
  const infoDir = fs.statSync(pathUser);
  return infoDir.isDirectory();
}

// ARCHIVOS DENTRO DIRECTORIO
export function filesDir(directory) {
  const files = fs.readdirSync(directory, 'utf-8');
  return files;
}

// UNIR PATHS ARCHIVOS DIRECTORIO
export function unionPaths(directory, pathUser) {
  const filePathComplete = path.join(directory, pathUser);
  return filePathComplete;
}

// .md A HTML
export function convertToHtml(markdownContent) {
  const html = marked(markdownContent, { headerIds: false, mangle: false }); // convierte HTML
  const dom = new JSDOM(html); // creación de instancia DOM del HTML
  const { document } = dom.window; // se ingresa al objeto DOM
  return document;
}

// LINKS VALID FALSE
export function getLinksFalse(dom, file) {
  const linksFalse = Array.from(dom.querySelectorAll('a')).map((element) => ({
    href: element.href,
    text: element.textContent.trim(),
    file,
  }));
  if (linksFalse.length === 0) {
    console.log('');
    console.log(chalk.bold('Links encontrados en: '), chalk.underline(file));
    console.log(chalk.bold.red('Este archivo no tiene links'));
    console.log('');
  }
  return linksFalse;
}

// LINKS VALID TRUE
export function getLinksTrue(dom, file) {
  const linksTrue = Array.from(dom.querySelectorAll('a')).map((element) => ({
    href: element.href,
    text: element.textContent.trim(),
    file,
    status: 10,
    ok: '',
  }));
  if (linksTrue.length === 0) {
    console.log('');
    console.log(chalk.bold('Links encontrados en: '), chalk.underline(file));
    console.log(chalk.bold.red('Este archivo no tiene links'));
    console.log('');
  }
  return linksTrue;
}

// HTTP REQUEST
export function getStatusCode(url) {
  return axios.get(url)
    .then((response) => response.status) // status OK
    .catch((error) => {
      if (error.response) { // status Fail
        return error.response.status;
      }
      throw error; // si no es un error por el status, manda el error
    });
}

// OBTENER ARCHIVOS RECURSIVAMENTE
export function getFilesRecursively(pathUser) {
  const absolutePath = convertAbsolute(pathUser);
  const filesArray = [];

  function getFilesRecurs(dir) {
    const files = filesDir(dir);
    files.forEach((file) => {
      const filePath = unionPaths(dir, file);
      if (isFile(filePath) && isMd(file)) {
        filesArray.push(filePath);
      } else if (isDirectory(filePath)) {
        getFilesRecurs(filePath);
      }
    });
  }

  if (isFile(absolutePath) && isMd(absolutePath)) {
    filesArray.push(absolutePath);
  }

  if (isDirectory(absolutePath)) {
    getFilesRecurs(absolutePath);
  }
  return filesArray;
}

// LEER .md Y OBTENER LINKS
export function processMarkdownFile(filePath) {
  return new Promise((resolve, reject) => { // se crea promesa
    fs.readFile(filePath, 'utf-8', (error, markdownContent) => { // leer archivo
      if (error) { // en caso de error
        reject(chalk.bgRedBright.bold(error));
        return;
      }

      const document = convertToHtml(markdownContent);

      console.log(chalk.yellow.underline('document'));

      const linksFalse = getLinksFalse(document, filePath);

      resolve(linksFalse);
    });
  });
}

// LEER .md Y OBTENER LINKS CON SU STATUS
export function processMarkdownFileWithStatus(filePath) {
  return new Promise((resolve, reject) => { // promesa principal
    fs.readFile(filePath, 'utf-8', (error, markdownContent) => { // leer archivo
      if (error) { // si hay error al leer archivo
        reject(chalk.bgRedBright.bold(error));
        return;
      }

      // si se lee bien el archivo...
      const document = convertToHtml(markdownContent);
      const links = getLinksTrue(document, filePath); // array de links

      const promises = links.map((link) => { // declara array de promesas de la obtención de status
        const objectLink = { ...link };// Crear copia de c/objeto link

        return getStatusCode(link.href) // devuelve las promesas de obtener status
          .then((statusCode) => {
            objectLink.status = statusCode;
            // condicionales segun el status del link
            if (statusCode >= 100 && statusCode < 200) {
              objectLink.ok = 'Informational';
            } else if (statusCode >= 200 && statusCode < 300) {
              objectLink.ok = 'OK ✔';
            } else if (statusCode >= 300 && statusCode < 400) {
              objectLink.ok = 'Redirect';
            } else if (statusCode >= 400 && statusCode < 500) {
              objectLink.ok = 'Fail ✘';
            } else if (statusCode >= 500 && statusCode < 600) {
              objectLink.ok = 'Fail ✘';
            } else {
              objectLink.ok = 'Unknown';
            }
            return objectLink;
          })
          .catch((error) => {
            objectLink.status = 'Error';
            objectLink.ok = 'Fail ✘';
            return objectLink;
          });
      });

      Promise.all(promises) // se espera que las promesas de status se resuelvan
        .then((objectLinks) => {
          resolve(objectLinks); // resuelve promesa principal
        })
        .catch((error) => { // error de promesa principal
          reject(error);
        });
    });
  });
}

// TRUNCAR TEXTO 50 CARACTERES
export function truncateText(text) {
  if (text.length <= 50) {
    return text;
  }
  return `${text.slice(0, 50)}...`;
}

// CONTAR LINKS
export function countLinks(links) {
  return links.length;
}

// CONTAR LINKS ROTOS
export function countBroken(links) {
  let broken = 0;
  links.forEach(
    (link) => {
      if (link.ok === 'Fail ✘') {
        broken += 1;
      }
    },
  );
  return broken;
}

// CONTAR LINKS EXITOSOS
export function countSuccessfull(links) {
  let successfull = 0;
  links.forEach(
    (link) => {
      if (link.ok === 'OK ✔') {
        successfull += 1;
      }
    },
  );
  return successfull;
}

// CONTAR LINKS UNICOS
export function countUniques(links) {
  const uniqueLinks = new Set(links.map((link) => link.href)); // conjunto url unicas
  return uniqueLinks.size; // tamaño del conjunto
}

// STATS
export function getStats(links) {
  const statsTrue = {
    Total: countLinks(links),
    Unique: countUniques(links),
  };
  return statsTrue;
}

// STATS Y VALIDATE
export function getStatsValidate(links) {
  const statsValidateTrue = {
    Total: countLinks(links),
    Unique: countUniques(links),
    Broken: countBroken(links),
    Successfull: countSuccessfull(links),
  };
  return statsValidateTrue;
}
