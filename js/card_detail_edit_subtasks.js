/**
 * This function changes the icon of the input subtask if the input is focused.
 */
function changeIconConfirm() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "img/board_card_detail/subtasks_confirm.svg";
  document.getElementById("emptyInputAddSubtaskButton").classList.remove("d-none");
  document.getElementById("separatorAddSubtask").classList.remove("d-none");
}

/**
 * This function adds the icon plus and the separator on the input subtask if the input is focused.
 */
function changeIconPlus() {
  const confirmImage = document.getElementById("addOrConfirm");
  confirmImage.src = "./img/board_card_detail/add_subtask.svg";
  document.getElementById("emptyInputAddSubtaskButton").classList.add("d-none");
  document.getElementById("separatorAddSubtask").classList.add("d-none");
}

/**
 * This function creates the subtasks in the edit view.
 */
function createSubtasksCardEdit() {
  let subtasksContainer = document.getElementById("subtasksList");
  subtasksContainer.innerHTML = "";

  for (let i = 0; i < selectedTask["subtasks"].length; i++) {
    const subtaskText = selectedTask["subtasks"][i]["content"];
    subtasksContainer.innerHTML += renderSubtasksCardEditHTML(i, subtaskText);
  }
}

/**
 * This function changes the display of the subtask if it is double clicked or opened by the pencil.
 *
 * @param {number} i - Index of the subtask.
 * @param {string} subtaskText - Text of the selected subtask.
 */
function editSubtaskCardEdit(i, subtaskText) {
  let subtaskItemContainer = document.getElementById(`subtasksList`);
  subtaskItemContainer.innerHTML = "";
  subtaskItemContainer.innerHTML = renderSubtasksEditHTML(i, subtaskText);
}

/**
 * This function deletes the subtasks.
 *
 * @param {number} i - Index of the subtask.
 */
function deleteSubtaskCardEdit(i) {
  const subtasks = selectedTask["subtasks"];
  subtasks.splice(i, 1);
  createSubtasksCardEdit();
}

/**
 * This function saves the subtask in the temporarily stored array "selectedTask" if the user adds a subtask in the input field.
 *
 * @param {number} i - Index of the subtask.
 */
function saveSubtaskCardEdit(i) {
  const subtaskNewValue = document.getElementById(`subtaskValue${i}`).value;
  selectedTask["subtasks"][i]["content"] = subtaskNewValue;
  createSubtasksCardEdit();
}

/**
 * This function adds the subtask if the user clicks on the check icon.
 */
function addSubtaskCardEdit() {
  const subtaskValue = document.getElementById("addNewSubtask").value;

  if (subtaskValue) {
    const newSubtask = {
      content: subtaskValue,
      checked: false,
    };
    selectedTask.subtasks.unshift(newSubtask);
    createSubtasksCardEdit();
    emptyInputAddSubtask();
    document.getElementById("addNewSubtask").focus();
  }
}

/**
 * This function empties the input field after the user has stored a subtask.
 */
function emptyInputAddSubtask() {
  document.getElementById("addNewSubtask").value = "";
}

/**
 * This function creates a new subtask if the user presses the key "enter" and the input field is focused.
 *
 * @param {key} event - press key
 */
function newTaskOnEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtaskCardEdit();
  }
}

/**
 * This function saves the subtask if the user is editing the subtask.
 * @param {key} event- press key
 * @param {number} i - Index of the subtask.
 * @param {string} subtaskText - Text of the selected subtask.
 */
function saveTaskOnEnter(event, i, subtaskText) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveSubtaskCardEdit(i, subtaskText);
  }
}
