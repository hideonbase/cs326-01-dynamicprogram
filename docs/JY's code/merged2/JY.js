import express from "express";
import { readFile, writeFile } from "fs/promises";
let app = new express.Router();

let users = [];
let currentuser="";
const JSONfile = 'users.json';

app.use('/signup', express.static('./signup'));
app.use('/signin', express.static('./signin'));
app.use('/userinfo',express.static('./userinfo'));
app.use('/script',express.static('./script'));

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
    return JSON.parse(users[i]);
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

async function changeusername(response,name){
    await reload(JSONfile);
    if(name === undefined){
      response.status(404).json({error:'name is not valid'});
    }else{
      for(let i = 0; i<users.length; ++i){
        if(currentuser in JSON.parse(users[i])){
          let obj = JSON.parse(users[i])
          obj[currentuser]['name'] = name;
          users[i] = JSON.stringify(obj);
          break;
        }
       }
       await saveUsers();
       response.json({ newname: name})
    }
}

async function changepersonalinfo(response,address,phone,birthday){
  await reload(JSONfile);
  if(address === undefined||phone === undefined|| birthday === undefined){
    response.status(404).json({error:'address or phone number or birthday is not valid'});
  }else{
    for(let i = 0; i<users.length; ++i){
      if(currentuser in JSON.parse(users[i])){
        let obj = JSON.parse(users[i])
        obj[currentuser]['address'] = address;
        obj[currentuser]['phone'] = phone;
        obj[currentuser]['birthday'] = birthday;
        users[i] = JSON.stringify(obj);
        break;
      }
     }
     await saveUsers();
     response.json({ address: address,phone:phone,birthday:birthday})
  }
}


async function deleteaccountt(response,name){
  await reload(JSONfile);
  if(name === undefined){
    response.status(404).json({error:'id is not valid'});
  }else{
    for(let i = 0; i<users.length; ++i){
      if(currentuser in JSON.parse(users[i])){
        users.splice(i,1);
        currentuser = "";
        break;
      }
     }
     await saveUsers();
     response.json({ deletename: currentuser})
  }
}


async function dumpUsers(response) {
  await reload(JSONfile);
  response.status(201).json(users);
}
app.get('/user/dump', async (request, response) => {
  dumpUsers(response);
});

app.post('/user/create', async (request, response) => {
  const options = request.body;
  createuser(response,options.name,options.pass,options.user_id);
});

app.post('/user/login', async(request,response) => {
  let theUsername = request.body;
  currentuser = theUsername.name;
  response.status(201).json({usern:theUsername.name});
})

app.get('/IneedInfo',async(request,response) =>{
  if(currentuser !== ""){
    response.status(201).json(userExists(currentuser)[currentuser]);
  }else{
    response.status(400).json({error: "please sign in"})
  }
})

app.post('/user/changename', async(request,response)=>{
  let newusername = request.body;
  if(currentuser !==""){
    changeusername(response,newusername.name);
  }else{
    response.json({error: "please sign in"})
  }
})
app.post('/user/changeperson', async(request,response)=>{
  let newinfo = request.body;
  if(currentuser !==""){
    changepersonalinfo(response,newinfo.address,newinfo.phone,newinfo.birthday);
  }else{
    response.json({error: "please sign in"})
  }
})
app.post('/user/deleteaccount',async(request,response)=>{
  let deletea = request.body;
  deleteaccountt(response,deletea.name);
})

app.post('/user/logoutaccount', async(request,response) => {
  currentuser = "";
  response.status(201).json({usern:currentuser});
})

export default app;