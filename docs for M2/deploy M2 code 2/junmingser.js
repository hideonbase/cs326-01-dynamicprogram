import express from "express";
import { readFile, writeFile } from "fs/promises";
let app = new express.Router();

let likeCounters = {};

const Jfile = 'counter.json';

//load counter
async function likeReload(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    likeCounters = JSON.parse(data);
  } catch (err) {
    likeCounters = {};
  }
}


//save counter
async function likeSaveCounters() {
  try {
    const data = JSON.stringify(likeCounters);
    await writeFile(Jfile, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

//counter Exists
function likeCounterExists(name) {
  return name in likeCounters;
}

//create counter
async function likeCreateCounter(response, name) {
  if (name === undefined) {
    // 400 - Bad Request
    response.status(400).json({ error: 'Counter name is required' });
  } else {
    await likeReload(Jfile);
    likeCounters[name] = 0;
    await likeSaveCounters();
    response.json({ name: name, value: 0 });
  }
}


//Readcounter 
async function likeReadCounter(response, name) {
  await likeReload(Jfile);
  if (likeCounterExists(name)) {
    response.json({ name: name, value: likeCounters[name] });
  } else {
    // 404 - Not Found
    response.json({ error: `likeCounter '${name}' Not Found` });
  }
}


//update counter 
async function likeUpdateCounter(response, name) {
  await likeReload(Jfile);
  if (likeCounterExists(name)) {
    likeCounters[name] += 1;
    await likeSaveCounters();
    response.json({ name: name, value: likeCounters[name] });
  } else {
    // 404 - Not Found
    response.status(404).json({ error: `likeCounter '${name}' Not Found` });
  }
}


// delete counter

async function likeDeleteCounter(response, name) {
  await likeReload(Jfile);
  if (likeCounterExists(name)) {
    const likeCount = likeCounters[name];
    delete likeCounters[name];
    await likeSaveCounters();
    response.json({ name: name, value: likeCount });
  } else {
    // 404 - Not Found
    response.status(404).json({ error: `likeCounter '${name}' Not Found11` });
  }
}


//dump counters
async function likeDumpCounters(response) {
  await likeReload(Jfile);
  response.json(likeCounters);
}
app.post('/likeCreate', async (request, response) => {
  const options = request.body;
  likeCreateCounter(response, options.name);
});



//like read 
app.get('/likeRead', async (request, response) => {
  const options = request.query;
  likeReadCounter(response, options.name);
});



//like update
app.post('/likeUpdate', async (request, response) => {
  const options = request.body;
  likeUpdateCounter(response, options.name);
});


// like delete
app.delete('/likeDelete', async (request, response) => {
  const options = request.body;
  likeDeleteCounter(response, options.name);
});



// like dump
app.get('/likeDump', async (request, response) => {
  const options = request.body;
  likeDumpCounters(response);
});

export default app;