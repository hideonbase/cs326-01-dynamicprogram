import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { response } from 'express';


let users = [];
let currentuser = ;
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

async function createuser(response, name,pass,userid) {
  const eachuser ={};
  eachuser[name] = {name: name, pass:pass, user_id:userid};
  await reload(JSONfile);
  if (name === undefined || pass === undefined) {
    response.status(400).json({ error: 'username or password Required' })
  }else {
    users.push(JSON.stringify(eachuser));
    await saveUsers();
    response.json({ name: name, pass: pass, user_id:userid})
  }
}



async function dumpUsers(response) {
  await reload(JSONfile);
  response.status(201).json(users);
}


const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/signup', express.static('signup'));
app.use('/signin', express.static('signin'));
app.use('/userinfo',express.static('userinfo'));


app.get('/')

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.post('/user/dump', async (request, response) => {
  dumpUsers(response);
});

app.post('/user/create', async (request, response) => {
  const options = request.body;
  createuser(response,options.name,options.pass,options.user_id);
});

app.get('/userlogin', async(request,response) => {
  let theUsernae = request.query.usern;
  console.log(theUsernae);
  response.status(201).json({usern:theUsernae});
})

app.listen(port, () => {
  console.log(`Server started on poart ${port}`);
});
