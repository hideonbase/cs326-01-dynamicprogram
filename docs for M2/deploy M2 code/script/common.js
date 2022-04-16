'use strict';


/**
 *
 * @param username{string}
 */
export function saveUserName(username) {
    localStorage.setItem('username', username);
}


/**
 * @returns {string|null}
 */
export function getUserName() {
    return localStorage.getItem('username');
}


export function logout() {
    localStorage.removeItem('username');
}

//function to extract query string parameters
export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//function remove all child nodes from a DOM element
export function removeAllChildNodes(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}