import * as crud from '../signup/crud.js';

let a = document.getElementById('input1');
let b = document.getElementById('input2');
let c = document.getElementById('go');
let ustext = document.getElementById('usernametext');
let patext = document.getElementById('paswordtext');




c.addEventListener('click',async(e)=>{

    const usern = a.value;
    const passw = b.value;
    let userexit = false;
    const infoma =  await crud.readAllusers();
      for(let i = 0; i<infoma.length; ++i){
        if(usern in JSON.parse(infoma[i])){
          if(JSON.parse(infoma[i])[usern]["pass"] === passw){
            userexit = true;
          }
          break;
        }
      }
    if(userexit === false){
        setErrorFor()
    }else{
      setSuceessFor();
      const startlogin = await fetch(`/user/login?usern=${usern}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: usern}),
      });
        if(!startlogin.ok){
          return;
        }
       window.location.href='http://127.0.0.1:3000/userinfo/imUser.html'
    }
})





a.addEventListener('keyup',doubleadd1);
function doubleadd1(){
    b.addEventListener('keyup',colorchange1);
}

b.addEventListener('keyup',doubleadd2);
function doubleadd2(){
    a.addEventListener('keyup',colorchange1);
}
function colorchange1(){
    c.style.color = 'white';
    c.style.backgroundColor ="#00BFFF";
    c.style.borderColor='white';
    colorchange2();
}

function colorchange2(){
    if(a.value === ""|| b.value ===""){
        c.style.color='#D3D3D3';
        c.style.backgroundColor ="white";
        c.style.borderColor='#D3D3D3';
    }
}

function setErrorFor(){
  const formControl = document.getElementById("caole").parentElement;
  formControl.className = 'incorrect error';
  const small = formControl.querySelector('small');
  small.hidden= false;
  const formControl1 = a.parentElement;
  formControl1.className = 'wrapper error'
  const formControl2 = b.parentElement;
  formControl2.className = 'wrapper error'
  ustext.style.color = "rgb(205, 96, 216)"
  patext.style.color = "rgb(205, 96, 216)"
}
function setSuceessFor(){
  const formControl = document.getElementById("caole").parentElement;
  formControl.className = 'incorrect success';
  const small = formControl.querySelector('small');
  small.hidden=true;
  const formControl1 = a.parentElement;
  formControl1.className = 'wrapper success'
  const formControl2 = b.parentElement;
  formControl2.className = 'wrapper success'
  ustext.style.color = "rgb(105, 105, 105)"
  patext.style.color = "rgb(105, 105, 105)"
}
