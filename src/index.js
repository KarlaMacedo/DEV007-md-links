import chalk from 'chalk';
import fs from 'fs';

// Ejemplo de uso de Chalk
export default function hola() {
  console.log(chalk.bgMagenta('CHALK'));
  console.log(chalk.blue('Texto en azul'));
  console.log(chalk.green('Texto en verde'));
  console.log(chalk.red('Texto en rojo'));
}

hola();

// SYNC
console.log(chalk.bgMagenta('SYNC'));
const test1 = fs.readFileSync('./tryOut/file.md', 'utf8');
console.log(`test1: ${test1}`);

const test2 = fs.readFileSync('./tryOut/file11.md', 'utf8');
console.log(`test2: ${test2}`);

const test3 = fs.readFileSync('./tryOut/file11.txt', 'utf8');
console.log(`test3: ${test3}`);

const test4 = fs.readFileSync('./tryOut/try/file22.md', 'utf8');
console.log(`test4: ${test4}`);

// ASYNC
fs.readFile('./tryOut/file.md', 'utf8', (err, test5) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(chalk.bgMagenta('ASYNC'));
  console.log(`test5: ${test5}`);
});

fs.readFile('./tryOut/file11.md', 'utf8', (err, test6) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`test6: ${test6}`);
});

fs.readFile('./tryOut/file11.txt', 'utf8', (err, test7) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`test7: ${test7}`);
});

fs.readFile('./tryOut/try/file22.md', 'utf8', (err, test8) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`test8: ${test8}`);
});

// POR TERMINAL
// Obtener las rutas de archivo desde los argumentos de línea de comandos
const filePaths = process.argv.slice(2);

// Leer cada archivo de forma asíncrona y mostrar su contenido
filePaths.forEach((filePath) => {
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.error(`Error al leer el archivo ${filePath}: ${err}`);
      return;
    }
    console.log(chalk.bgMagenta('POR TERMINAL'));
    console.log(`ContenT of ${filePath}:`);
    console.log(content);
    console.log('---');
  });
});
