import * as crud from './crud.js';


const user = document.getElementById('userna');
const pass = document.getElementById('passwo');
const pass2 = document.getElementById('passwo2');
const createButton = document.getElementById('create');
const trans = document.getElementById('transfer');

let id = 0;
restoreID();
createButton.addEventListener('click', async (e) => {
  let checkingthis = true;
  let userexit = false;
  
const infoma =  await crud.readAllusers();
  for(let i = 0; i<infoma.length; ++i){
    if(user.value in JSON.parse(infoma[i])){
      userexit = true;
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

  if(checkingthis){
    const name = user.value;
    const passw = pass.value;
    await crud.createUser(name,passw,id);
    id++;
    saveid();
    window.location.href = "/signin/index.html";
  }
});

trans.addEventListener('click',async (e)=>{
  window.location.href = "/signin/index.html";
})

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

function saveid(){
  window.localStorage.setItem('thisID', JSON.stringify({getid:id}));
}
function restoreID(){
  let theID = window.localStorage.getItem('thisID');
  if(theID){
    let gettheID = JSON.parse(theID);
    id = gettheID.getid;
  }
}
