/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import { marked } from 'marked';
// import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

import getFiles from './getFiles.js';

const mainDirectory = './tryOut';
const filesArray = [];

// Uso:
console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray));

const mdlinks = (files) => {
  files.forEach((content) => {
    const markdownContent = fs.readFileSync(content, 'utf-8');
    const html = marked(markdownContent, { headerIds: false, mangle: false });
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const links = Array.from(document.querySelectorAll('a')).map((link) => link.href);
    /* const $ = cheerio.load(html);
    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      links.push(link); */
    console.log(`Enlaces encontrados en: ${content} 
      `);
    links.forEach((linked) => {
      console.log(chalk.magenta(linked));
    });
  });
};

// );
// };

mdlinks(filesArray);

/* mdlinks.then((result) => {
  console.log(result);
}); */
