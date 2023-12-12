let priorityOfTask = null;
let newSubtasks = [];
let selectedContacts = [];
let hiddenContacts = 0;
let nextFreeId;
let contactListOpen = false;
let actualPosition = "Todo"
let switchDropDownCategory = false;

function setPositionTask(positionOfTask) {
    actualPosition = positionOfTask;
}

/**
 * This function ensures that you can add a new subtask with the "ENTER" key. 
 * @param {string} event = This parameter is the event that is passed when the Enter key is pressed.
 */
function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addSubtask();
    }
}

/**
 * This function initializes the add task page.
 * 
 */
async function initAddTask() {
    await getTasks();
    await getUsers();
    await getCurrentUser();
    await getContacts();
    loadContactsSelection();
    createHeaderInitials();
    minDateToday();
}

/**
 * This function triggers the rendering of the contact list.
 * 
 */
function loadContactsSelection() {
    if (templatesLoaded) {
        loadContactsToAssign();
    } else {
        setTimeout(() => {
            loadContactsSelection();
        }, 50);
    }
}

/**
 * With this function the contacts are loaded into the selection list.
 * 
 */
function loadContactsToAssign() {
    let content = document.getElementById('contactsDropDown');
    content.innerHTML = '';
    contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += renderContacts(contact);
    };
}

/**
 * This function triggers the checking of the priority buttons.
 * @param {string} id = This value corresponds to the clicked button.
 */
function activePrioButton(id) {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
    checkPrioButton(id, button1, button2, button3);
}

/**
 * This function checks which button was clicked and then triggers the corresponding function to highlight it.
 * @param {string} id = This is the clicked Button.
 * @param {string} button1 = This ist the "urgent"-button.
 * @param {string} button2 = This ist the "medium"-button.
 * @param {string} button3 = This ist the "low"-button.
 */
function checkPrioButton(id, button1, button2, button3) {
    if (priorityOfTask == id) {
        resetAll();
    } else if (id == 'low') {
        highlightButton3(button1, button2, button3);
    } else if (id == 'medium') {
        highlightButton2(button1, button2, button3);
    } else if (id == 'urgent') {
        highlightButton1(button1, button2, button3);
    };
}

/**
 * When a button is clicked that is already highlighted, this function is called to remove the highlight.
 * 
 */
function resetAll() {
    let button1 = document.getElementById('urgent');
    let button2 = document.getElementById('medium');
    let button3 = document.getElementById('low');
    resetButton(button1, 'urgent')
    resetButton(button2, 'medium')
    resetButton(button3, 'low')
    priorityOfTask = false;
}

/**
 * This function Highlight button "urgent"
 * @param {string} button1 = This ist the "urgent"-button.
 * @param {string} button2 = This ist the "medium"-button.
 * @param {string} button3 = This ist the "low"-button.
 */
function highlightButton1(button1, button2, button3) {
    activateButton(button1, 'urgent')
    button1.style.backgroundColor = '#FF3D00';
    resetButton(button2, 'medium');
    resetButton(button3, 'low');
}

/**
 * This function Highlight button "medium"
 * @param {string} button1 = This ist the "urgent"-button.
 * @param {string} button2 = This ist the "medium"-button.
 * @param {string} button3 = This ist the "low"-button.
 */
function highlightButton2(button1, button2, button3,) {
    activateButton(button2, 'medium');
    button2.style.backgroundColor = '#FFA800';
    resetButton(button1, 'urgent');
    resetButton(button3, 'low');
}

/**
 * This function Highlight button "low"
 * @param {string} button1 = This ist the "urgent"-button.
 * @param {string} button2 = This ist the "medium"-button.
 * @param {string} button3 = This ist the "low"-button.
 */
function highlightButton3(button1, button2, button3) {
    activateButton(button3, 'low');
    button3.style.backgroundColor = '#7AE229';
    resetButton(button1, 'urgent');
    resetButton(button2, 'medium');
}

/**
 * This function set the design for an Highlighted Button.
 * @param {string} button = This is the Button to Highlight.
 * @param {string} id = this is the id(name) of the button.
 */
function activateButton(button, id) {
    button.style.color = '#FFFFFF';
    button.childNodes[1].src = `../img/add_task/${id}_white.png`;
    priorityOfTask = id;
}

/**
 * This function set the design of the button to normal.
 * @param {string} button = This is the Button to Highlight.
 * @param {string} id = this is the id(name) of the button.
 */
function resetButton(button, id) {
    button.style.backgroundColor = 'white';
    button.style.color = '#000000';
    button.childNodes[1].src = `../img/add_task/${id}.png`;
}

/**
 * This function creates the icons in the input field for the subtasks.
 * 
 */
function activateSubtask() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    let input = document.getElementById('inputSubTask');

    icon1.classList.remove('d-none');
    partingLine.classList.remove('d-none');
    icon2.innerHTML = '<img src="../img/add_task/check.png">';
    icon2.setAttribute('onClick', 'addSubtask()');
    input.focus();
}

/**
 * This function clears the input field of the subtasks.
 * 
 */
function clearSubTaskInput() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    let input = document.getElementById('inputSubTask');

    icon1.classList.add('d-none');
    partingLine.classList.add('d-none');
    icon2.innerHTML = '<img src="../img/add_task/done.png">';
    icon2.setAttribute('onClick', 'activateSubtask()');
    input.value = '';
}

/**
 * This checks whether something has been entered in the input field of the subtasks.
 * @returns = Returns true if at least one character was written.
 */
function checkInputIsEmpty() {
    return document.getElementById('inputSubTask').value.length == 0;
}

/**
 * Here the icons are removed from the input field of the subtasks when the focus disappears.
 * 
 */
function leaveSubTaskInput() {
    let icon1 = document.getElementById('inputSubTaskIcon1');
    let icon2 = document.getElementById('inputSubTaskIcon2');
    let partingLine = document.getElementById('partingLineButtons');
    if (checkInputIsEmpty()) {
        icon1.classList.add('d-none');
        partingLine.classList.add('d-none');
        icon2.innerHTML = '<img src="./img/add_task/add.png">';
        icon2.setAttribute('onClick', 'activateSubtask()')
    }
}

/**
 * This function adds the created subtask to an array and triggers the function that displays it.
 * 
 */
function addSubtask() {
    let input = document.getElementById('inputSubTask');
    let newSubtask = {
        content: input.value,
        checked: false,
    };
    newSubtasks.push(newSubtask);
    loadSubtasks();
    input.value = '';
}

/**
 * This function ensures that the subtask is displayed and triggers rendering.
 * 
 */
function loadSubtasks() {
    let showSubtasks = document.getElementById('showSubtasks');
    let i = 0;
    showSubtasks.innerHTML = '';
    newSubtasks.forEach((subtask) => {
        showSubtasks.innerHTML += renderSubtasks(subtask, i);
        i++;
    })
}

/**
 * This function deletes all user input on the addTask page.
 * 
 */
function clearAll() {
    document.getElementById('inputTitel').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('inputSubTask').value = '';
    document.getElementById('selectCategory').selectedIndex = 0;
    document.getElementById('selectCategory').value = '';
    newSubtasks.splice(0, newSubtasks.length);
    selectedContacts.splice(0, selectedContacts.length);
    resetAll();
    loadSubtasks();
    loadContactsSelection();
    renderContactInitialIcons();
}

/**
 * This function triggers the subtasks to become editable.
 * @param {string} id = id of button.
 * @param {string} btn1 = Thats the edit-button in the editable field. 
 * @param {string} btn2 = Thats the delete-button in the editable field.
 * @param {string} i = The index of subtask in array subtasks.
 */
function editSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    let content = document.getElementById(`subtaskContent${i}`);
    try {
        makeEditable(subtask, button1, button2, content, id, i, btn1, btn2);
    } catch (e) { };
}

/**
 * Here the subtask is made editable.
 * @param {string} subtask = This is the Object subtaks.
 * @param {string} button1 = Thats the delete-button in the editable field. 
 * @param {string} button2 = Thats the safe-button in the editable field.
 * @param {string} content = The div where the Subtasks rendert.
 * @param {string} id = The id of the subtask.
 * @param {string} i = The index of the subtask in array.
 * @param {string} btn1 = Thats the edit-button in the editable field. 
 * @param {string} btn2 = Thats the delete-button in the editable field.
 */
function makeEditable(subtask, button1, button2, content, id, i, btn1, btn2) {
    content.setAttribute('contentEditable', 'true');
    subtask.classList.add('editable-content')
    content.focus();
    subtask.removeAttribute('onclick');
    button1.setAttribute('src', 'img/add_task/delete.png');
    button1.setAttribute('onclick', `deleteSubtask('${i}'); 'doNotTriggerEvent(event)'`);
    button2.setAttribute('src', 'img/add_task/done.png');
    button2.setAttribute('onclick', `saveEditSubtask('${id}', '${btn1}', '${btn2}', '${i}'); 'doNotTriggerEvent(event)'`);
}

/**
 * This function deletes the subtask.
 * @param {string} i = Index of subtask in array.
 */
function deleteSubtask(i) {
    newSubtasks.splice(i, 1);
    loadSubtasks();
}

/**
 * This function saves the entered text after editing.
 * @param {string} id = The id of the subtask.
 * @param {string} btn1 = Thats the edit-button in the editable field. 
 * @param {string} btn2 = Thats the delete-button in the editable field.
 * @param {string} i = The index of the subtask in array.
 */
function saveEditSubtask(id, btn1, btn2, i) {
    let subtask = document.getElementById(id);
    let content = document.getElementById(`subtaskContent${i}`);
    let button1 = document.getElementById(btn1);
    let button2 = document.getElementById(btn2);
    pushEditSubtask(id, i, subtask, content, button1, button2);
    loadSubtasks();
}

/**
 * This function saves the entered text in the array and sets the editability to false.
 * @param {string} id = The id of the subtask.
 * @param {string} i = The index of the subtask in array.
 * @param {string} subtask = This is the Object subtaks.
 * @param {string} content = The div where the Subtasks rendert.
 * @param {string} button1 = Thats the delete-button in the editable field. 
 * @param {string} button2 = Thats the safe-button in the editable field.
 */
function pushEditSubtask(id, i, subtask, content, button1, button2) {
    newSubtasks.splice(i, 1,
        {
            content: content.innerText,
            checked: false,
        }
    );
    subtask.removeAttribute('contentEditable');
    button1.setAttribute('src', 'img/add_task/edit.png');
    button1.setAttribute('onclick', `editSubtask('subtask${i}', 'editSubtaskIcon1${i}', 'editSubtaskIcon2${i}', '${i}')`);
    button2.setAttribute('src', 'img/add_task/delete.png');
    button2.setAttribute('onclick', `deleteSubtask('${i}')`);
}

/**
 * This function ensures that the dialog is not closed when saving a subtask.
 * @param {*} event = The close event from parent.
 */
function doNotTriggerEvent(event) {
    event.stopPropagation();
}

/**
 * This function opens the contact list in the "Assigned to" selection field.
 * 
 */
function openContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactListOpen = true;
    checkScreenWidth(contactList);
    openContactsDropDown.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        contactList.setAttribute('onclick', 'closeContactList()');
        openContactsDropDown.setAttribute('onclick', 'closeContactList()');
    }, 100);
    highlightChoosenContact();
}

/**
 * This function checks the screen width when closing the selection field in order to display the height correctly.
 * @param {string} contactList = The div, where the contacts are rendered.
 */
function checkScreenWidth(contactList) {
    if (window.innerWidth <= 1200) {
        if (contactListOpen) {
            contactList.style.height = '288px';
        } else {
            contactList.style.height = '46px';
        }
    } else {
        if (contactListOpen) {
            contactList.style.height = '352px';
        } else {
            contactList.style.height = '50px';
        }
    }
}

/**
 * This function closes the contact list in the "Assigned to" selection field.
 * 
 */
function closeContactList() {
    let contactList = document.getElementById('contactList');
    let openContactsDropDown = document.getElementById('openContactsDropDown');
    contactListOpen = false;
    checkScreenWidth(contactList);
    openContactsDropDown.style.transform = 'rotate(0deg)';
    setTimeout(() => {
        contactList.setAttribute('onclick', 'openContactList(); doNotTriggerEvent(event)');
        openContactsDropDown.setAttribute('onclick', 'openContactList(); doNotTriggerEvent(event)');
    }, 100);
}

/**
 * This function takes the value from the input field and searches for matches.
 * 
 */
function searchContactToAssign() {
    let contactsDropDown = document.getElementById('contactsDropDown');
    let input = document.getElementById('contactInput').value.toLowerCase();
    contactsDropDown.innerHTML = '';
    let matchingContacts = contacts.filter(contact =>
        contact.firstname.toLowerCase().includes(input) || contact.lastname.toLowerCase().includes(input)
    );
    matchingContacts.forEach((contact) => {
        contactsDropDown.innerHTML += renderContacts(contact);
    })
}

/**
 * This function highlights the selected contact and adds the contact to the symbol array.
 * @param {string} id = This is the id of the contact.
 */
function chooseContactToAssign(id) {
    selectedContacts.push(id);
    highlightChoosenContact();
    renderContactInitialIcons();
}

function highlightChoosenContact() {
    selectedContacts.forEach((choosenContact) => {
        let checkImg = document.getElementById(`checkContact${choosenContact}`);
        let contact = document.getElementById(`contact${choosenContact}`);
        checkImg.setAttribute('src', '../img/add_task/checked.png');
        contact.setAttribute('onclick', `unchooseContact(${choosenContact}); doNotTriggerEvent(event)`);
        contact.classList.add('active-contact');
    })
}

/**
 * This function removes the highlite from the selected contact and delete the contact to the symbol array.
 * @param {string} id = This is the id of the contact.
 */
function unchooseContact(id) {
    let checkImg = document.getElementById(`checkContact${id}`);
    let contact = document.getElementById(`contact${id}`);
    checkImg.setAttribute('src', '../img/add_task/Check_button.png');
    contact.setAttribute('onclick', `chooseContactToAssign(${id}); doNotTriggerEvent(event)`);
    contact.classList.remove('active-contact');
    let i = selectedContacts.indexOf(id);
    selectedContacts.splice(i, 1);
    renderContactInitialIcons();
}

/**
 * This function triggers the rendering of the contact icons.
 * 
 */
function renderContactInitialIcons() {
    let contactInitialIcons = document.getElementById('contactInitialIcons');
    contactInitialIcons.innerHTML = '';
    selectedContacts.forEach((id) => {
        let i = getIndexOf(contacts, 'id', id)
        let contact = contacts[i]
        contactInitialIcons.innerHTML += showInitialIcon(contact);
    })
}

/**
 * This function collects all the information required to create a new task and triggers the creation itself.
 * 
 */
function createNewTask() {
    let createTask = document.getElementById('createTask');
    let inputTitel = document.getElementById('inputTitel').value;
    let inputDescription = document.getElementById('inputDescription').value;
    let inputDate = document.getElementById('inputDate').value;
    let selectCategory = document.getElementById('selectCategory').value;
    let dialogSucces = document.getElementById('dialogSucces');
    CreateTaskRoutine(createTask, inputTitel, inputDescription, inputDate, selectCategory, dialogSucces);
}

/**
 * This function calls up all the functions required to create the task.
 * @param {string} createTask = This is the button to submit.
 * @param {string} inputTitel = Task Titel
 * @param {string} inputDescription = This is the Description of the Task.
 * @param {string} inputDate = This is the date by which the task must be completed.
 * @param {string} selectCategory = This is the Task category.
 * @param {string} dialogSucces = This is the dialog that is displayed when the task has been successfully created.
 */
function CreateTaskRoutine(createTask, inputTitel, inputDescription, inputDate, selectCategory, dialogSucces) {
    nextFreeId = findFreeId(dataTasks);
    createTask.style.backgroundColor = '#091931';
    createJson(nextFreeId, inputTitel, inputDescription, inputDate, selectCategory);
    setTasks();
    checkOpenBoard();
    showSuccessDialog(dialogSucces);
}

/**
 * This function shows the dialog when the task has been successfully created.
 * @param {string} dialogSucces = This is the dialog that is displayed when the task has been successfully created.
 */
function showSuccessDialog(dialogSucces) {
    dialogSucces.classList.remove('d-none');
    setTimeout(() => {
        clearAll();
        dialogSucces.classList.add('d-none');
    }, 1000);
}

/**
 * This function checks whether the task was created from the dialog in the board or directly via add task.
 * 
 */
function checkOpenBoard() {
    if (idOfCurrentPage == 2) {
        renderTasksBoard();
        setTimeout(() => {
            closeDialog();
        }, 1000);
    } else {
        setTimeout(() => {
            window.open('./board.html', '_self');
        }, 1000);
    }
}

/**
 * This function creates the JSON, which is then pushed into the Tasks array.
 * @param {string} nextFreeId = This is the next free id in Array Tasks.
 * @param {string} inputTitel = Task Titel
 * @param {string} inputDescription = This is the Description of the Task.
 * @param {string} inputDate = This is the date by which the task must be completed.
 * @param {string} selectCategory = This is the Task category.
 */
function createJson(nextFreeId, inputTitel, inputDescription, inputDate, selectCategory) {
    let newTask = {
        id: nextFreeId,
        position: actualPosition,
        category: selectCategory,
        title: inputTitel,
        task: inputDescription,
        subtasks: [],
        assignedTo: selectedContacts,
        urgency: priorityOfTask,
        date: inputDate,
    };
    pushSubtasks(newTask);
    dataTasks.push(newTask);
}

/**
 * This function pushes the subtasks into the newtask array.
 * @param {string} newTask = The new task is cached in this JSON. 
 */
function pushSubtasks(newTask) {
    newSubtasks.forEach((task) => {
        newTask.subtasks.push(task);
    });
}

/**
 * This function changes the color of the button.
 * 
 */
function changeBtnColor() {
    let addContact = document.getElementById('addContact');
    addContact.style.backgroundColor = '#091931';
}

/**
 * Diese Funktion überprüft ob das Drop Down Menu geöffnet ist.
 * 
 */
function toggleDropDownCategory() {
    switchDropDownCategory = !switchDropDownCategory;
    if (switchDropDownCategory) {
        showDropDownCategory();
    } else {
        hideDropDownCategory();
    }
}

/**
 * This function opens the drop down menu.
 * 
 */
function showDropDownCategory() {
    switchDropDownCategory = true;
    const selectCategoryOptions = document.getElementById('selectCategoryOptions');
    const arrow = document.getElementById('arrowDrowpDown');
    selectCategoryOptions.classList.remove('d-none');
    arrow.style.transform = 'rotate(180deg)';
    document.getElementById("selectCategory").focus();
}

/**
 * The selected category takes over this function.
 * @param {string} category 
 */
function setCategory(category) {
    document.getElementById('selectCategory').value = category;
    hideDropDownCategory();
}

/**
 * This function closes the drop down menu.
 * 
 */
function hideDropDownCategory() {
    const selectCategoryOptions = document.getElementById('selectCategoryOptions');
    const arrow = document.getElementById('arrowDrowpDown');
    arrow.style.transform = 'rotate(0deg)';
    document.getElementById("selectCategory").blur();
    hideDropDownCategoryDelay()
}

/**
 * This function close the drop down menu.
 * 
 */
function hideDropDownCategoryDelay() {
    setTimeout(function () {
        switchDropDownCategory = false;
        selectCategoryOptions.classList.add('d-none');
    }, 100);
}

/**
 * This function sets the minimal input date in addtask.js to today.
 */
function minDateToday() {
    let inputDate = document.getElementById('inputDate');
    let today = new Date().toISOString().split("T")[0];
    inputDate.min = today;
}