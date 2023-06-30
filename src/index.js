import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Ejemplo de uso de Chalk
export default function hola() {
  console.log(chalk.bgGreen('CHALK'));
  console.log(chalk.blue('Texto en azul'));
  console.log(chalk.green('Texto en verde'));
  console.log(chalk.red('Texto en rojo'));
}

hola();

// SYNC
console.log(chalk.bgYellow('SYNC'));
let filePath = './tryOut/file.md';
const test1 = fs.readFileSync(filePath, 'utf8');
const testOne = path.extname(filePath);
console.log(`test1: 
  El contenido del archivo es el siguiente...
  ${test1}
  Su extensión es...
  ${testOne}`);

console.log(chalk.bgYellow('SYNC'));
filePath = './tryOut/file11.md';
const test2 = fs.readFileSync(filePath, 'utf8');
const testTwo = path.extname(filePath);
console.log(`test2: 
  El contenido del archivo es el siguiente...
  ${test2}
  Su extensión es...
  ${testTwo}`);

console.log(chalk.bgYellow('SYNC'));
filePath = './tryOut/file11.txt';
const test3 = fs.readFileSync(filePath, 'utf8');
const testThree = path.extname(filePath);
console.log(`test3: 
  El contenido del archivo es el siguiente...
  ${test3}
  Su extensión es...
  ${testThree}`);

console.log(chalk.bgYellow('SYNC'));
filePath = './tryOut/try/file22.md';
const test4 = fs.readFileSync(filePath, 'utf8');
const testFour = path.extname(filePath);
console.log(`test4: 
  El contenido del archivo es el siguiente...
  ${test4}
  Su extensión es...
  ${testFour}`);

console.log(chalk.bgYellow('SYNC'));
filePath = './tryOut/file11.doc';
const test9 = fs.readFileSync(filePath, 'utf8');
const testNine = path.extname(filePath);
console.log(`test9: 
  El contenido del archivo es el siguiente...
  ${test9}
  Su extensión es...
  ${testNine}`);

console.log(chalk.bgYellow('SYNC DIR'));
const directoryPath = './tryOut'; // Ruta de la carpeta
const files = fs.readdirSync(directoryPath);
console.log(`Archivos encontrados en la carpeta ${directoryPath}:
`);
files.forEach((file) => {
  const pathFile = path.join(directoryPath, file);
  console.log(pathFile);
});

// ASYNC
filePath = './tryOut/file.md';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const test5 = data;
  const testFive = path.extname(filePath);
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test5: 
    El contenido del archivo es el siguiente...
    ${test5}
    Su extensión es...
    ${testFive}`);
});

filePath = './tryOut/file11.md';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const test6 = data;
  const testSix = path.extname(filePath);
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test6: 
    El contenido del archivo es el siguiente...
    ${test6}
    Su extensión es...
    ${testSix}`);
});

filePath = './tryOut/file11.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const test7 = data;
  const testSeven = path.extname(filePath);
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test7: 
    El contenido del archivo es el siguiente...
    ${test7}
    Su extensión es...
    ${testSeven}`);
});

filePath = './tryOut/try/file22.md';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const test8 = data;
  const testEight = path.extname(filePath);
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test8: 
    El contenido del archivo es el siguiente...
    ${test8}
    Su extensión es...
    ${testEight}`);
});

filePath = './tryOut/file11.doc';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const test10 = data;
  const testTen = path.extname(filePath);
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test10: 
    El contenido del archivo es el siguiente...
    ${test10}
    Su extensión es...
    ${testTen}`);
});

fs.readdir(directoryPath, (err, filesA) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }
  console.log(chalk.bgMagenta('ASYNC DIR'));
  console.log(`Archivos encontrados en la carpeta ${directoryPath}:
  `);
  filesA.forEach((file) => {
    const filePathA = path.join(directoryPath, file);
    console.log(filePathA);
  });
});

// POR TERMINAL
// Obtener las rutas de archivo desde los argumentos de línea de comandos
// const filePaths = process.argv.slice(2);

// Leer cada archivo de forma asíncrona y mostrar su contenido
/* filePaths.forEach((filePathUser) => {
  fs.readFile(filePathUser, 'utf8', (err, content) => {
    if (err) {
      console.error(`Error al leer el archivo ${filePathUser}: ${err}`);
      return;
    }
    const ext = path.extname(filePathUser);
    console.log(chalk.bgCyanBright('POR TERMINAL'));
    console.log(`El contenido del archivo ${filePathUser} es el siguiente...
      ${content}
      Su extensión es...
      ${ext}`);
  });
}); */

// Obtener las rutas de la carpeta desde los argumentos de línea de comandos
const directoryPathUser = process.argv.slice(2).toString();
console.log(chalk.bgRedBright(typeof directoryPathUser));
console.log(chalk.bgRedBright(typeof directoryPath));

fs.readdir(directoryPathUser, (err, filesUser) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }
  console.log(chalk.bgCyanBright('POR TERMINAL DIR'));
  console.log(`Archivos encontrados en la carpeta ${directoryPathUser}:
  `);
  filesUser.forEach((file) => {
    const filePathA = path.join(directoryPathUser, file);
    console.log(filePathA);
  });
});
