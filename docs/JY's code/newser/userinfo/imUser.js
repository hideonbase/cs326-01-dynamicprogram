"use strict"

let namebar = document.getElementById('Name');
let saveName = document.getElementById('changeName');
saveName.disabled = true;
saveName.style.cursor = 'unset';

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
