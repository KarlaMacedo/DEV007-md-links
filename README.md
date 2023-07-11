# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Consideraciones generales](#3-consideraciones-generales)
* [4. Instrucciones de uso](#4-instrucciones-de-uso)
* [5. Planeación del proyecto](#5-planeación-del-proyecto)
* [6. Objetivos de aprendizaje](#6-objetivos-de-aprendizaje)


***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

Este proyecto es una herramienta de línea de comando (CLI) / librería en 
JavaScript que se ejecuta usando Node.js.

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto permite ejecutar JavaScript en el entorno del sistema operativo,
ya sea en máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, etc.

## 3. Consideraciones generales

* Este proyecto se resolvió de manera individual.

* El rango de tiempo estimado para completar el proyecto era de 4 a 5 Sprints y se completó en 2.5 sprints.

* Se comprobó la compatibilidad en los entornos de ejecución **Linux, Mac y Windows**.

* La **librería** y el **script ejecutable** (herramienta de línea de comando -
  CLI) estan implementados en JavaScript para ser ejecutados con
  Node.js. **Se usaron librerías externas como path, FS, Axios, JSDOM, chalk y marked**.

* El módulo **es instalable** via `npm install karlamac-md-links`. 

* Para este proyecto **no se permitió** utilizar `async/await`.

* **Utiliza** la versión asíncrona para leer archivos.

* **Utiliza** ES Modules `(import/export)` con ayuda de **babel**.

* Para disminuir la complejidad del algoritmo recursivo, se utilizó la
versión síncrona de la función para leer directorios, `readdirSync`.

## 4. Instrucciones de uso

### Instalación

Para instalar la librería se debe ejecutar el siguiente comando en la terminal:

```
npm install karlamac-md-links
```

### Uso por la terminal

Para utilizar la librería mediante la terminal se debe utilizar el siguiente comando:

```
npx karlamac-md-links <path-to-file> [options]
```

Se debe reemplazar `<path-to-file>` por la ruta (absoluta o relativa) del archivo o directorio que se desea procesar. Y se debe reemplazar `[options]` por la acción que se desea hacer:

#### Opciones

Si no se ingresa nada (`npx karlamac-md-links <path-to-file>`), se retornarán los archivos .md que se encuentren y los links que se encuentren dentro de cada archivo. En caso de que no se encuentren links o archivos, se retornará un aviso.

![planning](./nothing.png)

Si se ingresa sólo la opción de `--valid` (`npx karlamac-md-links <path-to-file> --valid`), se retornarán los archivos .md que se encuentren, los links que se encuentren dentro de cada archivo y éstos serán validados mediante una HTTP request, por lo que también se retornará su código de satatus y en caso de que sea exitoso se retornará un aviso "OK ✔", de lo contrario será un aviso "Fail ✘". En caso de que no se encuentren links o archivos, se retornará un aviso.

![planning](./valid.png)

Si se ingresa sólo la opción de `--stats` (`npx karlamac-md-links <path-to-file> --stats`), se retornarán los archivos .md que se encuentren y los links que se encuentren dentro de cada archivo. En caso de que no se encuentren links o archivos, se retornará un aviso. Adicionalmente, se obtendrá una sección de estadísticas que mostrará cuántos links en total se encontraron en la búsqueda y cuántos de éstos son únicos.

![planning](./stats.png)

Si se ingresan las opciones `--valid` y `--stats` (`npx karlamac-md-links <path-to-file> --valid --stats`), se retornarán los archivos .md que se encuentren, los links que se encuentren dentro de cada archivo y éstos serán validados mediante una HTTP request, por lo que también se retornará su código de satatus y en caso de que sea exitoso se retornará un aviso "OK ✔", de lo contrario será un aviso "Fail ✘". En caso de que no se encuentren links o archivos, se retornará un aviso. Adicionalmente, se obtendrá una sección de estadísticas que mostrará cuántos links en total se encontraron en la búsqueda, cuántos de éstos son únicos, cuántos fueron exitosos en la solicitud HTTP y cuánto no lo fueron.

![planning](./validstats.png)

### Uso como API

Para su utilización mediante una API (Application Programming Interface) se debe:

- Ingresar al [repositorio de GitHub](https://github.com/KarlaMacedo/DEV007-md-links) y hacer un fork. 

- Abrir la su terminal e ingresar a la ubicación donde desea guardar el proyecto con la ayuda del comando `cd`. 

- Ingresar el comando:
```
git clone https://github.com/KarlaMacedo/DEV007-md-links.git
```

- Abrir la carpeta dentro del editor de código de tu preferencia.

- Abrir la terminal y ejecutar el proyecto mediante los siguientes comandos, según la acción que se desea realizar:

#### Opciones

Si no se ingresa nada (`node cli.js <path-to-file>`), se retornarán los archivos .md que se encuentren y los links que se encuentren dentro de cada archivo. En caso de que no se encuentren links o archivos, se retornará un aviso.

![planning](./nothing.png)

Si se ingresa sólo la opción de `--valid` (`node cli.js <path-to-file> --valid`), se retornarán los archivos .md que se encuentren, los links que se encuentren dentro de cada archivo y éstos serán validados mediante una HTTP request, por lo que también se retornará su código de satatus y en caso de que sea exitoso se retornará un aviso "OK ✔", de lo contrario será un aviso "Fail ✘". En caso de que no se encuentren links o archivos, se retornará un aviso.

![planning](./valid.png)

Si se ingresa sólo la opción de `--stats` (`node cli.js <path-to-file> --stats`), se retornarán los archivos .md que se encuentren y los links que se encuentren dentro de cada archivo. En caso de que no se encuentren links o archivos, se retornará un aviso. Adicionalmente, se obtendrá una sección de estadísticas que mostrará cuántos links en total se encontraron en la búsqueda y cuántos de éstos son únicos.

![planning](./stats.png)

Si se ingresan las opciones `--valid` y `--stats` (`node cli.js <path-to-file> --valid --stats`), se retornarán los archivos .md que se encuentren, los links que se encuentren dentro de cada archivo y éstos serán validados mediante una HTTP request, por lo que también se retornará su código de satatus y en caso de que sea exitoso se retornará un aviso "OK ✔", de lo contrario será un aviso "Fail ✘". En caso de que no se encuentren links o archivos, se retornará un aviso. Adicionalmente, se obtendrá una sección de estadísticas que mostrará cuántos links en total se encontraron en la búsqueda, cuántos de éstos son únicos, cuántos fueron exitosos en la solicitud HTTP y cuánto no lo fueron.

![planning](./validstats.png)


## 5. Planeación del proyecto

Este proyecto se planeó con la utilización de [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects), creando issues, labels y milestones.

![planning](./plan.png)

También se realizó previamente un diagrama de flujo como guía para el desarrollo de la lógica del proceso que implicaría el proyecto.

![diagrama](./diagrama.png)


## 6. Objetivos de aprendizaje

### JavaScript

- [✓] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [✓] **Arrays (arreglos)**

  <details><summary>Links</summary><p>

  * [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)
  * [Array - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)
  * [Array.prototype.sort() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  * [Array.prototype.forEach() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  * [Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  * [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  * [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
</p></details>

- [✓] **Objetos (key, value)**

  <details><summary>Links</summary><p>

  * [Objetos en JavaScript](https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects)
</p></details>

- [✓] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

  <details><summary>Links</summary><p>

  * [Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)
  * [Tomando decisiones en tu código — condicionales - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals)
</p></details>

- [✓] **Funciones (params, args, return)**

  <details><summary>Links</summary><p>

  * [Funciones (control de flujo)](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions)
  * [Funciones clásicas](https://curriculum.laboratoria.la/es/topics/javascript/03-functions/01-classic)
  * [Arrow Functions](https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow)
  * [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)
</p></details>

- [✓] **Recursión o recursividad**

  <details><summary>Links</summary><p>

  * [Píldora recursión - YouTube Laboratoria Developers](https://www.youtube.com/watch?v=lPPgY3HLlhQ)
  * [Recursión o Recursividad - Laboratoria Developers en Medium](https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursividad-ec8f1a359727)
</p></details>

- [✓] **Módulos de CommonJS**

  <details><summary>Links</summary><p>

  * [Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)
</p></details>

- [✓] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [✓] **Callbacks**

  <details><summary>Links</summary><p>

  * [Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
</p></details>

- [✓] **Promesas**

  <details><summary>Links</summary><p>

  * [Promise - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  * [How to Write a JavaScript Promise - freecodecamp (en inglés)](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)
</p></details>

- [✓] **Pruebas unitarias (unit tests)**

  <details><summary>Links</summary><p>

  * [Empezando con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/getting-started)
</p></details>

- [✓] **Pruebas asíncronas**

  <details><summary>Links</summary><p>

  * [Tests de código asincrónico con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/asynchronous)
</p></details>

- [ ] **Uso de mocks y espías**

  <details><summary>Links</summary><p>

  * [Manual Mocks con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/manual-mocks)
</p></details>

- [ ] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [✓] **Uso de linter (ESLINT)**

- [✓] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [✓] **Instalar y usar módulos con npm**

  <details><summary>Links</summary><p>

  * [Sitio oficial de npm (en inglés)](https://www.npmjs.com/)
</p></details>

- [✓] **Configuración de package.json**

  <details><summary>Links</summary><p>

  * [package.json - Documentación oficial (en inglés)](https://docs.npmjs.com/files/package.json)
</p></details>

- [✓] **Configuración de npm-scripts**

  <details><summary>Links</summary><p>

  * [scripts - Documentación oficial (en inglés)](https://docs.npmjs.com/misc/scripts)
</p></details>

- [✓] **process (env, argv, stdin-stdout-stderr, exit-code)**

  <details><summary>Links</summary><p>

  * [Process - Documentación oficial (en inglés)](https://nodejs.org/api/process.html)
</p></details>

- [✓] **File system (fs, path)**

  <details><summary>Links</summary><p>

  * [File system - Documentación oficial (en inglés)](https://nodejs.org/api/fs.html)
  * [Path - Documentación oficial (en inglés)](https://nodejs.org/api/path.html)
</p></details>

### Control de Versiones (Git y GitHub)

- [✓] **Git: Instalación y configuración**

- [✓] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [✓] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [✓] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [✓] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [✓] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [✓] **Consulta o petición (request) y respuesta (response).**

  <details><summary>Links</summary><p>

  * [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)
  * [Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
</p></details>

- [✓] **Códigos de status de HTTP**

  <details><summary>Links</summary><p>

  * [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
  * [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
</p></details>

