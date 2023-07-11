/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import { JSDOM } from 'jsdom';

import {
  convertAbsolute, convertToHtml, countBroken, countLinks, countSuccessfull, countUniques, filesDir, getFilesRecursively, getLinksFalse, getLinksTrue, getStats, getStatsValidate, getStatusCode, isDirectory, isFile, isMd, isNotMd, processMarkdownFile, processMarkdownFileWithStatus, truncateText, unionPaths,
} from '../functions.js';

// PATH ABSOLUTA
describe('convertAbsolute', () => {
  test('Debería ser una función', async () => {
    expect(typeof convertAbsolute).toBe('function');
  });

  test('Debería retornar la path absoluta', async () => {
    expect(convertAbsolute('./test/tryOut/file11.md')).toBe('C:\\Users\\Karla\\Desktop\\Javascript\\Laboratoria\\Proyecto4\\DEV007-md-links\\test\\tryOut\\file11.md');
  });

  test('Debería retornar la path si ya es absoluta', async () => {
    expect(convertAbsolute('C:\\Users\\Karla\\Desktop\\Javascript\\Laboratoria\\Proyecto4\\DEV007-md-links\\test\\tryOut\\file11.md')).toBe('C:\\Users\\Karla\\Desktop\\Javascript\\Laboratoria\\Proyecto4\\DEV007-md-links\\test\\tryOut\\file11.md');
  });
});

// ES UN ARCHIVO
describe('isFile', () => {
  test('Debería ser una función', async () => {
    expect(typeof isFile).toBe('function');
  });

  test('Debería retornar true para un archivo', async () => {
    expect(isFile('./test/tryOut/file11.md')).toBe(true);
  });

  test('Debería retornar false para un directorio', async () => {
    expect(isFile('./test/tryOut')).toBe(false);
  });
});

// ES UN ARCHIVO .md
describe('isMd', () => {
  test('Debería ser una función', async () => {
    expect(typeof isMd).toBe('function');
  });

  test('Debería retornar true para un archivo .md', async () => {
    expect(isMd('./test/tryOut/file11.md')).toBe(true);
  });

  test('Debería retornar false para un archivo con extención distinta a .md', async () => {
    expect(isMd('./test/tryOut/file11.doc')).toBe(false);
  });
});

// NO ES UN ARCHIVO .md
describe('isNotMd', () => {
  test('Debería ser una función', async () => {
    expect(typeof isNotMd).toBe('function');
  });

  test('Debería retornar false para un archivo .md', async () => {
    expect(isNotMd('./test/tryOut/file11.md')).toBe(false);
  });

  test('Debería retornar true para un archivo con extención distinta a .md', async () => {
    expect(isNotMd('./test/tryOut/file11.doc')).toBe(true);
  });
});

// ES UN DIRECTORIO
describe('isDirectory', () => {
  test('Debería ser una función', async () => {
    expect(typeof isDirectory).toBe('function');
  });

  test('Debería retornar false para un archivo', async () => {
    expect(isDirectory('./test/tryOut/file11.md')).toBe(false);
  });

  test('Debería retornar true para un directorio', async () => {
    expect(isDirectory('./test/tryOut')).toBe(true);
  });
});

// ARCHIVOS DENTRO DIRECTORIO
describe('filesDir', () => {
  test('Debería ser una función', async () => {
    expect(typeof filesDir).toBe('function');
  });

  test('Debería retornar un array con la cantidad de archivos dentro del directorio', async () => {
    expect(filesDir('./test/tryOut').length).toBe(6);
  });

  test('Debería retornar los archivos dentro del directorio', async () => {
    expect(filesDir('./test/tryOut/src')).toEqual(['index.js', 'recursiv.js']);
  });
});

// UNIR PATHS ARCHIVOS DIRECTORIO
describe('unionPaths', () => {
  test('Debería ser una función', async () => {
    expect(typeof unionPaths).toBe('function');
  });

  test('Debería unir la ruta del directorio con la de sus archivos', async () => {
    expect(unionPaths('./test/tryOut/src', 'index.js')).toBe('test\\tryOut\\src\\index.js');
  });
});

// .md A HTML
describe('convertToHtml', () => {
  test('Debería ser una función', async () => {
    expect(typeof convertToHtml).toBe('function');
  });

  test('Debería retornar el DOM del archivo .md transformado a HTML', async () => {
    const markdownContent = '# Título\n\n[fileCorrect](https://github.com/Laboratoria/DEV007-md-links)';
    const expectedHtml = '<h1>Título</h1>\n<p><a href="https://github.com/Laboratoria/DEV007-md-links">fileCorrect</a></p>\n';

    const document = convertToHtml(markdownContent);

    expect(document.body.innerHTML).toBe(expectedHtml);
  });
});

// LINKS VALID FALSE
describe('getLinksFalse', () => {
  test('Debería ser una función', async () => {
    expect(typeof getLinksFalse).toBe('function');
  });

  test('Debería retornar el array de objetos de los links con los atributos href, text y file', async () => {
    const html = '<h1>Título</h1>\n<p><a href="https://github.com/Laboratoria/DEV007-md-links">fileCorrect</a></p>\n';
    const dom = new JSDOM(html);
    const file = './test/tryOut/file11.md';

    const expectedResponse = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
    }];

    expect(getLinksFalse(dom.window.document, file)).toEqual(expectedResponse);
  });

  test('Debería retornar un array vacío si el archivo no tiene links', async () => {
    const html = '<h1>Título</h1>\n<p>Hola</p>\n';
    const dom = new JSDOM(html);
    const file = './test/tryOut/file11.md';

    const expectedResponse = [];

    expect(getLinksFalse(dom.window.document, file)).toEqual(expectedResponse);
  });
});

// LINKS VALID TRUE
describe('getLinksTrue', () => {
  test('Debería ser una función', async () => {
    expect(typeof getLinksTrue).toBe('function');
  });

  test('Debería retornar el objeto del link con los atributos href, text y file', async () => {
    const html = '<h1>Título</h1>\n<p><a href="https://github.com/Laboratoria/DEV007-md-links">fileCorrect</a></p>\n';
    const dom = new JSDOM(html);
    const file = './test/tryOut/file11.md';

    const expectedResponse = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 10,
      ok: '',
    }];

    expect(getLinksTrue(dom.window.document, file)).toEqual(expectedResponse);
  });

  test('Debería retornar el objeto del link con los atributos href, text y file', async () => {
    const html = '<h1>Título</h1>\n<p>Hola</p>\n';
    const dom = new JSDOM(html);
    const file = './test/tryOut/file11.md';

    const expectedResponse = [];

    expect(getLinksTrue(dom.window.document, file)).toEqual(expectedResponse);
  });
});

// HTTP REQUEST
describe('getStatusCode', () => {
  test('Debería ser una función', async () => {
    expect(typeof getStatusCode).toBe('function');
  });

  test('Debería retornar el código de status del HTTP request', async () => {
    const ok = 'https://github.com/Laboratoria/DEV007-md-links';
    const fail = 'https://github.com/Laboratoooria/DEV007-md-links';

    expect(await getStatusCode(ok)).toEqual(200);
    expect(await getStatusCode(fail)).toEqual(404);
  });
});

// OBTENER ARCHIVOS RECURSIVAMENTE
describe('getFilesRecursively', () => {
  test('Debería ser una función', async () => {
    expect(typeof getFilesRecursively).toBe('function');
  });

  test('Debería retornar un array de un elemento al pasarle la ruta de un archivo .md', async () => {
    const pathUser = './test/tryOut/file11.md';

    expect(getFilesRecursively(pathUser).length).toBe(1);
  });

  test('Debería retornar un array con la cantidad de archivos .md que encuentre de forma recursiva al pasarle la ruta de un directorio', async () => {
    const pathUser = './test/tryOut';

    expect(getFilesRecursively(pathUser).length).toBe(3);
  });
});

// LEER .md Y OBTENER LINKS
describe('processMarkdownFile', () => {
  test('Debería ser una función', async () => {
    expect(typeof processMarkdownFile).toBe('function');
  });

  test('Debería retornar el array de objetos de los links encontrados con los atributos href, text y file', async () => {
    const pathUser = './test/tryOut/file11.md';

    const expectedResponse = [{
      href: 'https://github.com/Laboratoriiaa/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
    },
    {
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
    }];

    expect(await processMarkdownFile(pathUser)).toEqual(expectedResponse);
  });
});

// LEER .md Y OBTENER LINKS CON SU STATUS
describe('processMarkdownFileWithStatus', () => {
  test('Debería ser una función', async () => {
    expect(typeof processMarkdownFileWithStatus).toBe('function');
  });

  test('Debería retornar el array de objetos de los links encontrados con los atributos href, text y file', async () => {
    const pathUser = './test/tryOut/file11.md';

    const expectedResponse = [{
      href: 'https://github.com/Laboratoriiaa/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
      status: 404,
      ok: 'Fail ✘',
    },
    {
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    }];

    expect(await processMarkdownFileWithStatus(pathUser)).toEqual(expectedResponse);
  });
});

// TRUNCAR TEXTO 50 CARACTERES
describe('truncateText', () => {
  test('Debería ser una función', async () => {
    expect(typeof truncateText).toBe('function');
  });

  test('Si el texto es menor a 50, debería retornar todo el texto', async () => {
    const text = 'fileError12345678901234567890123456789012345678901234567890';

    expect(truncateText(text)).toBe('fileError12345678901234567890123456789012345678901...');
  });

  test('Si el texto es mayor a 50, debería retornar los primeros 50 caracteres y ... finales', async () => {
    const text = 'fileCorrect';

    expect(truncateText(text)).toBe('fileCorrect');
  });
});

// CONTAR LINKS
describe('countLinks', () => {
  test('Debería ser una función', async () => {
    expect(typeof countLinks).toBe('function');
  });

  test('Si el texto es menor a 50, debería retornar todo el texto', async () => {
    const links = ['https://github.com/Laboratoriiaa/DEV007-md-links', 'https://github.com/Laboratoria/DEV007-md-links'];

    expect(countLinks(links)).toBe(2);
  });
});

// CONTAR LINKS ROTOS
describe('countBroken', () => {
  test('Debería ser una función', async () => {
    expect(typeof countBroken).toBe('function');
  });

  test('Debería retornar la cantidad de links con status 404', async () => {
    const links = [{
      href: 'https://github.com/Laboratoriiaa/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
      status: 404,
      ok: 'Fail ✘',
    },
    {
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laborato/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
      status: 404,
      ok: 'Fail ✘',
    }];

    expect(countBroken(links)).toBe(2);
  });
});

// CONTAR LINKS EXITOSOS
describe('countSuccessfull', () => {
  test('Debería ser una función', async () => {
    expect(typeof countSuccessfull).toBe('function');
  });

  test('Debería retornar la cantidad de links con status 200', async () => {
    const links = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    }];

    expect(countSuccessfull(links)).toBe(3);
  });
});

// CONTAR LINKS UNICOS
describe('countUniques', () => {
  test('Debería ser una función', async () => {
    expect(typeof countUniques).toBe('function');
  });

  test('Debería retornar la cantidad de links únicos', async () => {
    const links = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratoriia/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratooria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    }];

    expect(countUniques(links)).toBe(3);
  });
});

// STATS
describe('getStats', () => {
  test('Debería ser una función', async () => {
    expect(typeof getStats).toBe('function');
  });

  test('Debería retornar el objeto de las estadísticas de los links contando los links totales y únicos', async () => {
    const links = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratoriia/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratooria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laborato/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
      status: 404,
      ok: 'Fail ✘',
    }];

    const expectedResponse = {
      Total: 4,
      Unique: 4,
    };

    expect(getStats(links)).toEqual(expectedResponse);
  });
});

// STATS Y VALIDATE
describe('getStatsValidate', () => {
  test('Debería ser una función', async () => {
    expect(typeof getStatsValidate).toBe('function');
  });

  test('Debería retornar el objeto de las estadísticas de los links contando los links totales, únicos, rotos y éxitosos', async () => {
    const links = [{
      href: 'https://github.com/Laboratoria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratoriia/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laboratooria/DEV007-md-links',
      text: 'fileCorrect',
      file: './test/tryOut/file11.md',
      status: 200,
      ok: 'OK ✔',
    },
    {
      href: 'https://github.com/Laborato/DEV007-md-links',
      text: 'fileError12345678901234567890123456789012345678901234567890',
      file: './test/tryOut/file11.md',
      status: 404,
      ok: 'Fail ✘',
    }];

    const expectedResponse = {
      Total: 4,
      Unique: 4,
      Broken: 1,
      Successfull: 3,
    };

    expect(getStatsValidate(links)).toEqual(expectedResponse);
  });
});
