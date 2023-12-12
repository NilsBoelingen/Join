/**
 * This function creates the drop down menu for the "Assigned to" input.
 */
function createDropDownAssignedTo() {
  let dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  dropDownContainer.innerHTML = "";

  const filteredUsers = filterUsers();

  for (let i = 0; i < filteredUsers.length; i++) {
    const contact = filteredUsers[i];
    contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    dropDownContainer.innerHTML += renderCardEditDropDownHTML(i, contact);

    if (selectedTask["assignedTo"].includes(contact.id)) {
      styleUserSelected(i);
    }
  }
}

/**
 * This function opens and closes the "Assigend to" input field.
 */
function toggleDropDownAssignedTo() {
  document.getElementById("dropDownAssignedToContainer").classList.toggle("d-none");
  const dropDownArrow = document.getElementById("openDropDownAssign");
  dropDownArrow.classList.toggle("rotate-180");
}

/**
 * This function opens the drop down "Assigned to".
 */
function showDropDownAssignedTo() {
  document.getElementById("dropDownAssignedToContainer").classList.remove("d-none");
  const dropDownArrow = document.getElementById("openDropDownAssign");
  dropDownArrow.classList.add("rotate-180");
}

/**
 * This function closes the drop down "Assigend to".
 *
 * @param {event} event - click
 */
function closeDropDownAssignedTo(event) {
  const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  if (!dropDownContainer.classList.contains("d-none")) {
    dropDownContainer.classList.add("d-none");
    const dropDownArrow = document.getElementById("openDropDownAssign");
    dropDownArrow.classList.remove("rotate-180");
  }
}

/**
 * This function prevents the task from closing when a click is inside the task.
 *
 * @param {event} event - click
 */
function stopPropagation(event) {
  const dropDownContainer = document.getElementById("dropDownAssignedToContainer");
  if (!dropDownContainer.contains(event.target)) {
    event.stopPropagation();
  }
}

/**
 * This function adds a contact to the task.
 *
 * @param {number} contactID - This is the ID of the user.
 */
function addContactToAssign(contactID) {
  const assignedToIndex = selectedTask["assignedTo"].indexOf(contactID);

  if (assignedToIndex !== -1) {
    selectedTask["assignedTo"].splice(assignedToIndex, 1);
  } else {
    selectedTask["assignedTo"].push(contactID);
  }

  createDropDownAssignedTo();
  createCardEditMembers();
}

/**
 * This function sets the style of the assigned contacts.
 *
 * @param {number} i - This is the index of the assigned user in the array "assignedTo" (selectedTask).
 */
function styleUserSelected(i) {
  setBackgroundColorUser(i);
  setColorUser(i);
  setImageChecked(i);
}

/**
 * This function sets the background color of the assigned user.
 *
 * @param {number} i - This is the index of the assigned user in the array "assignedTo" (selectedTask).
 */
function setBackgroundColorUser(i) {
  document.getElementById(`dropDownContact${i}`).classList.add("background-color-dark");
}

/**
 * This function sets the color of the font of the assigned user.
 *
 * @param {number} i - This is the index of the assigned user in the array "assignedTo" (selectedTask).
 */
function setColorUser(i) {
  document.getElementById(`dropDownContact${i}`).classList.add("font-color-white");
}
/**
 * This function sets the image in the checkbox to checked (drop down "assigned to").
 *
 * @param {number} i - This is the index of the assigned user in the array "assignedTo" (selectedTask).
 */
function setImageChecked(i) {
  const checkboxImage = document.getElementById(`assignedUserCheckbox${i}`);
  if (checkboxImage) {
    checkboxImage.src = "./img/board_card_detail/Check_button_checked_white.svg";
  }
}

/**
 * This function displays the assigned contacts below the drop down.
 */
function createCardEditMembers() {
  let cardEditMembersContainer = document.getElementById("cardEditMembers");
  cardEditMembersContainer.innerHTML = "";

  for (let i = 0; i < selectedTask["assignedTo"].length; i++) {
    const userId = selectedTask["assignedTo"][i];
    const user = contacts.find((contact) => contact.id === userId);

    if (user) {
      const userInitials = getUserInitials(user);
      const userColorClass = user.icon;
      cardEditMembersContainer.innerHTML += renderMembersCardEditHTML(userColorClass, userInitials);
    }
  }
}

/**
 * This function deletes assigned contacts if the checkbox is unchecked.
 */
function deleteInputAssignedTo() {
  const inputField = document.getElementById("searchUser");
  if (inputField) {
    inputField.value = "";
  }
  createDropDownAssignedTo();
}
