// ---------- IMPORTAR LIBRERÍAS
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// ------------ PATH Y DONDE SE ALMACENARÁN FILES .md
// const mainDirectory = './tryOut/file11.txt';
// const filesArray = [];

// ------------- FUNCION OBTRENER LOS ARCHIVOS .MD EN UN ARRAY
export default function getFiles(directory, array) {
  return new Promise((resolve, reject) => { // se crea promesa
    try {
      const stats1 = fs.statSync(directory); // estadística ruta

      if (stats1.isFile() && path.extname(directory) === '.md') {
        array.push(directory); // directo al array si el path es archivo .md
        resolve();
      }
      if (stats1.isFile() && path.extname(directory) !== '.md') {
        reject(chalk.bgRedBright.bold(' ERROR: Tu archivo no es .md '));
      }

      // si el path proporcionado por el usuario es un directorio
      const files = fs.readdirSync(directory, 'utf8');// almacena el contenido

      files.forEach((file) => {
        const filePath = path.join(directory, file); // obtiene ruta absoluta
        try {
          const stats = fs.statSync(filePath); // estadística

          if (stats.isFile() && path.extname(file) === '.md') {
            array.push(filePath); // al array si es archivo .md
            // console.log(chalk.blue(filePath));
          } else if (stats.isDirectory()) {
            getFiles(filePath, array); // si es un directorio se hace recursiva
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

// ---------- USO
// console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
// getFiles(mainDirectory, filesArray);
// console.log(chalk.bgBlue(typeof filesArray));
// console.log(chalk.bgBlue(filesArray));
