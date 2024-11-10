let idOfUser = 1;
let summaryData;

/**
 * This function contains all the functionts that should be called on load of the body.
 */
async function init() {
  await getTasks();
  // await getUsers();
  await getCurrentUser();
  await getSummaryData();
  await getContacts();
  await actuallyUserToContacts();
  getTimeOfDay();
  setAmountTasksPosition();
  setTotalTasks();
  setAmountUrgent();
  setDeadline();
  setDoneTasks();
  setTasksInProgress();
  tasksAwaitFeedback();
  createHeaderInitials();
}

/**
 * This function finds out, what daytime it is and returns the corresponding word.
 */
function getTimeOfDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let timeOfDay;

  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }
  createGreeting(timeOfDay);
}

/**
 *
 * This function creates the greeting on the right side of the summary page. If the ID of the user is set to 0 in the Variable idOfUser, no Name is displayed.
 * 
 * @param {string} timeOfDay morning, afternoon or evening, depending on the daytime.
 */
function createGreeting(timeOfDay) {
  let greetingContainer = document.getElementById("greetingContainer");
  greetingContainer.innerHTML = "";

  let welcomeText = "";
  let userNameText = "";

  const user = currentUser;

  if (user) {
    welcomeText = `Good ${timeOfDay},`;
    userNameText = `${user.username}`;
  }

  /*html*/
  greetingContainer.innerHTML = `
    <p class="welcome-text">${welcomeText}</p>
    <p class="user-name">${userNameText}</p>
  `;
}

/**
 *
 * This function changes the icon from dark to light on hover.
 * 
 * @param {string} idContainer The ID of the container that should change the image.
 * @param {string} requiredImage The actual path where the image is stored.
 */
function changeIconHover(idContainer, requiredImage) {
  const circleImage = document.getElementById(idContainer);
  circleImage.src = requiredImage;
}

/**
 * This function writes the number of the tasks into the corresponding div. It iterates through the array columns from data.tasks.js
 */
function setAmountTasksPosition() {
  for (let i = 0; i < columns.length; i++) {
    let position = columns[i];
    let amountContainer = document.getElementById(`amountTasks${position}`);

    amountContainer.innerHTML = `${summaryData.todo_count}`;
  }
}

/**
 * This function counts the total amount of tasks in the array dataTasks in data_tasks.js. It then writes this number into the corresponding div.
 */
function setTotalTasks() {
  document.getElementById("totalTasks").innerHTML = `${summaryData.total_count}`;
}

/**
 * This function counts the amount of tasks set to "urgent". It then write this number into the corresponding div.
 */
function setAmountUrgent() {
  document.getElementById("amountUrgent").innerHTML = `${summaryData.urgent_count}`;
}

/**
 * This function writes the date of the next deadline into the corresponding div. If there is no deadline in the future it writes "None" which is returned from formatNextDate.
 */
function setDeadline() {
  const formattedNextDate = formatNextDate();
  document.getElementById("nextDate").innerHTML = formattedNextDate;
}

/**
 * This function turns the next Date into the required format.
 * @returns month(text) day(number), year(number) If there is no date future it returns "None".
 */
function formatNextDate() {
  const nextDate = getNextDate();
  if (nextDate != 'None') {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = nextDate;
    return formattedDate;
  }
  return nextDate;
}

/**
 * This function gets the next date from now on. The time from currentDate is set to 0 because otherwise todays deadlines would not be displayed.
 * 
 * @returns{Date} - upcoming dates or null if there is none.
 */
function getNextDate() {
  return summaryData.next_deadline;
  // const currentDate = new Date();
  // currentDate.setHours(0, 0, 0, 0);
  // const isoDate = currentDate.toISOString();
  // let nextDate = null;

  // for (const task of dataTasks) {
  //   const taskDate = new Date(task.date);

  //   if (taskDate >= currentDate && (!nextDate || taskDate < nextDate)) {
  //     nextDate = taskDate;
  //   }
  // }
  // return nextDate;
}

function setDoneTasks() {
  document.getElementById("amountTasksDone").innerHTML = `${summaryData.done_count}`;
}

function setTasksInProgress() {
  document.getElementById("amountTasksInProgress").innerHTML = `${summaryData.in_progress_count}`;
}

function tasksAwaitFeedback() {
  document.getElementById("amountTasksAwaitFeedback").innerHTML = `${summaryData.feedback_count}`;
}
