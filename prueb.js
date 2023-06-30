/* eslint-disable no-shadow */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const mainDirectory = './tryOut';

// SYNC
function listFilesRecursiveSync(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      console.log(chalk.blue(filePath));
    } else if (stats.isDirectory()) {
      listFilesRecursiveSync(filePath);
    }
  });
}

// Uso:
console.log(chalk.bgBlue('TUS ARCHIVOS SYNC'));
listFilesRecursiveSync(mainDirectory);

// ASYNC
// Listar archivos de carpetas desde los argumentos de línea de comandos de forma recursiva
function listFilesRecursive(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta:', err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error al obtener la estadística del archivo:', err);
          return;
        }
        if (stats.isFile()) {
          console.log(chalk.green(filePath));
        } else if (stats.isDirectory()) {
          listFilesRecursive(filePath);
        }
      });
    });
  });
}

// Uso:
console.log(chalk.bgGreen('TUS ARCHIVOS ASYNC'));
listFilesRecursive(mainDirectory);
