import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';


let users = [];

const JSONfile = 'users.json';

// NOTE: We changed the content type from text/html to application/json.
const headerFields = { 'Content-Type': 'application/json' };

async function reload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    users = JSON.parse(data);
  } catch (err) {
    users =[];
  }
}

async function saveUsers() {
  try {
    const data = JSON.stringify(users);
    await writeFile(JSONfile, data, { encoding: 'utf8' });
  } catch (err) { 
    console.log(err);
  }
}

function userExists(name) {
 let returnthis = false;
 for(let i = 0; i<users.length; ++i){
  if(name in JSON.parse(users[i])){
    return true;
  }
 }
 return returnthis;
}

async function createuser(response, name,pass) {
  const eachuser ={};
  eachuser[name] = {name: name, pass:pass};
  await reload(JSONfile);
  if (name === undefined || pass === undefined) {
    response.status(400).json({ error: 'username or password Required' })
  }else {
    users.push(JSON.stringify(eachuser));
    await saveUsers();
    response.json({ name: name, pass: pass })
  }
}

/*async function readCounter(response, name) {
  await reload(JSONfile);
  if (userExists(name)) {
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: users }));
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
    users[name] = users[name]+1;
    await saveCounters();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: users[0] }));
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
    delete users[name];
    await saveCounters();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ name: name, value: users[name]}));
    response.end();
  } else {
    // 404 - Not Found
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: `Counter '${name}' Not Found` }));
    response.end();
  }
}*/

async function dumpUsers(response) {
  await reload(JSONfile);
  response.status(201).json(users);
}

/*async function basicServer(request, response) {
  const parsedURL = url.parse(request.url, true);
  const options = parsedURL.query;
  const pathname = parsedURL.pathname;
  const method = request.method;
  if (method == 'POST' && pathname.startsWith('/user/create')) {
    createuser(response, options.name, options.pass);
  } else if (method == 'GET' && pathname.startsWith('/user/read?')) {
    readCounter(response, options.name);
  }else if (method == 'POST' && pathname.startsWith('/user/update')) {
    updateCounter(response, options.name);
  }else if (method == 'DELETE' && pathname.startsWith('/user/delete')) {
    deleteCounter(response, options.name);
  } else if (method == 'GET' && pathname.startsWith('/user/dump')) {
    dumpCounters(response);
  } else if (method == 'GET' && (pathname.startsWith('/signup') || pathname.startsWith('/signin'))) {
    try {
      // Determine the content type of the requested file (if it is a file).
      let type = '';
      if (pathname.endsWith('.css')) {
        type = 'text/css';
      } else if (pathname.endsWith('.js')) {
        type = 'text/javascript';
      } else if (pathname.endsWith('.html')) {
        type = 'text/html';
      } else if (pathname.endsWith('.jpg')){//i don't know what to do
        type = 'image/jpeg';
      } else {
        type = 'text/plain';
      }
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
});*/

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/signup', express.static('signup'));
app.use('/signin', express.static('signin'));
app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.post('/user/dump', async (request, response) => {
  dumpUsers(response);
});



app.post('/user/create', async (request, response) => {
  const options = request.body;
  createuser(response,options.name,options.pass);
});



app.listen(port, () => {
  console.log(`Server started on poart ${port}`);
});
