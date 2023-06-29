// module.exports = () => {
// eslint-disable-next-line linebreak-style
// ...
// }
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';

// Ejemplo de uso de Chalk
export default function hola() {
  console.log(chalk.blue('Texto en azul'));
  console.log(chalk.green('Texto en verde'));
  console.log(chalk.red('Texto en rojo'));
}

hola();
