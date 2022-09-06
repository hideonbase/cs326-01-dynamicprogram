'use strict';

import {getUserName, logout, removeAllChildNodes} from "./common.js";

const signUpButton = document.getElementById('signUp');
const sinInButton = document.getElementById('signIn');
const searchButton = document.getElementById('search');


/**
 * find parent element which class list has item
 * @param element
 */
function findParentItem(element) {
    let parent = element.parentElement;
    while (!!parent && !parent.classList.contains('item')) {
        parent = parent.parentElement;
    }
    return parent;
}

const userName = getUserName();
if (userName) {
    signUpButton.innerText = 'Update'
    signUpButton.href = './userinfo/imUser.html';

    sinInButton.innerText = 'Logout'
    sinInButton.href = '#';

    sinInButton.addEventListener('click', () => {
        logout();
        window.location.href = './index.html';
    });

    const favourite = document.createElement("a");
    favourite.textContent = "Favourite";
    favourite.href = 'favourite.html';
    sinInButton.parentElement.append(favourite);
} else {
    alert("You Have Not Login");
    window.location.href = './index.html';
}


function toggle_fav(e) {
    e.stopPropagation();
    e.preventDefault();
    const classList = e.target.classList;
    const name = userName;

    const permission = {name}


    if (classList.contains('favon')) {
        fetch(`/house/favorite/${e.target.dataset["id"]}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(permission)
        })
            .then(res => res.json())
            .then(res => {
                if (res.code == 0) {
                    classList.toggle('favon');
                    const itemRoot = findParentItem(e.target);
                    if (itemRoot) {
                        itemRoot.remove();
                    }
                } else {
                    alert("un fav fail");
                }
            })
            .catch(err => {
                alert("Server OR Network Error");
            });
    } else {
        fetch(`/house/favorite/${e.target.dataset["id"]}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(permission)
        })
            .then(res => res.json())
            .then(res => {
                if (res.code == 0) {
                    classList.toggle('favon');
                } else {
                    alert("fav fail");
                }
            })
            .catch(err => {
                alert("Server OR Network Error");
            });
    }


}


function render_house_list(value) {
    const root = document.getElementById('item-list');
    removeAllChildNodes(root);
    if (value.code == 0) {
        const list = value.data;
        for (let item of list) {
            const template = `<figure class="item"> <a href="details.html?room_id=${item.id}"> <img src="${item.cover}"> <figcaption class="name">${item.title}<span class="fav ${userName ? (item.fav ? 'favon' : '') : 'd-none'}" data-id="${item.id}"></span></figcaption> </a> </figure>`;
            root.innerHTML += template;
        }
        Array.from(root.children).map(item => {
            return item.querySelector(".fav");
        }).forEach(item => {
            item.addEventListener('click', toggle_fav);
        });
    } else {
        alert("Server Report An Error");
    }
}

window.onload = function () {
    const name = {name: userName};
    fetch('/house/favourite', {
        method: "POST", body: JSON.stringify(name),
    }).then(value => value.json()).then(render_house_list).catch(reason => {
        alert("Server Error");
    });
};


searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const keyword = document.getElementById('keyword').value;
    if (keyword) {
        fetch('/house/search').then(value => value.json()).then(render_house_list).catch(reason => {
            alert("Server Error");
        });
    } else {
        alert("Please Input Keyword");
    }

});