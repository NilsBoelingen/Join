let currentDraggedElement;

/**
 * This function allows the dragged div to be dropped on hover.
 * 
 * @param {DragEvent} ev - darg event
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * This function executes the rotation of the card and the highlighting of the drop container if the dragging is started.
 * 
 * @param {number} id - ID of the dragged task. 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function startDragging(id, i, j) {
  currentDraggedElement = id;
  highlight();
  rotateCard(i, j);
}

function changePositionMobile(id, i, j, newPosition) {
  currentDraggedElement = id;
  changePosition(newPosition);
}

/**
 * This function changes the position of the task, for example from "Todo" to "In Progress".
 * 
 * @param {string} newPosition - "Todo", "InProgress", "AwaitFeedback" or "Done".
 */
function changePosition(newPosition) {
  let id = currentDraggedElement;
  const taskIndex = dataTasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    dataTasks[taskIndex].position = newPosition;
  } else {
    console.error("Task not found with ID:", id);
  }
  renderTasksBoard();
  setTasks();
}

/**
 * This function highlights the spaces where a task can be dropped. It is only executed if the user starts dragging.
 */
function highlight() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`dropDiv${i}`).classList.remove("d-none");
  }
}

/**
 * This function rotates the card. It is only executed if the user starts dragging.
 * 
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function rotateCard(i, j) {
  document.getElementById(`card${i}${j}`).style.transform = "rotate(5deg)";
}

/**
 * This function removes the rotation setting the task back to its normal position.
 * @param {number} i - This is the number of the column starting from left to right.
 * @param {number} j - This is the number of the task in the column starting from top to down. 
 */
function stopRotate(i, j) {
  const element = document.getElementById(`card${i}${j}`);
  if (element) {
    element.style.transform = "rotate(0deg)";
  }
}
