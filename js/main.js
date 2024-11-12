let sideMenuLinks = ['summary', 'addTask', 'board', 'contacts', 'privacypolicy', 'legalnotice']
let idOfCurrentPage = 6;
let templatesLoaded = false;
const STORAGE_TOKEN = 'RPU0FT0UVM1WMXF2YVD579M9QJN3HJWKW84Z2NEB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let currentUser = 1;
let userContactId;
const local = JSON.parse(localStorage.getItem('session'));
const session = JSON.parse(sessionStorage.getItem('session'));
let token;
let curentUserId;   
if (local) {
    token = local.token;
    curentUserId = local.id;       
}
if (session) {
    token = session.token;
    curentUserId = session.id;       
}
let authHeader;
if (token) {
    authHeader = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Token ${token}` });
} else {
    authHeader = new Headers({ 'Content-Type': 'application/json' });
}


/**
 * This function is used to get the users-informations on all sub-pages.
 * 
 */
async function initOthers() {
    await getUsers();
    await getCurrentUser();
    createHeaderInitials();
    checkLoginStatus();
}

/**
 * This function safes the Tasks on the Server.
 * 
 */
async function setTask(task) {
    const url = 'http://127.0.0.1:8000/api/join/task/';
    const options = {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(task)
    };
    let result = await fetch(url, options);
    if (!result.ok) {
        throw new Error('Failed to save task');
    }
    let data = await result.json();
    return data;
}

async function updateTask(task) {
    const url = `http://127.0.0.1:8000/api/join/task/${task.id}/`;

    const options = {
        method: 'PUT',
        headers: authHeader,
        body: JSON.stringify(task)
    };
    let result = await fetch(url, options);
    if (!result.ok) {
        throw new Error('Failed to update task');
    }
    let data = await result.json();
    return data;
}

async function deleteTaskFromDb(id) {
    const url = `http://127.0.0.1:8000/api/join/task/${id}/`;
    const options = {
        method: 'DELETE',
        headers: authHeader
    };
    let result = await fetch(url, options);
    if (!result.ok) {
        throw new Error('Failed to delete task');
    }
}

async function getUserIdByToken(token) {
    const url = 'http://127.0.0.1:8000/api/auth/token_auth/';
    const payload = { 'token': token };
    const options = {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(payload)
    };
    let data = await fetch(url, options).then(res => res.json());
    if (typeof data === 'number') {
        return data;
    }    
}

/**
 * This function safes the Contacts on the Server.
 * 
 */
async function setContact(contact) {
    const url = 'http://127.0.0.1:8000/api/join/contacts/';
    const payload = {
        'firstname': contact.firstname,
        'lastname': contact.lastname,
        'email': contact.email,
        'icon': contact.icon,
        'phonenumber': contact.phonenumber,
        'user': contact && contact.user ? contact.user : false
    }
    const options = {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(payload)
    }
    await fetch(url, options);
}

/**
 * This function safes the variable of current User on the Server.
 * 
 */
async function setCurrentUser(id) {
    sessionStorage.setItem('currentUser', id);
    return;
}

/**
 * This function retrieves the tasks from the server and converts them from a string to a JSON.
 * 
 */
async function getTasks() {
    let data = await getAllTasks();
    dataTasks = data;
}

async function getAllTasks() {
    const url = 'http://127.0.0.1:8000/api/join/task/';
    const options = {
        method: 'GET',
        headers: authHeader
    }
    let response = await fetch(url, options);
    if (!response.ok) {
        console.log('Error:', result.status);
        return;
    }
    let taskRes = await response.json();
    return taskRes;
}

/**
 * This function retrieves the current Users from the server.
 * 
 */
async function getCurrentUser() {
    const url = `http://127.0.0.1:8000/api/join/user/${curentUserId}`;
    const options = {
        method: 'GET',
        headers: authHeader
    }
    let response = await fetch(url, options);
    if (!response.ok) {
        console.log('Error:', result.status);
        return;
    }
    let userRes = await response.json();
    currentUser = userRes;
    // let data = await getItem('currentUser');
    // currentUser = data.data.value;
}

/**
 * This function retrieves the Contacts from the server and converts them from a string to a JSON.
 * 
 */
async function getContacts() {
    const url = 'http://127.0.0.1:8000/api/join/contacts/'
    
    const options = {
        method: 'GET',
        headers: authHeader
    }
    let result = await fetch(url, options);
    if (!result.ok) {
        console.log('Error:', result.status);
        return;
    }   
    let contactsRes = await result.json();
    contacts = contactsRes;
}

async function updateContact(contact) {
    const url = `http://127.0.0.1:8000/api/join/contacts/${contact.id}/`;
    const payload = {
        'firstname': contact.firstname,
        'lastname': contact.lastname,
        'email': contact.email,
        'icon': contact.icon,
        'phonenumber': contact.phonenumber
    }
    const options = {
        method: 'PUT',
        headers: authHeader,
        body: JSON.stringify(payload)
    }
    await fetch(url, options);
}

async function deleteContactFromDb(contactId) {
    const url = `http://127.0.0.1:8000/api/join/contacts/${contactId}/`;
    const options = {
        method: 'DELETE',
        headers: authHeader
    }
    await fetch(url, options);
}

async function getSummaryData() {
    const url = 'http://127.0.0.1:8000/api/join/summary/';
    const options = {
        method: 'GET',
        headers: authHeader
    }
    let result = await fetch(url, options);
    if (!result.ok) {
        console.log('Error:', result.status);
        return;
    }
    let summaryRes = await result.json();
    summaryData = summaryRes;
}

/**
 * This function is used to including template HTML to other Pages.
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    highlightCurrentPageLink();
    templatesLoaded = true;
}

/**
 * This function open the Menu by clicking on the User-Initial-Icon.
 * 
 */
function openSubMenu() {
    document.getElementById('subMenu').classList.remove('d-none');
}

/**
 * This function close the Menu.
 * 
 */
function closeSubMenu() {
    document.getElementById('subMenu').classList.add('d-none');
}

/**
 * This function set the value of an variable, which Site is current Displayd. Its needed to Highlight the Page Button in the Menu.
 * @param {string} id - This is the id of the current Page
 */
function setIdOfCurrentPage(id) {
    idOfCurrentPage = id;
}

/**
 * This function Highlighted the current Page on Menu
 * 
 * @param {String} id - This parameter is passed when calling the function
 */
function highlightCurrentPageLink() {
    resetHighlight();
    if (idOfCurrentPage < sideMenuLinks.length) {
        document.getElementById(sideMenuLinks[idOfCurrentPage]).classList.add('current');
    };
}

/**
 * This Function reset all Highlights on Menu
 *  
 */
function resetHighlight() {
    sideMenuLinks.forEach((link) => {
        document.getElementById(link).classList.remove('current');
    })
}

/**
 * This function returns the initials of the user.
 * @param {string} user - This parameter refers to the array contacts in arraycontacts.js and should look like this: contacts[0]
 * @returns 
 */
function getUserInitials(user) {
    const firstnameInitial = user.firstname.charAt(0).toUpperCase();
    const lastnameInitial = user.lastname.charAt(0).toUpperCase();
    if (firstnameInitial && lastnameInitial) {
        return firstnameInitial + lastnameInitial;
    } else {
        return user.username.charAt(0).toUpperCase();
    }
}

/**
 * This is an onclick-function on some back-arrows. This function let the user get back to last Page.
 * 
 */
function goBackToLastPage() {
    window.history.back();
}

/**
 * This function iterates to an array and search for an empty id to return.
 * @param {string} array - this is array to search.
 * @returns - give the empty id back.
 */
function findFreeId(array) {
    const sortedArray = array.slice().sort((a, b) => a.id - b.id);
    let previousId = 0;
    for (let element of sortedArray) {
        if (element.id != (previousId + 1)) {
            return previousId + 1;
        }
        previousId = element.id;
    }
    return previousId + 1;
}

/**
 * This function compares the entered parameters with the values ​​in the array in order to return the index if there is a match.
 * @param {string} array - This is the array to find the index
 * @param {string} key - This is the key in which the values ​​are located. 
 * @param {string} x - This is the value to be compared.
 * @returns - Gives the Index of the Element back.
 */
function getIndexOf(array, key, x) {   
    for (let i = 0; i < array.length; i++) {
        const object = array[i];
        const objKey = array[i][key]
        if (x == objKey) {
            return i;
        }
    }
}

/**
 * This function is needed, to create the User initials on the header.
 * 
 */
function createHeaderInitials() {
    try {
        let userInitials = document.getElementById('userInitials');
        let nameParts = currentUser.username.split(' ');
        if (nameParts.length > 1) {
            let lastname = nameParts.pop() || '';
            let firstname = nameParts.join(' ') || '';
            userInitials.innerText = `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
        } else if (nameParts.length < 1) {
            userInitials.innerHTML = '?';
        } else {
            userInitials.innerText = currentUser.username.charAt(0).toUpperCase();
        }
    } catch (e) { }
}

/**
 * This function log the user out.
 * 
 */
async function logOut() {
    await deleteActuallyUserfromContact();
    await setCurrentUser(-1);
    sessionStorage.clear();
    sessionStorage.setItem('fromLogOut', true);
    window.location.href = 'index.html';
}

/**
 * This function push the actually User to the Contact-Array, that the current User can see his own Contact and can assignt to Tasks.
 * 
 */
async function actuallyUserToContacts() {
    let userAsContact = localStorage.getItem('userAsContact');
    
    if (userAsContact) {
        return;
    }
    
    let nameParts = currentUser.username.split(' ');
    let lastname = nameParts.pop() || '';
    let firstname = nameParts.join(' ') || '';
    userContactId = findFreeId(contacts);
    let userArray = {
        'id': userContactId,
        'icon': getRandomColor(),
        'firstname': firstname,
        'lastname': lastname + ' (YOU)',
        'email': currentUser.email,
        'phonenumber': '',
        'user': true,
    }
    localStorage.setItem('userAsContact', true);
    contacts.push(userArray);
    await setContact(userArray);
}

/**
 * This function check that everyone is logged in. Is only needed to show privacy policies and legal notice on login an register whitout menus.
 * 
 */
function checkLoginStatus() {
    if (templatesLoaded) {
        let menuBarMainContainer = document.getElementById('menuBarMainContainer');
        let menuContainer = document.getElementById('menuContainer');
        let headerMenu = document.getElementById('headerMenu');
        if (currentUser == -1) {
            headerMenu.classList.add('d-none')
            if (window.innerWidth <= 970) {
                let mainContainer = document.getElementById('mainContainer');
                mainContainer.style.height = 'calc(100vh - 206px)'
                menuBarMainContainer.classList.add('d-none');
            } else if (window.innerWidth > 970) {
                menuContainer.classList.add('d-none');
            }
        }
    } else {
        setTimeout(() => {
            checkLoginStatus();
        }, 200);
    }
}

/**
 * This function delets the actually User from Contacts-Array. It called when User logged out.
 * 
 */
async function deleteActuallyUserfromContact() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.user) {
            await deleteContactFromDb(contact.id);
            localStorage.removeItem('userAsContact');
        }
    }
}

/**
 * This function is needed to find the right index in Array whit id of contact.
 * @param {string} indexOfContact = this is the index of the contact in array. 
 * @returns 
 */
function findIdOfContact(indexOfContact) {
    if (indexOfContact >= 0 && indexOfContact < contacts.length) {
        const idToDelete = contacts[indexOfContact].id;
        return idToDelete;
    }
}

/**
 * this function delete the user-account. 
 * @param {string} user = this is the user object from contacts-array, that was deletet.
 */
function deleteUser(user) {
    if (user.email !== 'guest@mail.guest') {
        let i = getIndexOf(users, 'email', user.email);
        users.splice(i, 1);
        setUsers();
    }
}

/**
 * This function generates and returns a random color from a predefined set of colors.
 * 
 * @returns {string} - A randomly selected color.
 */
function getRandomColor() {
    let colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B', '#9b1212', '#7a80e8', '#046657', '#869b4c'];
    return colors[Math.floor(Math.random() * colors.length)];
}