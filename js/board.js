let openDropdown = null;
const columnsText = ["To do", "In progress", "Await feedback", "Done"];
const urgenciesImg = [
  {
    low: "img/board/priority_low.svg",
    medium: "img/board/priority_medium.svg",
    urgent: "img/board/priority_urgent.svg",
  },
];

/**
 * This function initializes the page board. It gets the data of the tasks, users, contacts and the current user from the database and initializes rendering the board.
 */
async function initBoard() {
  await getTasks();
  await getUsers();
  await getCurrentUser();
  await getContacts();
  adjustLayoutFilter();
  renderTasksBoard();
  createHeaderInitials();
}

/**
 * This function initalizes the rendering of the tasks on the board. If there are no filterd tasks, all the tasks are displayed.
 *
 * @param {string} filterString - This is the string coming from the filter.js which is the the input the user inserts in the search field.
 */
function renderTasksBoard(filterString) {
  anyFilteredTasks = false;

  for (let i = 0; i < columns.length; i++) {
    const filteredTasks = filterTasksByColumn(filterString, i);

    let tasksContainer = document.getElementById(`tasks${columns[i]}`);
    tasksContainer.innerHTML = "";

    if (filteredTasks.length > 0) {
      renderFilteredTasks(i, filteredTasks);
      anyFilteredTasks = true;
    } else {
      tasksContainer.innerHTML = createEmptyTaskHTML(columnsText, i);
    }
    createDropDiv(i);
  }
  showHideMessageNoTasksFound(anyFilteredTasks);
}

/**
 * This function initializes the rendering of the filtered tasks.
 *
 * @param {number} columnIndex - This variable is the number of the column on the board. 0 stands for "Todo", 1 for "In Progress", 2 for "Await feedback" and 4 for "Done".
 * @param {Array} filteredTasks - This JSON contains the filterd tasks. If there is no input in the search field, filteredTasks contains all the tasks.
 */
function renderFilteredTasks(columnIndex, filteredTasks) {
  for (let j = 0; j < filteredTasks.length; j++) {
    let tasks = filteredTasks[j];
    const categoryClass = setColorCategory(tasks["category"]);
    const tasksContainer = document.getElementById(`tasks${columns[columnIndex]}`);

    tasksContainer.innerHTML += createTasksHTML(columnIndex, j, tasks, categoryClass);
    createSubtasks(columnIndex, j);
    createUrgency(columnIndex, j);
    createAssignments(columnIndex, j);
  }
}

/**
 * This function sets the color of the selected category.
 *
 * @param {string} category - "User Story" or "Technical Task" can be in this parameter.
 * @returns - Returns the color of the category which can be blue or some kind of green.
 */
function setColorCategory(category) {
  if (category === "User Story") {
    return "blue";
  } else if (category === "Technical Task") {
    return "tech-task-green";
  }
  return "";
}

/**
 * This function creates the subtasks.
 *
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 */
function createSubtasks(i, j) {
  let subtasksContainer = document.getElementById(`subtasks${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];
  let checkedSubtasksCount = countCheckedSubtasks(task);
  let widthProgressBar = getWidthProgressBar(task, checkedSubtasksCount);
  subtasksContainer.innerHTML = "";

  if (task.subtasks.length > 0) {
    subtasksContainer.innerHTML += createSubstasksBoardHTML(widthProgressBar, checkedSubtasksCount, task);
  } else {
    subtasksContainer.classList.add("margin-12");
  }
}

/**
 * This function counts the checked subtasks.
 *
 * @param {string} task - This parameter contains the object of the task.
 * @returns - Returns the number of the checked subtasks.
 */
function countCheckedSubtasks(task) {
  return task.subtasks.reduce((count, subtask) => count + (subtask.checked ? 1 : 0), 0);
}

/**
 * This function calculates the width of the progress bar in the subtasks.
 *
 * @param {string} task - This parameter contains the object of the task.
 * @param {number} checkedSubtasksCount - This variable contains the number of the checked subtasks.
 * @returns
 */
function getWidthProgressBar(task, checkedSubtasksCount) {
  return (128 / task.subtasks.length) * checkedSubtasksCount + "px";
}

/**
 * This function creates the icon priority.
 *
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 */
function createUrgency(i, j) {
  let urgencyContainer = document.getElementById(`urgency${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];
  const urgency = getTaskUrgency(task);

  if (urgency !== null) {
    const urgencyImageSrc = urgenciesImg[0][urgency];
    urgencyContainer.innerHTML = createUrgencyImg(urgencyImageSrc);
  }
}

/**
 * This function finds out the priority of the task.
 *
 * @param {string} task - This parameter contains the object of the task.
 * @returns - This can be "low", "medium" or "urgent".
 */
function getTaskUrgency(task) {
  return task.urgency;
}

/**
 * This function filters through the array dataTasks and creates an array with the tasks that are displayed in the column.
 *
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 */
function createAssignments(i, j) {
  let assignmentsContainer = document.getElementById(`assignments${i}${j}`);
  let actualTasks = dataTasks.filter((task) => task.position === columns[i]);
  let task = actualTasks[j];

  assignmentsContainer.innerHTML = "";

  if (task.assignedTo.length > 0) {
    renderAssignedUsers(assignmentsContainer, task.assignedTo);
  }
}

/**
 * This function renders the contacts which are assigend to the task.
 *
 * @param {string} container - This is the container where the assigned contacts are rendered.
 * @param {array} assignedTo - This is an array which contains the assigned contacts.
 */
function renderAssignedUsers(container, assignedTo) {
  for (let index = 0; index < assignedTo.length; index++) {
    const userId = assignedTo[index];
    const user = contacts.find((contact) => contact.id === userId);

    if (user) {
      const userInitials = getUserInitials(user);
      const userColorClass = user.icon;
      const marginClass = index > 0 ? "negative-margin" : "";
      const nonDisplayedUsers = assignedTo.length - 4;

      container.innerHTML += createAssignmentsHTML(marginClass, userColorClass, userInitials);

      if (index > 2 && nonDisplayedUsers > 0) {
        container.innerHTML += createAssignmentsFirstHTML(marginClass, nonDisplayedUsers);
        break;
      }
    }
  }
}

/**
 * This function creates the field where tasks can be dropped. It only appears when dragging is startd.
 *
 * @param {number} i - Index of the column.
 */
function createDropDiv(i) {
  let tasksContainer = document.getElementById(`tasks${columns[i]}`);
  tasksContainer.innerHTML += createDropDivHTML(i);
}

/**
 * This function empties the input search.
 */
function emptyInputFilter() {
  document.getElementById("searchInput").value = "";
}

/**
 * This function opens the dialog if a task is added.
 */
function openDialog() {
  if (window.innerWidth < 970) {
    redirectToAddTaskPage();
  } else {
    let dialog = document.getElementById("dialog");
    let closeDialog = document.getElementById("closeDialog");
    closeDialog.classList.remove("d-none");
    dialog.classList.remove("d-none");
    dialog.classList.remove("fade-out-right");
    dialog.classList.add("fade-from-right");
  }
}

/**
 * This function closes the dialog if a task is added.
 */
function closeDialog() {
  let dialog = document.getElementById("dialog");
  let closeDialog = document.getElementById("closeDialog");
  dialog.classList.remove("fade-from-right");
  dialog.classList.add("fade-out-right");
  closeDialog.classList.add("d-none");
  dialog.classList.add("d-none");
}

/**
 * This function prevents the div below from doing action.
 *
 * @param {event} event - click
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * This function is used on mobile devices. It directs the user to the addtask page.
 */
function redirectToAddTaskPage() {
  window.location.href = "addtask.html";
}

/**
 * This function opens and closes the drop down menu where the user can choose the positon ("To do..."). This menu only shows up in mobile view.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 */
function toggleDropDownCategories(i, j) {
  const dropdownContainer = document.getElementById(`dropDownChangeCategoryMobile${i},${j}`);

  if (dropdownContainer !== openDropdown) {
    if (openDropdown) {
      hideDropDownCategories(openDropdown.dataset.i, openDropdown.dataset.j);
    }
    dropdownContainer.classList.remove("d-none");
    createEventlistenerCloseDropDownCategories(i, j, dropdownContainer);
    openDropdown = dropdownContainer;
  } else {
    hideDropDownCategories(i, j);
  }
}

/**
 * This function creates the eventlistener which listens to any click outside the drop down menu. If so it closes the menu.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 * @param {Element} dropdownContainer - The container where the drop down menu is rendered.
 */
function createEventlistenerCloseDropDownCategories(i, j, dropdownContainer) {
  document.addEventListener("click", (event) => {
    const isClickInsideDropdown = dropdownContainer.contains(event.target);
    if (!isClickInsideDropdown) {
      hideDropDownCategories(i, j);
    }
  });
}

/**
 * This function closes the drop down menu where the user can change the position of the task.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down.
 */
function hideDropDownCategories(i, j) {
  if (openDropdown) {
    openDropdown.classList.add("d-none");
    openDropdown = null;
  }
}

