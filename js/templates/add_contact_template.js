/**
 * This function generates and returns HTML code for the "Add New Contact" section.
 * Includes input fields for the contact's name, email, and phone number,
 * along with buttons for canceling or creating the contact.
 * 
 * @returns {string} - The HTML code for the "Add New Contact" section.
 */
function generatAddNewContactHTML(){
    return  /*html*/`
    <div class="add-new-cont-left">
        <div class="icon"> 
            <img src="img/add_new_contact/icon.svg">
        </div>
        <div class="headline-add-new-cont">
            <p>Add contact</p>
            <span>Tasks are better with a team!</span>
        </div>
        <img src="img/add_new_contact/underline.svg">
    </div>    
    <div onclick="closeAddNewContact()" class="close-btn">
    </div>
    <div class="circle">
        <img src="img/add_new_contact/circle.svg">
        <div class="img-person">
            <img src="img/add_new_contact/person.svg">
        </div>
    </div>
    <form class="info-new-cont" onsubmit="createNewContact(); doNotTriggerEvent(event); return false">
        <div class="input-field">
        <input id="nameInput" type="text" pattern="[A-ZÄÖÜß][a-zA-ZäöüÄÖÜß ]* [A-ZÄÖÜß][a-zA-ZäöüÄÖÜß]*" placeholder="Name" class="form-control" title="Capitalize the first letter." required>
        <span class="info-icon icon-name"></span>
        </div>
        <div class="input-field"> 
            <input id="email" type="email" title="e.g. maxmustermann@hotmail.de" placeholder="Email" class="form-control" required>
            <span class="info-icon icon-email"></span>
        </div>
        <div class="input-field">
        <input id="phone" type="tel" pattern="[0-9 ]{6,}" title="You must enter at least 6 characters. Only numbers allowed." placeholder="Phone" class="form-control" required>
            <span class="info-icon icon-phone"></span>
        </div>
        <div class="btn-cancel-create">
            <button id="btn-cancel" type="button" onclick="closeAddNewContact()">Cancel
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0692 12.0001L17.3122 17.2431M6.82617 17.2431L12.0692 12.0001L6.82617 17.2431ZM17.3122 6.75708L12.0682 12.0001L17.3122 6.75708ZM12.0682 12.0001L6.82617 6.75708L12.0682 12.0001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button id="btn-create" type="submit">Create contact
                <img src="../img/add_task/check2.png" alt>
            </button>
        </div>
    </form>
    `;
}