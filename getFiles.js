import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// const mainDirectory = './tryOut/file11.txt';
// const filesArray = [];

export default function getFiles(directory, array) {
  return new Promise((resolve, reject) => {
    try {
      const stats1 = fs.statSync(directory);

      if (stats1.isFile() && path.extname(directory) === '.md') {
        array.push(directory);
        resolve();
      }
      if (stats1.isFile() && path.extname(directory) !== '.md') {
        reject(chalk.bgRedBright.bold(' ERROR: Tu archivo no es .md '));
      }

      const files = fs.readdirSync(directory, 'utf8');

      files.forEach((file) => {
        const filePath = path.join(directory, file);
        try {
          const stats = fs.statSync(filePath);

          if (stats.isFile() && path.extname(file) === '.md') {
            array.push(filePath);
            // console.log(chalk.blue(filePath));
          } else if (stats.isDirectory()) {
            getFiles(filePath, array);
          }
        } catch (err) {
          console.error(chalk.bgRedBright.bold(err));
        }
      });
      resolve();
    } catch (err) {
      if (err.code === 'ENOENT') {
        reject(chalk.bgRedBright.bold(' ERROR: Tu ruta no se encontró, revisa si es correcta '));
      }
    }
  });
}

// Uso:
// console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
// getFiles(mainDirectory, filesArray);
// console.log(chalk.bgBlue(typeof filesArray));
// console.log(chalk.bgBlue(filesArray));
