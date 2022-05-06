"use strict"
import {getUserId, getUserName, logout as browserLogout, saveUserName} from "../script/common.js";

let userid = document.getElementById('userid')
let namebar = document.getElementById('Name');
let saveName = document.getElementById('changeName');
let deleteaccount = document.getElementById('deleteacc');
let logout = document.getElementById('logout');


saveName.disabled = true;
saveName.style.cursor = 'unset';
let responseData;

const allinfo = await fetch("/IneedInfo", {
    method: 'POST', headers: {
        'Content-Type': 'application/json',
    }, body: JSON.stringify({
        id: getUserId(),
    })
});
responseData = (await allinfo.json());
if (responseData.code !== 0) {
    alert(responseData.msg);
} else {
    const data = responseData.data;
    userid.value = data.id;
    namebar.value = data.username;
}

saveName.addEventListener('click', async (e) => {
    const response = await fetch('/user/changename', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({name: namebar.value, id: getUserId()}),
    });
    const data = await response.json();


    if (data.code === 0) {
        saveName.disabled = true;
        saveName.style.cursor = 'unset';
        saveName.style.color = 'rgb(82,82,82)';
        saveName.style.backgroundColor = 'rgb(41,39,39)';
        saveName.style.borderColor = 'rgb(51,49,49)';
        saveUserName(namebar.value);
    } else {
        alert(data.msg);
    }
})

deleteaccount.addEventListener('click', async (e) => {
    const response = await fetch('/user/deleteaccount', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({id: getUserId()}),
    });

    const data = await response.json();
    browserLogout();
    if (data.code === 0) {
        window.location.href = '/'
    } else {
        alert(data.msg);
    }
})


logout.addEventListener('click', async (e) => {
    browserLogout();
    window.location.href = '/'
})


namebar.addEventListener('keyup', () => {
    saveName.disabled = false;
    saveName.style.cursor = 'pointer';
    saveName.style.color = 'white';
    saveName.style.backgroundColor = 'rgb(209,54,57)';
    saveName.style.borderColor = 'rgb(209,54,57)'
    if (namebar.value === "") {
        saveName.disabled = true;
        saveName.style.cursor = 'unset';
        saveName.style.color = 'rgb(82,82,82)';
        saveName.style.backgroundColor = 'rgb(41,39,39)'
        saveName.style.borderColor = 'rgb(51,49,49)'
    }
})
