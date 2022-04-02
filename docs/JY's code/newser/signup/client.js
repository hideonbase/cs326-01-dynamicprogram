import * as crud from './crud.js';

//const nameText = document.getElementById('name');
//const createButton = document.getElementById('create');
//const readButton = document.getElementById('read');
//const updateButton = document.getElementById('update');
//const deleteButton = document.getElementById('delete');
//const output = document.getElementById('output');
//const all = document.getElementById('all');


const user = document.getElementById('userna');
const pass = document.getElementById('passwo');
const createButton = document.getElementById('create');

/*async function allCounters() {
  const json = await crud.readAllCounters();
  all.innerHTML = JSON.stringify(json);
}*/

createButton.addEventListener('click', async (e) => {
  const name = user.value;
  const passw = pass.value;
  
  await crud.createCounter(name,passw);
 // output.innerHTML = JSON.stringify(json);
 // await allCounters();
});


//可能用来更新信息
/*updateButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.updateCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});*/


//这个可以用来注销
/*deleteButton.addEventListener('click', async (e) => {
  const name = nameText.value;
  const json = await crud.deleteCounter(name);
  output.innerHTML = JSON.stringify(json);
  await allCounters();
});

allCounters();*/
