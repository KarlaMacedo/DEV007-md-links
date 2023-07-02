/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import { marked } from 'marked';
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
// import MarkdownIt from 'markdown-it';

import getFiles from './getFiles.js';

const mainDirectory = './tryOut';
const filesArray = [];

// Uso:
console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray));

const mdlinks = (files) => {
  // const md = new MarkdownIt();

  files.forEach((content) => {
    const markdownContent = fs.readFileSync(content, 'utf-8');
    const htmlContent = marked(markdownContent, { headerIds: false, mangle: false });
    const dom = new JSDOM(htmlContent, { resources: 'usable' });
    const $ = cheerio.load(dom.window.document.body.innerHTML);
    const links = [];
    $('a').each((index, element) => {
      const text = $(element).text();
      const url = $(element).attr('href');
      links.push({ text, url });
    });

    // MARKDOWN IT
    /* const tokens = md.parse(markdownContent);
    console.log(chalk.bgGray(tokens));
    const links = [];
    console.log(chalk.yellow(links));

    tokens.forEach((token) => {
      if (token.type === 'link_open') {
        console.log(chalk.green(token.attrs));
        const hrefAttr = token.attrs.find((attr) => attr[0] === 'href');
        if (hrefAttr) {
          links.push(hrefAttr[1]);
        }
      }
    }); */

    // MARKED Y JSDOM
    /* const html = marked(markdownContent, { headerIds: false, mangle: false });
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const links = Array.from(document.querySelectorAll('a')).map((link) => link.href); */

    // MARKED Y CHEERIO
    /* const $ = cheerio.load(html);
    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      links.push(link); */

    console.log(`Enlaces encontrados en: ${content} 
      `);
    links.forEach((linked) => {
      console.log(chalk.magenta(linked.url));
    });
  });
};

// );
// };

mdlinks(filesArray);

/* mdlinks.then((result) => {
  console.log(result);
}); */
