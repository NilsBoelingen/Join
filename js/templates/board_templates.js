/**
 * This function generates HTML for a task card.
 * 
 * @param {number} i - The index of the outer loop.
 * @param {number} j - The index of the inner loop.
 * @param {Object} tasks - The tasks object.
 * @param {string} categoryClass - The category class for styling.
 * @returns {string} The generated HTML.
 */
function createTasksHTML(i, j, tasks, categoryClass) {
  /*html*/
  return `
    <div class="card" id="card${i}${j}" draggable="true" ondragstart="startDragging(${tasks["id"]}, ${i}, ${j})" ondragend="stopRotate(${i}, ${j})" onclick="showCardDetail(${i}, ${j})">
      <div class="category-button-change-mobile">
        <span class="category color-${categoryClass}">${tasks["category"]}</span>
        <div onclick="toggleDropDownCategories(${i}, ${j}), doNotClose(event)" class="showCategories" id="showCategories${i}${j}">
          <img src="img/contact/menu.svg">
        </div>
          <div class="drop-down-change-category-mobile d-none" id="dropDownChangeCategoryMobile${i},${j}" onclick="doNotClose(event)">
            <span onclick="changePositionMobile(${tasks["id"]}, ${i}, ${j}, 'Todo')">To do</span>
            <span onclick="changePositionMobile(${tasks["id"]}, ${i}, ${j}, 'InProgress')">In progress</span>
            <span onclick="changePositionMobile(${tasks["id"]}, ${i}, ${j}, 'AwaitFeedback')">Await feedback</span>
            <span onclick="changePositionMobile(${tasks["id"]}, ${i}, ${j}, 'Done')">Done</span>
          </div>
        </div>
      <h3 class="card-title overflow-hidden">${tasks["title"]}</h3>
      <p>${tasks["task"]}</p>
      <div class="subtasks-board" id="subtasks${i}${j}"></div>
      <div class="space-between align-center align-stretch min-height-32">
        <div class="row flex-wrap" id="assignments${i}${j}">
        </div>
        <div class="urgency" id="urgency${i}${j}"><img src="" alt="" /></div>
      </div>
    </div>
      `;
}


/**
 * This function generates HTML for an empty task card.
 * 
 * @param {string} columnsText - Text for the columns.
 * @param {number} i - The index of the loop.
 * @returns {string} The generated HTML.
 */
function createEmptyTaskHTML(columnsText, i) {
  /*html*/
  return `
    <div class="empty-task">
      <span>No Tasks ${columnsText[i]}</span>
    </div>
  `;
}


/**
 * This function generates HTML for the subtasks board.
 * 
 * @param {string} widthProgressBar - The width of the progress bar.
 * @param {number} checkedSubtasksCount - The count of checked subtasks.
 * @param {Object} task - The task object.
 * @returns {string} The generated HTML.
 */
function createSubstasksBoardHTML(widthProgressBar, checkedSubtasksCount, task) {
  /*html*/
  return `
    <div class="progress-bar-container">
      <div class="progress-bar-background"></div>
      <div class="progress-bar" style="width: ${widthProgressBar};"></div>
    </div>
    <div class="subtasks-text">${checkedSubtasksCount}/${task.subtasks.length} Subtasks</div>
  `;
}


/**
 * This function generates HTML for assignments.
 * 
 * @param {string} marginClass - The margin class for styling.
 * @param {string} userColorClass - The color class for user styling.
 * @param {string} userInitials - The initials of the user.
 * @returns {string} The generated HTML.
 */
function createAssignmentsHTML(marginClass, userColorClass, userInitials) {
  /*html*/
  return `
    <div class="member-button align-center justify-center ${marginClass}" style="background-color: ${userColorClass};">
      <span>${userInitials}</span>
    </div>
  `;
}


/**
 * This function generates HTML for the first assignment.
 * 
 * @param {string} marginClass - The margin class for styling.
 * @param {number} nonDisplayedUsers - The count of non-displayed users.
 * @returns {string} The generated HTML.
 */
function createAssignmentsFirstHTML(marginClass, nonDisplayedUsers) {
  /*html*/
  return `
    <div class="member-button align-center justify-center color-standard-blue ${marginClass}">
      <span>+ ${nonDisplayedUsers}</span>
    </div>
  `;
}


/**
 * This function generates HTML for the drop div.
 * 
 * @param {number} i - The index of the loop.
 * @returns {string} The generated HTML.
 */
function createDropDivHTML(i) {
  /*html*/
  return `
    <div class="empty-task d-none" id="dropDiv${i}">
      <span>Drop Task here</span>
    </div>
  `;
}


/**
 * This function generates HTML for the search input.
 * 
 * @returns {string} The generated HTML.
 */
function createSearchInput() {
  /*html*/
  return `
    <form class="search" onsubmit="filterTasks(); return false">
    <input type="text" id="searchInput" placeholder="Find task" onkeyup="filterTasks()" />
    <div class="align-center gap-16px">
      <img src="./img/board/separator_find_task.svg" alt />
      <button class="align-center"><img src="./img/board/search.svg" alt /></button>
    </div>
    </form>
    <div id="noTasksFound" class="no-tasks-found d-none">No tasks found</div>
    `;
}



/**
 * This function generates HTML for the urgency image.
 * 
 * @param {string} urgencyImageSrc - The source of the urgency image.
 * @returns {string} The generated HTML.
 */
function createUrgencyImg(urgencyImageSrc) {
  /*html*/
  return `
    <img src="${urgencyImageSrc}" alt="" />
  `;
}

