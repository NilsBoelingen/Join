/**
 * This function displays the "Add new contact" form and the background overlay.
 */
function addNewContact() {
  showAddNewContact();
  let bgMessage = document.getElementById("bg-message");
  bgMessage.classList.remove("d-none");

  let addNewContact = document.getElementById("add-new-contact");

  addNewContact.innerHTML = generatAddNewContactHTML();
}

/**
 * This function shows the add new contact form with a sliding animation based on the screen width.
 */
function showAddNewContact() {
  if (window.innerWidth > 870) {
    let addNewContact = document.getElementById("add-new-contact");
    addNewContact.style.transform = "translate(500%, 0%)";
    setTimeout(() => {
      addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
      addNewContact.style.transform = "translate(0%, 0%)";
    }, 200);
  }
  if (window.innerWidth <= 870) {
    let addNewContact = document.getElementById("add-new-contact");
    addNewContact.style.transform = "translate(0%, 500%)";
    setTimeout(() => {
      addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
      addNewContact.style.transform = "translate(0%, 0%)";
    }, 200);
  }
}

/**
 * This function closes the add new contact form with a sliding animation based on the screen width.
 */
function closeAddNewContact() {
  if (window.innerWidth > 870) {
    hidenAddNewContact();
    setTimeout(() => {
      let bgMessage = document.getElementById("bg-message");
      bgMessage.classList.add("d-none");
    }, 500);
  }
  if (window.innerWidth <= 870) {
    hidenAddNewContact();
    setTimeout(() => {
      let bgMessage = document.getElementById("bg-message");
      bgMessage.classList.add("d-none");
    }, 500);
  }
}

/**
 * This function closes the dialog "Create New Contact" on "Add Task".
 */
function closeAddNewContactAddTask() {
  hidenAddNewContact();
  setTimeout(() => {
    let bgMessage = document.getElementById("bg-message");
    bgMessage.classList.add("d-none");
    // loadContactsToAssign();
    // openContactList();
  }, 500);
}

/**
 * This function hides the add new contact form with a sliding animation based on the screen width.
 */
function hidenAddNewContact() {
  if (window.innerWidth > 870) {
    let addNewContact = document.getElementById("add-new-contact");
    setTimeout(() => {
      addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
      addNewContact.style.transform = "translate(500%, 0%)";
    }, 200);
  }
  if (window.innerWidth <= 870) {
    let addNewContact = document.getElementById("add-new-contact");
    setTimeout(() => {
      addNewContact.style.transition = "transform 300ms ease, top 300ms ease";
      addNewContact.style.transform = "translate(0%, 500%)";
    }, 200);
  }
}

/**
 * This function creates a new contact based on the input values and adds it to the contacts array.
 * Displays an alert if the email format is invalid.
 */
function createNewContact() {
  let nameInput = document.getElementById("nameInput");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");
  let nameParts = nameInput.value.split(" ");
  let firstname = nameParts[0] || "";
  let lastname = nameParts.slice(1).join(" ") || "";

  let newContact = {
    id: findFreeId(contacts),
    icon: getRandomColor(),
    firstname: firstname,
    lastname: lastname,
    email: emailInput.value,
    "phone-number": phoneInput.value,
  };
  if (idOfCurrentPage == 3) {
    pushNewContact(newContact);
  } else if (idOfCurrentPage == 1 || idOfCurrentPage == 2) {
    pushNewContactAddTask(newContact);
  }
}

/**
 * This function adds a new contact to the contacts array, sets the contacts, and triggers additional actions.
 *
 * @param {object} newContact - The new contact to be added.
 * @param {string} newContact.id - The unique identifier for the new contact.
 * @param {string} newContact.icon - The color code for the contact icon.
 * @param {string} newContact.firstname - The first name of the contact.
 * @param {string} newContact.lastname - The last name of the contact.
 * @param {string} newContact.email - The email address of the contact.
 * @param {string} newContact ['phone-number'] - The phone number of the contact.
 */
async function pushNewContact(newContact) {
  contacts.push(newContact);
  await setContacts();
  loadContactList();
  createNewContactMessage();
  setTimeout(() => {
    showContact(newContact.id);
    closeAddNewContact();
  }, 100);
}

/**
 * This function pushes a new contact to the array contacts if the contact comes from Add Task.
 * 
 * @param {object} newContact - Contains the values of the new contact.
 */
function pushNewContactAddTask(newContact) {
  contacts.push(newContact);
  setContacts();
  selectedContacts.push(newContact.id);
  createNewContactMessage();
  loadContactsToAssign();
  renderContactInitialIcons();
  closeAddNewContact();
  openContactList();
}

/**
 * This function generates a random color code for the contact icon.
 *
 * @returns {string} A random color code.
 */
function getRandomColor() {
  let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B", "#9b1212", "#7a80e8", "#046657", "#869b4c"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * This function creates a new contact and displays a success message.
 */
function createNewContactMessage() {
  let createNewContact = document.getElementById("create-new-contact");

  showMessage(createNewContact);
  hidenMessage(createNewContact);
}

/**
 * This function displays a message with a sliding animation.
 *
 * @param {HTMLElement} element - The HTML element to be displayed.
 */
function showMessage(createNewContact) {
  createNewContact.style.transform = "translate(500%, 0%)";
  createNewContact.classList.remove("d-none");
  setTimeout(() => {
    createNewContact.style.transition = "transform 300ms ease, top 300ms ease";
    createNewContact.style.transform = "translate(0%, 0%)";
  }, 800);
}

/**
 * This function hides a message with a sliding animation.
 *
 * @param {HTMLElement} element - The HTML element to be hidden.
 */
function hidenMessage(createNewContact) {
  setTimeout(() => {
    createNewContact.style.transition = "transform 800ms ease, top 800ms ease";
    createNewContact.style.transform = "translate(500%, 0%)";
  }, 2500);
}

/**
 * This function ensures that the dialog is not closed when saving a subtask.
 * @param {*} event = The close event from parent.
 */
function doNotTriggerEvent(event) {
  event.stopPropagation();
}