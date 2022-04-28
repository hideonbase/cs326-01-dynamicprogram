import express, { request, response } from "express";
import { readFile, writeFile } from "fs/promises";
// TODO: import the morgan middleware from 'morgan'
import morgan from "morgan";
import house from "./house.js";
import junming from "./junmingser.js";
import jy from "./JY.js";

const rooms_path = "rooms.json";

function readRooms(path){
  return async()=>{
      const rooms_file = await readFile(path,'utf-8');
      console.log(rooms_file);
      return JSON.parse(rooms_file);
  }
}

const getRooms = readRooms(rooms_path);

/*8-16 return all rooms data */

function writeRooms(path){
  return async(room_id,room_data)=>{
    const room_old = await getRooms();
    if(room_id in room_old){
      room_old[room_id] = room_data;
      await writeFile(path,JSON.stringify(room_old),"utf8");
      return true;
    }else{
      return false
    }
  }
}

/*write room information, the argument passed is room_id,room_data */

const setRoom = writeRooms(rooms_path)

// Create the Express app and set the port number.
const app = express(); 
const port = 3000;

// Add Middleware
// 1 使用app.use这个方法 添加中间件到express 实例中Use the app.use method to add middleware to an Express instance
// 2 其中添加的中间件有：The added middleware is:
//   1 json middleware: express.json()得到json中间件实例。json中间件可以把request的body解析为js对象
//   2 urlencoded(Add reference from the express website)
// ...

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// TODO: Add the morgan middleware to the app.
app.use(morgan("dev"));
// TODO: Add the express.static middleware to the app.
app.use("/", express.static("client"));
// used all 4 middlewares

//From JY
app.use("/house",house);
app.use("/",jy);
/*app.use('/signup', express.static('./signup'));
app.use('/signin', express.static('./signin'));
app.use('/userinfo',express.static('./userinfo'));
app.use('/script',express.static('./script'));*/
//End from JY
//junming
app.use("/junming", junming);
//junming

app.get("/rooms", async(request, response) => {
  const id = request.query.room_id;//get data through url
  const rooms_data = await getRooms();//get all rooms data
  if (id == undefined) { //if rooms id is no defined, return all rooms data
    response.json(rooms_data);
  } else {
    response.json(rooms_data[id]);//if rooms id is defined, return specific rooms data
  }
});
//response.json stringify all text 

// add comments API
//Manage the post request, post url is /comment. 
app.post("/comment", async(request, response) => {
  const {room_id,
    user_id,
    content} = request.body; //decapsulate the data from body package
// 房间ID
// 用户ID, merge with JY
// 评论

  const rooms = await getRooms();//get all rooms data
  console.log(rooms)
  if(!(room_id in rooms)){
    response.sendStatus(500); //500 Bad request, if room id is not exist in rooms data
  }
  const room = rooms[room_id];
  if(!room.comment){
    room.comment = [];// if no comments, return a null block
  }
  const date = new Date().getTime();
  room.comment.push({
    user_id,content,date // add the time when it is added from specific user and room.
  })

 const result = await setRoom(room_id,room);
// put the data in to the database rooms.json


 if(!result){ // result true or false
   response.sendStatus(500);
 }else{
   response.sendStatus(200)
 }
})


/* From JY
let users = [];
let currentuser="";
const JSONfile = 'users.json';


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

async function deleteaccountt(response,name){
  await reload(JSONfile);
  if(name === undefined){
    response.status(404).json({error:'id is not valid'});
  }else{
    for(let i = 0; i<users.length; ++i){
      console.log(currentuser)
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
app.post('/user/dump', async (request, response) => {
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

app.post('/IneedInfo',async(request,response) =>{
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

app.post('/user/deleteaccount',async(request,response)=>{
  let deletea = request.body;
  deleteaccountt(response,deletea.name);
})

app.post('/user/logoutaccount', async(request,response) => {
  currentuser = "";
  response.status(201).json({usern:currentuser});
})
//the end from JY*/



// This matches all routes that are not defined.
app.all("*", async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server. Listen the port that is indicated by the admin.
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
