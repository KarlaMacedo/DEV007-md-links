/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import marked from 'marked';
// import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import path from 'path';
import axios from 'axios';

// ------------ DIRECTORIO Y DONDE SE ALMACENARÁN FILES .md
const mainDirectory = './tryOut/';

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

// UNIR PATHS ARCHIVOS DIRECTORIO
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
  const linksTrue = Array.from(dom.querySelectorAll('a')).map((element) => ({
    href: element.href,
    text: element.textContent.trim(),
    file,
    status: 10,
    ok: '',
  }));
  return linksTrue;
}

// HTTP REQUEST
export function getStatusCode(url) {
  return axios.get(url)
    .then((response) => response.status)
    .catch((error) => {
      if (error.response) {
        return error.response.status;
      }
      throw error;
    });
}

// OBTENER ARCHIVOS RECURSIVAMENTE
export function getFilesRecursively(directory) {
  const absolutePath = convertAbsolute(directory);
  const filesArray = [];

  function getFilesRec(dir) {
    const files = filesDir(dir);
    files.forEach((file) => {
      const filePath = pathAbsolut(dir, file);
      if (isFile(filePath)) {
        if (isMd(file)) {
          filesArray.push(filePath);
        }
      } else if (isDirectory(filePath)) {
        getFilesRec(filePath);
      }
    });
  }

  getFilesRec(absolutePath);
  return filesArray;
}

// LEER .md Y OBTENER LINKS SEGUN VALID
export function processMarkdownFile(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, markdownContent) => {
      if (error) {
        reject(chalk.bgRedBright.bold(error));
        return;
      }

      const document = convertToHtml(markdownContent);

      if (options === false) {
        const linksFalse = getLinksFalse(document, filePath);
        resolve(linksFalse);
      } else if (options === true) {
        const linksTrue = getLinksTrue(document, filePath);
        resolve(linksTrue);
      } else {
        reject(new Error(chalk.bgRedBright.bold('La opción que elegiste no es válida')));
      }
    });
  });
}

// LEER .md Y OBTENER LINKS CON SU ESTATUS
export function processMarkdownFileWithStatus(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, markdownContent) => {
      if (error) {
        reject(chalk.bgRedBright.bold(error));
        return;
      }

      const document = convertToHtml(markdownContent);
      const links = getLinksTrue(document, filePath);

      const promises = links.map((link) => {
        // Crear una copia del objeto link
        const updatedLink = { ...link };

        return getStatusCode(link.href)
          .then((statusCode) => {
            updatedLink.status = statusCode;
            updatedLink.ok = statusCode === 200 ? 'OK' : 'Fail';
            return updatedLink;
          })
          .catch((error) => {
            updatedLink.status = 'Error';
            updatedLink.ok = 'Fail';
            return updatedLink;
          });
      });

      Promise.all(promises)
        .then((updatedLinks) => {
          resolve(updatedLinks);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
