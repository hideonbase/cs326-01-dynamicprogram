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


//function remove all child nodes from a DOM element
export function removeAllChildNodes(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}