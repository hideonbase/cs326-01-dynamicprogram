'use strict'


import {saveUserName} from "./common.js";

const username=document.getElementById('username');
const password=document.getElementById('password');
const telephone=document.getElementById('telephone');
const nickname=document.getElementById('nickname');
const linkCreateAccount=document.getElementById('linkCreateAccount');



linkCreateAccount.addEventListener('click', function (e) {
    const requestBody={
        username:username.value,
        password:password.value,
        telephone:telephone.value,
        nickname:nickname.value
    };
    fetch('/customer',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(requestBody)
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.code==0){
            alert('register success');
            saveUserName(username.value);
            window.location.href='/';
        }else{
            alert(json.message);
        }
    }).catch(function(e){
        alert("Server Error");
    });
    e.preventDefault();
});