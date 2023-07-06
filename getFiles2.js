// ---------- IMPORTAR LIBRERÍAS
import chalk from 'chalk';
import {
  convertAbsolute,
  filesDir, isDirectory, isFile, isMd, isNotMd, pathAbsolut,
} from './functions.js';

// ------------ PATH Y DONDE SE ALMACENARÁN FILES .md
// const mainDirectory = './tryOut/file11.txt';
// const filesArray = [];

// ------------- FUNCION OBTRENER LOS ARCHIVOS .MD EN UN ARRAY
export default function getFiles2(directory, array) {
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

// ---------- USO
// console.log(chalk.bgGreen('TUS ARCHIVOS MD:'));
// getFiles(mainDirectory, filesArray);
// console.log(chalk.bgBlue(typeof filesArray));
// console.log(chalk.bgBlue(filesArray));
