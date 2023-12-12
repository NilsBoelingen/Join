let idOfUser = 1;

/**
 * This function contains all the functionts that should be called on load of the body.
 */
async function init() {
  await getTasks();
  await getUsers();
  await getCurrentUser();
  getTimeOfDay();
  setAmountTasksPosition();
  setTotalTasks();
  setAmountUrgent();
  setDeadline();
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

  if (currentUser === 1) {
    welcomeText = `Good ${timeOfDay}`;
  } else {
    const user = users.find((user) => user.id === currentUser);

    if (user) {
      welcomeText = `Good ${timeOfDay},`;
      userNameText = `${user.name}`;
    }
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
    let amountOfTasks = countTasks(position);

    amountContainer.innerHTML = `${amountOfTasks}`;
  }
}

/**
 * This function counts the number of tasks in the column "position"
 * 
 * @param {string} position - The positions are stored in the array columns in data.tasks.js
 * @returns {number} - Number of tasks in the position, for example "Todo".
 */
function countTasks(position) {
  return dataTasks.filter((task) => task.position === position).length;
}

/**
 * This function counts the total amount of tasks in the array dataTasks in data_tasks.js. It then writes this number into the corresponding div.
 */
function setTotalTasks() {
  const amountTotalTasks = dataTasks.length;
  document.getElementById("totalTasks").innerHTML = `${amountTotalTasks}`;
}

/**
 * This function counts the amount of tasks set to "urgent". It then write this number into the corresponding div.
 */
function setAmountUrgent() {
  let amountUrgent = dataTasks.filter((task) => task.urgency === "urgent").length;
  document.getElementById("amountUrgent").innerHTML = `${amountUrgent}`;
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

  if (nextDate) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = nextDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  return "None";
}

/**
 * This function gets the next date from now on. The time from currentDate is set to 0 because otherwise todays deadlines would not be displayed.
 * 
 * @returns{Date} - upcoming dates or null if there is none.
 */
function getNextDate() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const isoDate = currentDate.toISOString();
  let nextDate = null;

  for (const task of dataTasks) {
    const taskDate = new Date(task.date);

    if (taskDate >= currentDate && (!nextDate || taskDate < nextDate)) {
      nextDate = taskDate;
    }
  }
  return nextDate;
}
