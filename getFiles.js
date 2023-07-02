import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// const mainDirectory = './tryOut';
// const filesArray = [];

export default function getFiles(directory, array) {
  try {
    const files = fs.readdirSync(directory, 'utf8');

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      try {
        const stats = fs.statSync(filePath);

        if (stats.isFile() && path.extname(file) === '.md') {
          array.push(filePath);
          console.log(chalk.blue(filePath));
        } else if (stats.isDirectory()) {
          getFiles(filePath, array);
        }
      } catch (err) {
        console.error('Error al obtener la estadística del archivo:', err);
      }
    });
  } catch (err) {
    console.error('Error al leer la carpeta:', err);
  }
}

// Uso:
/* console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
getFiles(mainDirectory, filesArray);
console.log(chalk.bgRed(typeof filesArray));
console.log(chalk.bgRed(filesArray)); */
