let anyFilteredTasks = false;

/**
 * This function finds out the string the user inserts into the input field on the board.
 */
function filterTasks() {
  const filterInput = document.getElementById("searchInput");
  const filterValue = filterInput.value.toLowerCase();
  renderTasksBoard(filterValue);
}

/**
 * This function finds all the tasks which are in a certain column.
 * 
 * @param {string} filterString - The text the user writes in the search field on the board.
 * @param {number} columnIndex - Index of the column.
 * @returns 
 */
function filterTasksByColumn(filterString, columnIndex) {
  if (filterString) {
    return dataTasks.filter((task) => task.position === columns[columnIndex] && (task.title.toLowerCase().includes(filterString) || task.task.toLowerCase().includes(filterString)));
  } else {
    return dataTasks.filter((task) => task.position === columns[columnIndex]);
  }
}

/**
 * This function displays the message if no task match to the search of th user.
 */
function showHideMessageNoTasksFound() {
  // Check if dataTasks is empty, return early if true
  if (!(dataTasks && dataTasks.length > 0)) {
    return;
  }

  if (anyFilteredTasks) {
    hideMessageNoTasksFound();
  } else {
    showMessageNoTasksFound();
  }
}

/**
 * This function shows the message that no task is found.
 */
function showMessageNoTasksFound() {
  document.getElementById("noTasksFound").classList.remove("d-none");
}

/**
 * This function hides the message that no task is found.
 */
function hideMessageNoTasksFound() {
  document.getElementById("noTasksFound").classList.add("d-none");
}

/**
 * This functoin finds out the widht of the window. If the display changes to mobile the search field is rendered in a different div.
 */
function adjustLayoutFilter() {
  let filterValue = getValueofFilter();
  const screenWidth = window.innerWidth;
  const breakpoint = 970;
  let containerSearchInputDesktop = document.getElementById("searchInputDesktop");
  let containerSearchInputMedia = document.getElementById("searchInputMedia");

  if (screenWidth <= breakpoint) {
    containerSearchInputDesktop.innerHTML = "";
    containerSearchInputMedia.innerHTML = createSearchInput();
  } else {
    containerSearchInputMedia.innerHTML = "";
    containerSearchInputDesktop.innerHTML = createSearchInput();
  }
  if (searchInput) {
    setFilterValue(filterValue);
  }
  showHideMessageNoTasksFound();
}

/**
 * Listens if the user resize the window.
 */
window.addEventListener("resize", adjustLayoutFilter);

/**
 * Gets the input the user wrote into to input field. It is used to reset it after the user resized the the window.
 * @returns - Value put in the input field by the user.
 */
function getValueofFilter() {
  let filterValue = null;
  let searchInput = document.getElementById("searchInput");
  if (searchInput) {
    filterValue = searchInput.value;
  }
  return filterValue;
}

function setFilterValue(filterValue) {
  document.getElementById("searchInput").value = filterValue;
}

/**
 * This function finds the users that match to the search input of the user in the 
 * @returns - Returns all the contacts which match the users input.
 */
function filterUsers() {
  const searchInput = document.getElementById("searchUser").value.toLowerCase();

  if (searchInput.trim() === "") {
    return contacts;
  }

  return contacts.filter((contact) => {
    const fullName = `${contact.firstname.toLowerCase()} ${contact.lastname.toLowerCase()}`;
    return fullName.includes(searchInput);
  });
}
