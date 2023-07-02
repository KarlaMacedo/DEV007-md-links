/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import { marked } from 'marked';
import cheerio from 'cheerio';

import getFiles from './getFiles.js';

const mainDirectory = './tryOut';
const filesArray = [];

// Uso:
console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray));

const mdlinks = (files) => {
  Promise.all(
    files.map((content) => new Promise((resolve, reject) => {
      fs.readFile(content, 'utf-8', (error, markdownContent) => {
        if (error) {
          reject(error);
          return;
        }

        const html = marked(markdownContent, { headerIds: false, mangle: false });
        const $ = cheerio.load(html);
        const links = [];
        $('a').each((index, element) => {
          const link = $(element).attr('href');
          links.push(link);
        });
        console.log(`Enlaces encontrados en: ${content}`);
        console.log(chalk.red(links));
        Promise.all(
          links.map((linki) => new Promise((resolved) => {
            console.log(chalk.magenta(linki));
            resolved();
          })),
        )
          .then(() => {
            resolve();
          })
          .catch((errors) => {
            reject(errors);
          });
      });
    })),
  )
    .then(() => {
      console.log('Proceso finalizado');
    })
    .catch((error) => {
      console.error('Error al obtener los archivos:', error);
    });
};

mdlinks(filesArray);

/* mdlinks.then((result) => {
  console.log(result);
}); */
