import * as crud from './crud.js';


const user = document.getElementById('userna');
const pass = document.getElementById('passwo');
const pass2 = document.getElementById('passwo2');
const createButton = document.getElementById('create');


createButton.addEventListener('click', async (e) => {



  let checkingthis = true;
  let userexit = false;
  const infoma =  await crud.readAllCounters();
  for(let i = 0; i<infoma.length; ++i){
    if(user.value in JSON.parse(infoma[i])){
      console.log(1)
      userexit = true;
      console.log(userexit)
      break;
    }
  }
  
  if(user.value.trim() === ""){
    setErrorFor(user,"Username can not be blank");
    checkingthis = false;
  }else if (user.value.length<6 || user.value.length>20){
    setErrorFor(user,"Length should be between 6 and 20");
    checkingthis = false;
  }else if(!lettersNumbersSpacesDashes(user.value)){
    setErrorFor(user,"Can not contain special characters");
    checkingthis = false;
  }else if(userexit){
    setErrorFor(user,"Username used");
    checkingthis = false;
  }else{
    setSuceessFor(user);
  }

  if(pass.value.trim() === ""){
    setErrorFor(pass,"Password can not be blank");
    checkingthis = false;
  }else if (pass.value.length<10 || pass.value.length>20){
    setErrorFor(pass,"Length should be between 10 and 20");
    checkingthis = false;
  }else{
    setSuceessFor(pass);
  }

  if(pass2.value.trim() === ""){
    setErrorFor(pass2,"Password2 can not be blank");
    checkingthis = false;
  }else if(pass.value.trim() !== pass2.value.trim()){
    setErrorFor(pass2,"Passwords does not match");
    checkingthis = false;
  }else{
    setSuceessFor(pass2);
  }

  if(!document.getElementById('diao').checked){
    const formControl = document.getElementById('diao').parentElement;
    const small = formControl.querySelector('a');
    small.style.color = '#e74c3c';
    checkingthis = false;
  }else{
    const formControl = document.getElementById('diao').parentElement;
    const small = formControl.querySelector('a');
    small.style.color = 'black';
  }
  //if(document.querySelector)
  if(checkingthis){
    const name = user.value;
    const passw = pass.value;
    await crud.createUser(name,passw);
    location.href = "http://127.0.0.1:5500/sign%20in/index.html";
    //这里我个人认为是3000
  }
});

//这个没弄完，我想着是直接用readalluser，还是哪个，用readAllluser就不会用到readCounter


//for checking error
function setErrorFor(input,message){
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = message;
  small.hidden= false;
  formControl.className = 'form-control error';
}
function setSuceessFor(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.hidden=true;
}

function lettersNumbersSpacesDashes(str) {
  return /^[A-Za-z0-9 -]*$/.test(str);
}

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
});*/
