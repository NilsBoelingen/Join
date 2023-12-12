let selectedTask = [];

/**
 * This function starts rendering the card of the task.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function showCardDetail(i, j) {
  document.getElementById("cardDetailContainer").classList.remove("d-none");
  findTask(i, j);
  renderCardDetail(i, j);
}

/**
 * This function finds the selected task.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function findTask(i, j) {
  const position = columns[i];
  const tasksWithPosition = dataTasks.filter((item) => item.position === position);
  selectedTask = tasksWithPosition[j];
}

let isMouseDownInsideCardDetail = false;

/**
 * This function closes the card if the user clicks beside the card.
 * 
 * @param {event} event - click
 */
function closeCardDetail(event) {
  if (!isMouseDownInsideCardDetail) {
    saveSubtasks();
    document.getElementById("cardDetailContainer").classList.add("d-none");
    emptyInputFilter();
    renderTasksBoard();
  }
  isMouseDownInsideCardDetail = false;
}

/**
 * This funtion sets the variable on true if the mouse is pressed down inside the card.
 */
function onMouseDownInsideCardDetail() {
  isMouseDownInsideCardDetail = true;
}

/**
 * This funtion sets the variable on false if the mouse is lifted up inside the card.
 */
function onMouseUpInsideCardDetail() {
  isMouseDownInsideCardDetail = false;
}

/**
 * This function prevents the card from closing if the user clicks inside the card.
 * 
 * @param {click} event - click
 */
function stopPropagationCardDetail(event) {
  event.stopPropagation();
}

/**
 * This function closes the card if the button on the top left is clicked.
 */
function closeCardDetailButton() {
  saveSubtasks();
  document.getElementById("cardDetailContainer").classList.add("d-none");
  emptyInputFilter();
  renderTasksBoard();
}

/**
 * This function saves the subtasks if the user checks the checkbox.
 */
function saveSubtasks() {
  let IdOfTask = selectedTask["id"];
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  dataTasks[taskIndex] = selectedTask;
  setTasks();
}

/**
 * This function contains all the functions that are needed to render the card.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function renderCardDetail(i, j) {
  let cardDetailContainer = document.getElementById("cardDetailContainer");
  const categoryClass = setColorCategory(selectedTask["category"]);
  const imgUrgency = createImgUrgency(selectedTask["urgency"]);
  const IdOfTask = selectedTask["id"];
  cardDetailContainer.innerHTML = "";
  cardDetailContainer.innerHTML = renderCardDetailHTML(categoryClass, selectedTask, imgUrgency, IdOfTask);
  createUrgencyCardDetail();
  createAssignmentsCardDetail();
  createSubtasksCardDetail();
  animationMoveIn();
}

/**
 * This function renders the priority of the card.
 */
function createUrgencyCardDetail() {
  const taskUrgencyContainer = document.getElementById("taskUrgency");
  if (selectedTask["urgency"]) {
    taskUrgencyContainer.innerHTML = `${selectedTask["urgency"]}`;
  } else {
    taskUrgencyContainer.innerHTML = "";
  }
}

/**
 * This function creates the image of the priority.
 * 
 * @param {string} urgency - "low", "medium" or "urgent"
 * @returns - Returns the image source.
 */
function createImgUrgency(urgency) {
  urgencyImageSrc = urgenciesImg[0][urgency];

  if (selectedTask["urgency"]) {
    urgencyImageSrc = urgenciesImg[0][urgency];
  } else {
    urgencyImageSrc = "";
  }
  return urgencyImageSrc;
}

/**
 * This function creates the icons of the assigend contacts.
 */
function createAssignmentsCardDetail() {
  let assignmentsContainer = document.getElementById(`cardDetailAssigned`);
  assignmentsContainer.innerHTML = "";

  if (selectedTask.assignedTo.length > 0) {
    selectedTask.assignedTo.forEach((userId, index) => {
      renderAssignmentDetails(userId, assignmentsContainer);
    });
  }
}

/**
 * This function gets the initials of the users and starts rendering.
 * 
 * @param {number} userId - ID of the contacts assigned to the task. 
 * @param {string} container - Container where the Icons of the contacts are rendered.
 */
function renderAssignmentDetails(userId, container) {
  const user = contacts.find((contact) => contact.id === userId);

  if (user) {
    const userInitials = getUserInitials(user);
    const userColorClass = user.icon;
    container.innerHTML += renderAssigmentsHTML(userColorClass, userInitials, user);
  }
}

/**
 * This function creates the subtasks of the task.
 */
function createSubtasksCardDetail() {
  let subtasksContainer = document.getElementById(`cardDetailSubtasks`);
  subtasksContainer.innerHTML = "";

  if (selectedTask.subtasks.length > 0) {
    selectedTask.subtasks.forEach((subtask, index) => {
      const subtaskStatusClass = subtask.checked ? "Check_button_checked" : "Check_button_unchecked";
      subtasksContainer.innerHTML += renderSubtasksCardDetailHTML(index, subtaskStatusClass, subtask);
    });
  }
}

/**
 * This function contains the animation when user clicks on a task. The card is moving in from the right.
 */
function animationMoveIn() {
  document.getElementById("cardDetail").classList.add("move-in-right");
}

/**
 * This function toggles betwenn "checked" and "unchecked" in the subtasks.
 * 
 * @param {number} index - Index of the subtask.
 */
function toggleSubtasks(index) {
  if (selectedTask.subtasks && selectedTask.subtasks[index]) {
    selectedTask.subtasks[index].checked = !selectedTask.subtasks[index].checked;
    createSubtasksCardDetail();
    saveSubtasks();
    renderTasksBoard();
  }
}

/**
 * This function changes the SVG of the checkbuttons on hover.
 * 
 * @param {number} elementId - Indes of the subtask.
 * @param {string} iconName - Name of the icon which is displayed. 
 */
function SVGOnHover(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const hoverSVG = `./img/board_card_detail/${iconName}_hover.svg`;

  svgElement.src = hoverSVG;
}

/**
 * This function changes the SVG of the subtasks if the user unhovers.
 * 
 * @param {number} elementId - Indes of the subtask.
 * @param {string} iconName - Name of the icon which is displayed. 
 */
function SVGMouseOut(elementId, iconName) {
  const svgElement = document.getElementById(elementId);
  const normalSVG = `./img/board_card_detail/${iconName}.svg`;

  svgElement.src = normalSVG;
}

/**
 * This function deletes a task.
 * 
 * @param {number} IdOfTask - ID of the task.
 */
function deleteTask(IdOfTask) {
  const taskIndex = dataTasks.findIndex((task) => task.id === IdOfTask);
  dataTasks.splice(taskIndex, 1);
  setTasks();
  closeCardDetailButton();
  renderTasksBoard();
}
