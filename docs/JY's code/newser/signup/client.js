import * as crud from './crud.js';


const user = document.getElementById('userna');
const pass = document.getElementById('passwo');
const createButton = document.getElementById('create');

const readButton = document.getElementById('justSignin');

createButton.addEventListener('click', async (e) => {
  const name = user.value;
  const passw = pass.value;
  await crud.createUser(name,passw);
});


//这个没弄完，我想着是直接用readalluser，还是哪个，用readAllluser就不会用到readCounter
readButton.addEventListener('click', async(e)=>{
  const name = user.value;
  const infoma =  await crud.readCounter(name);
  console.log(JSON.parse(infoma[0]));
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
