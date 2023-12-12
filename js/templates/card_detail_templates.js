/**
 * This function generates HTML for the card detail section.
 * 
 * @param {string} categoryClass - The CSS class for the category color.
 * @param {Object} selectedTask - The selected task object.
 * @param {string} imgUrgency - The source of the urgency image.
 * @param {number} IdOfTask - The ID of the task.
 * @returns {string} The generated HTML.
 */
function renderCardDetailHTML(categoryClass, selectedTask, imgUrgency, IdOfTask) {
  /*html*/
  return `
    <div class="card-detail move-in-right" id="cardDetail" onclick="stopPropagationCardDetail(event)">
        <div class="card-detail-header">
          <div class="card-detail-category color-${categoryClass}">${selectedTask["category"]}</div>
          <div class="close-btn pointer"><img src="./img/board_card_detail/close.svg" alt="" onclick="closeCardDetailButton()"></div>
        </div>
        <div class="card-detail-title">${selectedTask["title"]}</div>
        <div class="card-detail-task font-20px-400">${selectedTask["task"]}</div>
        <div class="card-detail-date font-20px-400">
          <div class="text-color-dark-blue">Due date:</div>
          <div>${selectedTask["date"]}</div>
        </div>
        <div class="card-detail-priority font-20px-400">
          <div class="text-color-dark-blue">Priority:</div>
          <div class="card-detail-priority-right">
            <div id="taskUrgency"></div>
            <img src="${imgUrgency}" alt="">
          </div>
        </div>
        <div class="text-color-dark-blue font-20px-400 margin-bottom-8 no-gap-div">Assigned To:</div>
        <div class="card-detail-assigned" id="cardDetailAssigned"></div>

        <div class="text-color-dark-blue font-20px-400 margin-bottom-8">Subtasks</div>
        <div class="card-detail-subtasks" id="cardDetailSubtasks"></div>
        <div class="justify-end">
          <div class="delete-edit">
            <div class="delete" onmouseover="SVGOnHover('deleteImg', 'delete')" onmouseout="SVGMouseOut('deleteImg', 'delete')" onclick="deleteTask(${IdOfTask})">
              <img src="./img/board_card_detail/delete.svg" alt="" id="deleteImg">
              <div>Delete</div>
            </div>
            <img src="./img/board_card_detail/separator_card_detail_bottom.svg" alt="">
            <div class="edit" onmouseover="SVGOnHover('editImg', 'edit')" onmouseout="SVGMouseOut('editImg', 'edit')" onclick="showCardEdit()">
              <img src="./img/board_card_detail/edit.svg" alt="" id="editImg">
              <div>Edit</div>
            </div>
          </div>      
        </div>
    </div>
    `;
}


/**
 * This function generates HTML for a user assignment in the card detail section.
 * 
 * @param {string} userColorClass - The color class for user styling.
 * @param {string} userInitials - The initials of the user.
 * @param {Object} user - The user object.
 * @returns {string} The generated HTML.
 */
function renderAssigmentsHTML(userColorClass, userInitials, user) {
  /*html*/
  return `
    <div class="card-detail-members">
      <div class="member-button align-center justify-center " style="background-color: ${userColorClass}">
        <span>${userInitials}</span>
      </div>
      <span class="open-sans-19">${user["firstname"]} ${user["lastname"]}</span>
    </div>
  `;
}


/**
 * This function generates HTML for a subtask in the card detail section.
 * 
 * @param {number} index - The index of the subtask.
 * @param {string} subtaskStatusClass - The CSS class for subtask status.
 * @param {Object} subtask - The subtask object.
 * @returns {string} The generated HTML.
 */
function renderSubtasksCardDetailHTML(index, subtaskStatusClass, subtask) {
  /*html*/
  return `
  <div class="card-detail-subtask pointer" onclick="toggleSubtasks(${index}); doNotTriggerEvent(event)" onmouseover="SVGOnHover('checkbox${index}', '${subtaskStatusClass}')" onmouseout="SVGMouseOut('checkbox${index}', '${subtaskStatusClass}')">
    <img src="./img/board_card_detail/${subtaskStatusClass}.svg" alt="" id="checkbox${index}">
    <div class="font-16px-400">${subtask.content}</div>
  </div>
`;
}
