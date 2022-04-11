"use strict"
let userid = document.getElementById('userid')
let namebar = document.getElementById('Name');
let saveName = document.getElementById('changeName');
let deleteaccount = document.getElementById('deleteacc');

saveName.disabled = true;
saveName.style.cursor = 'unset';
let thisuser;

const allinfo = await fetch("/IneedInfo",{
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
});
thisuser = (await allinfo.json());
if(!allinfo.ok){
    alert(thisuser['error']);
}

userid.value= thisuser['user_id'];
namebar.value = thisuser['name'];


saveName.addEventListener('click', async (e) =>{
    const response = await fetch('/user/changename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: namebar.value}),
      });
      const data = await response.json();
      if(response.ok){
        saveName.disabled = true;
        saveName.style.cursor = 'unset';
        saveName.style.color = 'rgb(82,82,82)';
        saveName.style.backgroundColor ='rgb(41,39,39)'
        saveName.style.borderColor = 'rgb(51,49,49)'
        return data;
      }else{
        alert(data["error"]);
      }
})

deleteaccount.addEventListener('click', async(e)=>{
    const response = await fetch('/user/deleteaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userid.value}),
      });
      const data = await response.json();
      if(response.ok){
        window.location.href='http://127.0.0.1:3000/signin/index.html'
        return data;
      }else{
        alert(data["error"]);
      }
})









namebar.addEventListener('keyup',()=>{
    saveName.disabled = false;
    saveName.style.cursor = 'pointer';
    saveName.style.color = 'white';
    saveName.style.backgroundColor ='rgb(209,54,57)';
    saveName.style.borderColor = 'rgb(209,54,57)'
    if(namebar.value === ""){
        saveName.disabled = true;
        saveName.style.cursor = 'unset';
        saveName.style.color = 'rgb(82,82,82)';
        saveName.style.backgroundColor ='rgb(41,39,39)'
        saveName.style.borderColor = 'rgb(51,49,49)'
    }
})
