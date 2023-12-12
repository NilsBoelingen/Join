let sideMenuLinks = ['summary', 'addTask', 'board', 'contacts', 'privacypolicy', 'legalnotice']
let idOfCurrentPage = 6;
let templatesLoaded = false;
const STORAGE_TOKEN = 'RPU0FT0UVM1WMXF2YVD579M9QJN3HJWKW84Z2NEB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let currentUser;
let userContactId;


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
 * This is the General Function to upload informations to the Server.
 * @param {string} key - This is the parameter, to find the informations on the server. 
 * @param {string} value - The value are the imformations to safe. 
 * @returns - Ensures that after the function is called, other functions wait for it.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * This is a function to get the safed informations from the server. 
 * @param {string} key - Is needed do identify the right value.
 * @returns - Ensures that after the function is called, other functions wait for it.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/**
 * This function safes the Tasks on the Server.
 * 
 */
function setTasks() {
    setItem('tasks', dataTasks);
}

/**
 * This function safes the Users on the Server.
 * 
 */
function setUsers() {
    setItem('users', users);
}

/**
 * This function safes the Contacts on the Server.
 * 
 */
function setContacts() {
    setItem('contacts', contacts);
}

/**
 * This function safes the variable of current User on the Server.
 * 
 */
async function setCurrentUser(id) {
    return setItem('currentUser', id);
}

/**
 * This function retrieves the tasks from the server and converts them from a string to a JSON.
 * 
 */
async function getTasks() {
    let data = await getItem('tasks');
    let asJson = data.data.value;
    dataTasks = JSON.parse(asJson);
}

/**
 * This function retrieves the Users from the server and converts them from a string to a JSON.
 * 
 */
async function getUsers() {
    let data = await getItem('users');
    let asJson = data.data.value;
    users = JSON.parse(asJson);
}

/**
 * This function retrieves the current Users from the server.
 * 
 */
async function getCurrentUser() {
    let data = await getItem('currentUser');
    currentUser = data.data.value;
}

/**
 * This function retrieves the Contacts from the server and converts them from a string to a JSON.
 * 
 */
async function getContacts() {
    let data = await getItem('contacts');
    let asJson = data.data.value;
    contacts = JSON.parse(asJson);
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
    return firstnameInitial + lastnameInitial;
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
        let i = getIndexOf(users, 'id', currentUser);
        let nameParts = users[i].name.split(' ');
        let lastname = nameParts.pop() || '';
        let firstname = nameParts.join(' ') || '';
        userInitials.innerText = `${firstname.charAt(0)}${lastname.charAt(0)}`;
    } catch (e) { }
}

/**
 * This function log the user out.
 * 
 */
async function logOut() {
    deleteActuallyUserfromContact();
    await setCurrentUser(-1);
    window.location.href = 'login.html';
}

/**
 * This function push the actually User to the Contact-Array, that the current User can see his own Contact and can assignt to Tasks.
 * 
 */
async function actuallyUserToContacts() {
    let i = getIndexOf(users, 'id', currentUser);
    let user = users[i];
    let nameParts = users[i].name.split(' ');
    let lastname = nameParts.pop() || '';
    let firstname = nameParts.join(' ') || '';
    userContactId = findFreeId(contacts);
    let userArray = {
        id: userContactId,
        'icon': user.icon,
        'firstname': firstname,
        'lastname': lastname + ' (YOU)',
        'email': user.email,
        'phone-number': '',
        'user': true,
    }
    contacts.push(userArray);
    await setContacts();
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
function deleteActuallyUserfromContact() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.user) {
            contacts.splice(i, 1);
            setContacts();
        }
    }
}

/**
 * This function is used to delete Contacts from tasks when the contact is deleted.
 * @param {string} indexOfContact = the parameter is needed to find the right contact to delete. 
 */
function deleteAssignedTasks(indexOfContact) {
    let idToDelete = findIdOfContact(indexOfContact);
    for (let i = 0; i < dataTasks.length; i++) {
        const assignedToIndex = dataTasks[i]['assignedTo'].indexOf(idToDelete);
        if (assignedToIndex !== -1) {
            dataTasks[i]['assignedTo'].splice(assignedToIndex, 1);
            console.log(`Deleted assignment of task ${dataTasks[i].taskId} for contact with id: ${idToDelete}`);
        }
    }
    setTasks();
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