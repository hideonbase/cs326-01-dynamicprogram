"use strict"
import {logout as browserLogout} from "../script/common.js";

let userid = document.getElementById('userid')
let namebar = document.getElementById('Name');
let saveName = document.getElementById('changeName');
let deleteaccount = document.getElementById('deleteacc');
let logout = document.getElementById('logout');
let address = document.getElementById('addressinput');
let phone = document.getElementById('phonenumber');
let birthday = document.getElementById('birthday');
let savePerson = document.getElementById('personal');

saveName.disabled = true;
saveName.style.cursor = 'unset';
savePerson.disabled = true;
savePerson.style.cursor = 'unset';

let thisuser;

const allinfo = await fetch("/IneedInfo", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});
thisuser = (await allinfo.json());
if (!allinfo.ok) {
    alert(thisuser['error']);
}

userid.value = thisuser['user_id'];
namebar.value = thisuser['name'];
if(('address' in thisuser)){
    address.value = thisuser['address'];
}
if(('phone' in thisuser)){
    phone.value = thisuser['phone'];
}
if(('birthday' in thisuser)){
    birthday.value = thisuser['birthday'];
}

saveName.addEventListener('click', async (e) => {
    const response = await fetch('/user/changename', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: namebar.value}),
    });
    const data = await response.json();
    if (response.ok) {
        savePerson.disabled = true;
        savePerson.style.cursor = 'unset';
        savePerson.style.color = 'rgb(82,82,82)';
        savePerson.style.backgroundColor = 'rgb(41,39,39)';
        savePerson.style.borderColor = 'rgb(51,49,49)';
        return data;
    } else {
        alert(data["error"]);
    }
})
savePerson.addEventListener('click',async (e)=>{
    const response = await fetch('/user/changeperson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({address: address.value,phone:phone.value,birthday:birthday.value}),
    });
    const data = await response.json();
    if (response.ok) {
        saveName.disabled = true;
        saveName.style.cursor = 'unset';
        saveName.style.color = 'rgb(82,82,82)';
        saveName.style.backgroundColor = 'rgb(41,39,39)'
        saveName.style.borderColor = 'rgb(51,49,49)'
        return data;
    } else {
        alert(data["error"]);
    }    
})

deleteaccount.addEventListener('click', async (e) => {
    const response = await fetch('/user/deleteaccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userid.value}),
    });
    const data = await response.json();
    browserLogout();
    if (response.ok) {
        window.location.href = 'http://localhost:3000/'
        return data;
    } else {
        alert(data["error"]);
    }
})


logout.addEventListener('click', async (e) => {
    const response = await fetch('/user/logoutaccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userid.value}),
    });
    const data = await response.json();
    browserLogout();
    if (response.ok) {
        window.location.href = 'http://localhost:3000/'
        return data;
    } else {
        alert(data["error"]);
    }
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
});
address.addEventListener('keyup', () => {
    savePerson.disabled = false;
    savePerson.style.cursor = 'pointer';
    savePerson.style.color = 'white';
    savePerson.style.backgroundColor = 'rgb(209,54,57)';
    savePerson.style.borderColor = 'rgb(209,54,57)'
    if (namebar.value === "") {
        savePerson.disabled = true;
        savePerson.style.cursor = 'unset';
        savePerson.style.color = 'rgb(82,82,82)';
        savePerson.style.backgroundColor = 'rgb(41,39,39)'
        savePerson.style.borderColor = 'rgb(51,49,49)'
    }
});
phone.addEventListener('keyup', () => {
    savePerson.disabled = false;
    savePerson.style.cursor = 'pointer';
    savePerson.style.color = 'white';
    savePerson.style.backgroundColor = 'rgb(209,54,57)';
    savePerson.style.borderColor = 'rgb(209,54,57)'
    if (namebar.value === "") {
        savePerson.disabled = true;
        savePerson.style.cursor = 'unset';
        savePerson.style.color = 'rgb(82,82,82)';
        savePerson.style.backgroundColor = 'rgb(41,39,39)'
        savePerson.style.borderColor = 'rgb(51,49,49)'
    }
});
birthday.addEventListener('keyup', () => {
    savePerson.disabled = false;
    savePerson.style.cursor = 'pointer';
    savePerson.style.color = 'white';
    savePerson.style.backgroundColor = 'rgb(209,54,57)';
    savePerson.style.borderColor = 'rgb(209,54,57)'
    if (namebar.value === "") {
        savePerson.disabled = true;
        savePerson.style.cursor = 'unset';
        savePerson.style.color = 'rgb(82,82,82)';
        savePerson.style.backgroundColor = 'rgb(41,39,39)'
        savePerson.style.borderColor = 'rgb(51,49,49)'
    }
});