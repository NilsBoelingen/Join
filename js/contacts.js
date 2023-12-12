let contactOpen = false;
let IdOfCurrentContact;

/**
 * This function initializes the application by fetching users, the current user, contacts, and tasks.
 * Also performs additional setup tasks, such as associating users with contacts,
 * creating header initials, and loading the contact list.
 */
async function init() {
  await getUsers();
  await getCurrentUser();
  await getContacts();
  await getTasks();
  createHeaderInitials();
  loadContactList();
}

/**
 * This function searches for the width of the window.
 */
window.addEventListener("resize", loadContactList);

/**
 * This function loads the contact list based on the window width.
 * Sorts contacts alphabetically and displays them with initial letter headers.
 * Highlights the selected contact if it is specified.
 */
function loadContactList() {
  if (window.innerWidth > 870) {
    let contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    let currentLetter = "";
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const firstLetter = contact.firstname.charAt(0).toUpperCase();
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        contactList.innerHTML += generatCurrenLetterHTML(i, currentLetter);
      }
      contactList.innerHTML += generatContactListHTML(i);
    }
    hideContact();
    document.getElementById("headline").classList.remove("d-none");
    document.getElementById("contact-list").classList.remove("d-none");
  }
  if (window.innerWidth <= 870) {
    loadContactListMobil();
  }
  if (contactOpen) {
    showContact(IdOfCurrentContact);
  }
}


/**
 * This function highlights a contact by adding the 'cont-clickt' class to its HTML element.
 *
 * @param {string} id - The unique identifier of the contact to highlight.
 */
function highlightContact(id) {
  let highlight = document.getElementById(`cont${id}`);
  highlight.classList.toggle("cont-clickt");
}

/**
 * This function loads the mobile version of the contact list.
 * Sorts contacts alphabetically, hides the contact list on the desktop,
 * and removes the 'cont-clickt' class from all contact elements.
 */
function loadContactListMobil() {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";
  contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
  let currentLetter = "";
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.firstname.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      contactList.innerHTML += generatCurrenLetterHTML(i, currentLetter);
    }
    contactList.innerHTML += generatContactListHTML(i);
    let highlight = document.getElementById(`cont${contact.id}`);
    highlight.classList.remove("cont-clickt");
    showHideHeadline();
  }
}

/**
 * This function checks if a contact is open. If not, the class d-none is added.
 */
function showHideHeadline() {
  if (!contactOpen) {
    document.getElementById("headline").classList.add("d-none");
  }
}

/**
 * This function retrieves the index of a contact in the contacts array based on its ID.
 *
 * @param {string} contactId - The unique identifier of the contact.
 * @returns {number} - The index of the contact in the contacts array.
 */
function getIndexById(contactId) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === contactId) {
      return i;
    }
  }
}

/**
 * This function shows the contact details based on the window width.
 * Loads the contact list and highlights the selected contact on desktops,
 * or shows the mobile version of the contact details on smaller screens.
 *
 * @param {string} id - The unique identifier of the contact to show.
 */
function showContact(id) {
  IdOfCurrentContact = id;
  contactOpen = true;
  if (window.innerWidth > 870) {
    let i = getIndexById(id);
    let contact = contacts[i];
    let showcontact = document.getElementById("show-contact");
    let info = document.getElementById("info");
    let name = document.getElementById("name");
    hideContact(i);
    showcontact.classList.remove("d-none");
    name.innerHTML = generatShowContactNameHTML(i, contact);
    info.innerHTML = generatInfoHTML(contact);
    unhighlightContacts();
    highlightContact(id);
    animationShowContact();
  }
  if (window.innerWidth <= 870) {
    showContactMobil(id);
  }
}

/**
 * This function unhighlights the contacts. It is needed in case the window is rezized.
 */
function unhighlightContacts() {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let highlight = document.getElementById(`cont${contact.id}`);
    highlight.classList.remove("cont-clickt");
  }
}

/**
 * This function shows the mobile version of the contact details.
 * Hides the contact list and displays the selected contact's information.
 *
 * @param {string} id - The unique identifier of the contact to show.
 */
function showContactMobil(id) {
  IdOfCurrentContact = id;
  contactOpen = true;
  let i = getIndexById(id);
  let contact = contacts[i];
  let btnAddNewCont = document.getElementById("btn-add-new-cont-mobil");
  let contactList = document.getElementById("contact-list");
  let headline = document.getElementById("headline");
  let showcontact = document.getElementById("show-contact");
  let name = document.getElementById("name");
  let info = document.getElementById("info");
  btnAddNewCont.classList.add("d-none");
  contactList.classList.add("d-none");
  headline.style.display = "flex";
  headline.classList.remove("d-none");
  showcontact.classList.remove("d-none");
  showcontact.style.transform = "translate(0%, 0%)";
  name.innerHTML = generatShowContactNameMobilHTML(contact);
  info.innerHTML = generatInfoHTML(contact);
}

/**
 * This function navigates back to the contact list view from the contact details view.
 * Restores the visibility of the contact list, headline, and the 'Add New Contact' button,
 * and hides the contact details view.
 */
function backToContactlist() {
  contactOpen = false;
  let btnAddNewCont = document.getElementById("btn-add-new-cont-mobil");
  let contactList = document.getElementById("contact-list");
  let headline = document.getElementById("headline");
  let showcontact = document.getElementById("show-contact");
  let bgContFunction = document.getElementById("bg-cont-function");

  btnAddNewCont.classList.remove("d-none");
  contactList.classList.remove("d-none");
  headline.style.display = "none";
  showcontact.classList.add("d-none");

  loadContactListMobil();
  if (!bgContFunction.classList.contains("d-none")) {
    hideContFunction();
  }
}

/**
 * This function displays the contact function menu for a specific contact.
 *
 * @param {string} id - The unique identifier of the contact.
 */
function showContFunction(id) {
  const indexOfContact = getIndexById(id);
  let showContFunction = document.getElementById("bg-cont-function");
  showContFunction.classList.remove("d-none");
  showContFunction.innerHTML = generatShowContFunctionHTML(id, indexOfContact);
  animationShowContFunction();
}

/**
 * This function animates the appearance of the contact function menu.
 */
function animationShowContFunction() {
  let showContFunction = document.getElementById("show-cont-function");
  setTimeout(() => {
    showContFunction.style.transition = "transform 300ms ease, top 300ms ease";
    showContFunction.style.transform = "translate(0%, 0%)";
  }, 300);
}

/**
 * This function hides the contact function menu with a sliding animation.
 */
function hideContFunction() {
  let showContFunction = document.getElementById("show-cont-function");
  let bgContFunction = document.getElementById("bg-cont-function");
  setTimeout(() => {
    showContFunction.style.transition = "transform 300ms ease, top 300ms ease";
    showContFunction.style.transform = "translate(500%, 0%)";
  }, 300);
  bgContFunction.classList.add("d-none");
}

/**
 * This function animates the appearance of the contact details view.
 */
function animationShowContact() {
  let showcontact = document.getElementById("show-contact");
  setTimeout(() => {
    showcontact.style.transition = "transform 300ms ease, top 300ms ease";
    showcontact.style.transform = "translate(0%, 0%)";
  }, 300);
}

/**
 * This function hides the contact details view with a sliding animation.
 */
function hideContact() {
  let showcontact = document.getElementById("show-contact");
  showcontact.classList.add("d-none");
  showcontact.style.transform = "translate(500%, 0%)";
}

/**
 * This function initiates the process of editing a contact by displaying the 'Add New Contact' form
 * with the information of the selected contact pre-filled.
 *
 * @param {string} index - Index of contact in Array contacts.
 */
function editContact(index) {
  showAddNewContact();
  let bgMessage = document.getElementById("bg-message");
  bgMessage.classList.remove("d-none");
  let addNewContact = document.getElementById("add-new-contact");
  let contact = contacts[index];
  addNewContact.innerHTML = generatEditContactHTML(contact);
}

/**
 * This function saves the changes made to an existing contact after editing.
 * Validates the email format and updates the contact in the contacts array.
 *
 * @param {string} id - The unique identifier of the contact being edited.
 */
function editOldContact(id) {
  const contactIndex = contacts.findIndex((c) => c.id === id);
  let contact = contacts[contactIndex];
  let nameInput = document.getElementById("edit-name");
  let emailInput = document.getElementById("edit-email");
  let phoneInput = document.getElementById("edit-phone");
  let nameParts = nameInput.value.split(" ");
  let firstname = nameParts[0] || "";
  let lastname = nameParts.slice(1).join(" ") || "";

  contact.firstname = firstname;
  contact.lastname = lastname;
  contact.email = emailInput.value;
  contact["phone-number"] = phoneInput.value;
  contacts[contactIndex] = contact;
  setContacts();
  closeAddNewContact();
  loadContactList();
  showContact(contact.id);
}

/**
 * This function deletes a contact by removing it from the contacts array.
 * Also deletes any tasks assigned to the contact.
 *
 * @param {string} id - The unique identifier of the contact to delete.
 */
async function deleteContact(id) {
  const contactIndex = getIndexById(id);
  deleteAssignedTasks(id);
  if (contactIndex !== -1) {
    // Remove the contact at the found index
    if (contacts[contactIndex].user) {
      let user = contacts[contactIndex];
      deleteUser(user);
      logOut();
    } else {
      contacts.splice(contactIndex, 1);
      await setContacts();
    }
  } else {
    console.error("Invalid contact ID");
  }
  closeAddNewContact();
  contactOpen = false;
  IdOfCurrentContact = null;
  loadContactList();
  if (window.innerWidth <= 870) {
    backToContactlist();
  }
}

/**
 * This function handles the hover event for an SVG element by changing its source to the hover version.
 *
 * @param {string} elementId - The HTML ID of the SVG element.
 * @param {string} iconName - The base name of the SVG icon.
 */
function SVGOnHover(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const hoverSVG = `./img/contact/${iconName}_hover.svg`;
  svgElement.src = hoverSVG;
}

/**
 * This function handles the mouseout event for an SVG element by changing its source to the normal version.
 *
 * @param {string} elementId - The HTML ID of the SVG element.
 * @param {string} iconName - The base name of the SVG icon.
 */
function SVGMouseOut(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const normalSVG = `./img/contact/${iconName}.svg`;
  svgElement.src = normalSVG;
}
