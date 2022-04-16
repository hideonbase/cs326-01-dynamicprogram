'use strict';

import {saveUserName} from "./common.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");


submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (username.value == "") {
        alert("Please enter username");
    } else if (password.value == "") {
        alert("Please enter password");
    } else {


        //post /customer login
        fetch("/customer", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                username: username.value, password: password.value
            })
        }).then(function (response) {
            if (response.status == 200) {
                saveUserName(username.value);
                window.location.href = "/";
            } else {
                alert("Login Failed");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Server Error")
        });
    }
});