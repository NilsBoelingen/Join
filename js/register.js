/**
 * This function redirects the user to the login page.
 */
function backToLogIn() {
    window.location.href = 'login.html';
}


/**
 * This function registers a new user by collecting user input, validating the password match,
 * and adding the user to the users array.
 */
async function register() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm-password');
    let errorContainer = document.getElementById('error-message');
    let signUpMessage = document.getElementById('sign-up-message');
    let bgMessage = document.getElementById('bg-message');

    if (password.value !== confirm_password.value) {
        errorContainer.innerHTML = "The passwords do not match. Please check your input.";
        return;
    } else {
        const user = {
            'username': name.value,
            'email': email.value,
            'password': password.value,
            'repeated_password': confirm_password.value
        }
        errorContainer.innerHTML = "";
        bgMessage.classList.remove('d-none')
        signUpMessage.classList.remove('d-none');
        await tryRegisterUser(user).then((res) => {
            setTimeout(() => {
                signUpMessage.style.transition = "transform 1000ms ease, top 1000ms ease";
                signUpMessage.style.top = "40%";
                signUpMessage.style.zIndex = "5";
            }, 500);
            // users.push({
            //     id: findFreeId(users),
            //     icon: getRandomColor(),
            //     'name': name.value,
            //     'email': email.value,
            //     'password': password.value
            // });
            // setUsers();
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

async function tryRegisterUser(body) {
    const url = 'http://127.0.0.1:8000/api/auth/registration/';
    const payload = body;
    const header = new Headers({ 'Content-Type': 'application/json' });
    const options = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(payload)
    };
    await fetch(url, options).then((response) => {
        return response.json();
    });
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