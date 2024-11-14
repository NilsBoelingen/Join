/**
 * This function initializes the application by fetching users, the current user, and displaying the start image.
 * Also, shows the login/signup elements after a delay.
 */
async function init() {
    let session = await JSON.parse(localStorage.getItem('session'));
    let fromLogOut = await JSON.parse(sessionStorage.getItem('fromLogOut'));
    if (session && !fromLogOut) {
        let token = session.token;
        let id = await getUserIdByToken(token);
        curentUserId = id;
        await getCurrentUser();
        window.location.href ='summary.html';
    }
    showLogIn();
}

/**
 * This function initializes the login process by fetching users and the current user.
 */
async function initLogin() {

}

/**
 * This function shows the login and signup elements after a delay.
 */
function showLogIn() {
    setTimeout(() => {
        document.getElementById('sign-up').classList.remove('d-none');
        document.getElementById('log-in').classList.remove('d-none');
        document.getElementById('footer').classList.remove('d-none');
    }, 500);
}

/**
 * This function redirects the user to the signup page.
 */
function signUp() {
    window.location.href = 'register.html';
}

/**
 * This function logs in the user by checking the provided email and password.
 * Redirects to the summary page if the login is successful.
 */
async function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email.length <= 3) {
        alert('Bitte Email eingeben');
    } else {
        if (password.length <= 3) {
            alert('Bitte Passwort eingeben');
        } else {
            const data = await tryLogIn(email, password);
            console.log(data);
            
            if (data) {
                setToLocalStorage(data);
                window.location.href ='summary.html';                
            }
        }
    }
}

/**
 * This function set the userdata to local storage or session storage.
 * When user decide to remember, the data set to local storage, otherwise session storage.
 * 
 * @param {JSON} data - The Userdata for save
 */
function setToLocalStorage(data) {
    let remember = document.getElementById('remember');
    if (remember.checked) {
        localStorage.setItem('session', JSON.stringify(data));
    } else {
        sessionStorage.setItem('session', JSON.stringify(data));
    }
}

/**
 * This function trys to login the user to the application.
 * 
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns 
 */
async function tryLogIn(email, password) {
    try {
        const url = 'http://127.0.0.1:8000/api/auth/login/';
        const body = {
            'email': email,
            'password': password
        }
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        };
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
            handleLoginError(res);
            return;
        }
        return data;  
    } catch (e) {
        handleLoginError(e);
    }
}

/**
 * This function handles the login errors
 * 
 * @param {JSON} error - response from server 
 * @returns 
 */
async function handleLoginError(error) {
    let errorMessageContainer = document.getElementById('login-message-container');
    let errorMessage = document.getElementById('login-message');
    
    if (error.status === 401) {
        errorMessageContainer.classList.remove('d-none');
        errorMessage.innerHTML = 'Password incorrect';
        setTimeout(() => {
            errorMessageContainer.classList.add('d-none');
        }, 1000);
        return;
    }
    if (error.status === 404) { 
        errorMessageContainer.classList.remove('d-none');
        errorMessage.innerHTML = 'E-Mail not found';
        setTimeout(() => {
            errorMessageContainer.classList.add('d-none');
        }, 1000);
        return;
    }
    if (error.status === 500) {
        errorMessageContainer.classList.remove('d-none');
        errorMessage.innerHTML = error.statusText;
        setTimeout(() => {
            errorMessageContainer.classList.add('d-none');
        }, 1000);
        return;
    }

}

/**
 * This function logs in the guest user and redirects to the summary page.
 */
async function guestLogIn() {
    const data = await tryLogIn('guest@guest.com', 'Gast1234');
    if (data) {
        sessionStorage.setItem('session', JSON.stringify(data));
        window.location.href ='summary.html';                
    }
}

/**
 * This function checks if the provided email matches the email of the user at the given index.
 * 
 * @param {number} i - The index of the user in the users array.
 * @param {string} email - The email to compare.
 * @returns {boolean} - True if the emails match, false otherwise.
 */
function checkUser(i, email) {
    return i !== -1 && users[i].email == email;
}

/**
 * This function finds the index of the user with the given email in the users array.
 * 
 * @param {string} email - The email to search for.
 * @returns {number} - The index of the user in the users array.
 */
function getIndexOfUser(email) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (email == user.email) {
            return i;
        }
    }
    return -1;
}

/**
 * This function checks if the provided password matches the password of the user at the given index.
 * 
 * @param {number} i - The index of the user in the users array.
 * @param {string} password - The password to compare.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function checkPasswort(i, password) {
    return users[i].password == password;
}