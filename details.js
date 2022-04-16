'use strict';

import {getParameterByName} from "./script/common.js";

const title = document.querySelector('#title');
const type = document.querySelector('#type');
const typeImage = document.querySelector('#type-image');
const price = document.querySelector('#price');
const address = document.querySelector('#address');
const area = document.querySelector('#area');
const floor = document.querySelector('#floor');

// get /house/id get house detail
fetch('/house/'+getParameterByName("room_id",window.location.toString())).then(value => value.json()).then(value => {
    if (value.code == 0) {
        title.textContent = value.title;
        type.textContent = value.type;
        typeImage.src = value.typeImage;
        price.textContent = value.price;
        address.textContent = value.address;
        area.textContent = value.area;
        floor.textContent = value.floor;
    } else {
        alert(value.message);
    }
}).catch(reason => {
    alert("Net Work Error");
});