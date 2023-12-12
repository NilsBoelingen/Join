const colorsPriority = [
  {
    priority: "urgent",
    color: "#FF3D00",
  },
  {
    priority: "medium",
    color: "#FFA800",
  },
  {
    priority: "low",
    color: "#7AE229",
  },
];
const priorityImages = [
  {
    lowWhite: "img/add_task/low_white.png",
    lowColor: "img/add_task/low.png",
    mediumWhite: "img/add_task/medium_white.png",
    mediumColor: "img/add_task/medium.png",
    urgentWhite: "img/add_task/urgent_white.png",
    urgentColor: "img/add_task/urgent.png",
  },
];
const priorityButtonsIDs = ["buttonUrgent", "buttonMedium", "buttonLow"];

/**
 * This function initializes the task card if the user clicks on a task.
 */
function showCardEdit() {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  cardDetailContainer.innerHTML = "";
  cardDetailContainer.innerHTML = renderCardEditHTML();
  setTitle();
  setDescription();
  setDate();
  findIdPriorityContainer();
  createDropDownAssignedTo();
  createCardEditMembers();
  createSubtasksCardEdit();
}

/**
 * This function sets the title of the task card.
 */
function setTitle() {
  const titleInput = document.getElementById("cardEditTitle");
  titleInput.value = selectedTask["title"];
}

/**
 * This function sets the despription of the task card.
 */
function setDescription() {
  const titleInput = document.getElementById("cardEditDescription");
  titleInput.value = selectedTask["task"];
}

/**
 * This function sets the date of the task card. It checks that the date the users chooses is not in the past.
 */
function setDate() {
  const titleInput = document.getElementById("cardEditDate");
  titleInput.value = selectedTask["date"];
  document.getElementById("cardEditDate").min = new Date().toISOString().split("T")[0];
}

/**
 * This function finds out the priority of the selected task.
 * @returns - Just used to stop the function.
 */
function findIdPriorityContainer() {
  const priorities = ["urgent", "medium", "low"];
  const priority = selectedTask["urgency"];

  if (priority !== null && priorities.includes(priority)) {
    const idOfContainer = priorities.find((priorityItem) => priorityItem === priority);
    setPriorityStyle(idOfContainerNormalized(idOfContainer));
  } else {
    return;
  }
}

/**
 * This function normalizes the ID of the container. It sets "button" first and then the Priority of the clicked button (example: "buttonUrgent").
 *
 * @param {string} idOfContainer - "low", "medium" or "urgent".
 * @returns
 */
function idOfContainerNormalized(idOfContainer) {
  return "button" + idOfContainer.charAt(0).toUpperCase() + idOfContainer.slice(1);
}

/**
 * This function changes the priority if the user clicks on a button.
 *
 * @param {string} priority - Priority of the clicked button.
 * @param {string} idOfContainer - ID of the button.
 */
function changePriority(priority, idOfContainer) {
  if (selectedTask["urgency"] === priority) {
    selectedTask["urgency"] = null;
  } else {
    selectedTask["urgency"] = priority;
  }
  setPriorityStyle(idOfContainer);
}

/**
 * This function sets the style of the container.
 *
 * @param {string} idOfContainer - ID of the button.
 */
function setPriorityStyle(idOfContainer) {
  for (let i = 0; i < priorityButtonsIDs.length; i++) {
    const containerID = priorityButtonsIDs[i];
    const container = document.getElementById(containerID);
    setBackgroundcolorWhite(container);
    setColorBlack(containerID);
    setImageColor(containerID);
  }

  const container = document.getElementById(idOfContainer);
  const priorityColor = selectedTask["urgency"] ? colorsPriority.find((item) => item.priority === selectedTask["urgency"]) : null;

  if (selectedTask["urgency"]) {
    setBackgroundcolorPriority(container, priorityColor);
    setColorWhite(idOfContainer);
    setImageWhite(idOfContainer);
  }
}

/**
 * This function sets the backgroundcolor to white if the button urgent is unchecked.
 *
 * @param {string} container - ID of the button.
 */
function setBackgroundcolorWhite(container) {
  container.style.backgroundColor = "white";
}

/**
 * This function sets the background color of the button if it is checked.
 *
 * @param {string} container - ID of the button.
 * @param {string} priorityColor - This is the color of the button.
 */
function setBackgroundcolorPriority(container, priorityColor) {
  container.style.backgroundColor = priorityColor.color;
}

/**
 * This function sets the color of the font to black if the button is unchecked.
 *
 * @param {string} idOfContainer - ID of the button.
 */
function setColorBlack(idOfContainer) {
  document.getElementById(idOfContainer).classList.remove("card-edit-priority-color-white");
}

/**
 * This function sets the color of the font to white if the button is checked.
 *
 * @param {string} idOfContainer - ID of the button.
 */
function setColorWhite(idOfContainer) {
  document.getElementById(idOfContainer).classList.add("card-edit-priority-color-white");
}

/**
 * This color sets the image inside of the button to white if the button is checked.
 *
 * @param {string} idOfContainer - ID of the button.
 */
function setImageWhite(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}_white.png`;
  }
}

/**
 * This function sets the image back to its default color if the button is unchecked.
 *
 * @param {string} idOfContainer - ID of the button.
 */
function setImageColor(idOfContainer) {
  const priority = idOfContainer.replace("button", "").toLowerCase();
  const imgElement = document.querySelector(`#${idOfContainer} img`);
  if (imgElement) {
    imgElement.src = `../img/add_task/${priority}.png`;
  }
}

/**
 * This function saves all the changes the user has made in the task.
 */
function saveChangesCardEdit() {
  let IdOfTask = selectedTask["id"];
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  selectedTask["title"] = document.getElementById("cardEditTitle").value;
  selectedTask["task"] = document.getElementById("cardEditDescription").value;
  selectedTask["date"] = document.getElementById("cardEditDate").value;
  dataTasks[taskIndex] = selectedTask;
  setTasks();
  closeCardDetailButton();
}
