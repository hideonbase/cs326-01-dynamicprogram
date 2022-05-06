'use strict';


/**
 *
 * @param username{string}
 */
export function saveUserName(username) {
    localStorage.setItem('username', username);
}

export function saveUserId(id) {
    localStorage.setItem('userid', id);
}


/**
 * @returns {string|null}
 */
export function getUserName() {
    return localStorage.getItem('username');
}

export function getUserId() {
    return parseInt(localStorage.getItem('userid'));
}


export function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userid');

}


//function remove all child nodes from a DOM element
export function removeAllChildNodes(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}