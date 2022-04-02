import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile } from 'fs/promises';

let counters = {};

const JSONfile = 'user.json';

// NOTE: We changed the content type from text/html to application/json.
const headerFields = { 'Content-Type': 'application/json' };

async function reload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    counters = JSON.parse(data);
  } catch (err) {
    counters = {};
  }
}

async function saveCounters() {
  try {
    const data = JSON.stringify(counters);
    await writeFile(JSONfile, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function counterExists(name) {
  return name in counters;
}

async function createCounter(response, name,pass) {
  let eachuser = {name: name, pass:pass}
  if (name === undefined) {
    // 400 - Bad Request
    response.writeHead(400, headerFields);
    response.write({ error: 'Counter Name Required' });
    response.end();
  } else {
    await reload(JSONfile);
    counters[name] = eachuser;
    await saveCounters();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: pass }));
    response.end();
  }
}

async function readCounter(response, name) {
  await reload(JSONfile);
  if (counterExists(name)) {
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: counters[name] }));
    response.end();
  } else {
    // 404 - Not Found
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: `Counter '${name}' Not Found` }));
    response.end();
  }
}

async function updateCounter(response, name) {
  await reload(JSONfile);
  if (counterExists(name)) {
    counters[name] = counters[name]+1;
    await saveCounters();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: counters[name] }));
    response.end();
  } else {
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: `Counter '${name}' Not Found` }));
    response.end();
  }
}

async function deleteCounter(response, name) {
  await reload(JSONfile);
  if (counterExists(name)) {
    delete counters[name];
    await saveCounters();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: counters[name]}));
    response.end();
  } else {
    // 404 - Not Found
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: `Counter '${name}' Not Found` }));
    response.end();
  }
}

async function dumpCounters(response) {
  await reload(JSONfile);
  response.writeHead(200, headerFields);
  response.write(JSON.stringify(counters));
  response.end();
}

async function basicServer(request, response) {
  const parsedURL = url.parse(request.url, true);
  console.log(parsedURL);
  const options = parsedURL.query;
  const pathname = parsedURL.pathname;
  const method = request.method;
  console.log(pathname);
  if (method == 'POST' && pathname.startsWith('/user/create')) {
    createCounter(response, options.name, options.pass);
  } else if (method == 'GET' && pathname.startsWith('/read?')) {
    readCounter(response, options.name);
  }else if (method == 'POST' && pathname.startsWith('/update')) {
    updateCounter(response, options.name);
  }else if (method == 'DELETE' && pathname.startsWith('/delete')) {
    deleteCounter(response, options.name);
  } else if (method == 'GET' && pathname.startsWith('/dump')) {
    dumpCounters(response);
  } else if (method == 'GET' && pathname.startsWith('/signup')) {
    try {
      // Determine the content type of the requested file (if it is a file).
      let type = '';
      if (pathname.endsWith('.css')) {
        type = 'text/css';
      } else if (pathname.endsWith('.js')) {
        type = 'text/javascript';
      } else if (pathname.endsWith('.html')) {
        type = 'text/html';
      } else {
        type = 'text/plain';
      }
      console.log(pathname.substring(1))
      const data = await readFile(pathname.substring(1), 'utf8');

      response.writeHead(200, { 'Content-Type': type });
      response.write(data);
    } catch (err) {
      response.statusCode = 404;
      response.write('Not found: ' + pathname);
    }
    response.end();
  } else {
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: 'Not Found' }));
    response.end();
  }
}

// Start the server on port 3000.
http.createServer(basicServer).listen(3000, () => {
  console.log('Server started on port 3000');
});
