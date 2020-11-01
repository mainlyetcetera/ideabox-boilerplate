var saveButton = document.querySelector('#save-button');

var titleField = document.querySelector('#title-input-area');
var bodyField = document.querySelector('#body-input-area');

var cardGrid = document.querySelector('#card-grid');

var ideaList = [];
var currentIdea;

window.onload = loadFromStorage;

titleField.addEventListener('keyup', disableEnableSaveButton);
bodyField.addEventListener('keyup', disableEnableSaveButton);

saveButton.addEventListener('click', saveIdea);

cardGrid.addEventListener('click', favoriteOrDeleteCard);

function disableEnableSaveButton() {
  if (titleField.value === '' || bodyField.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }

  toggleSaveBtnColor();
};

function toggleSaveBtnColor() {
  if (saveButton.disabled === false) {
    saveButton.className = 'enabled-save-button'
  } else {
    saveButton.className = 'disabled-save-button'
  }
};

function saveIdea(event) {
  event.preventDefault();
  disableEnableSaveButton();
  createIdea();
  addToList(createIdea);
  displayCard();
  clearForm();
};

function createIdea(title, body) {
  title = titleField.value;
  body = bodyField.value;
  currentIdea = new Idea(title, body);
};

function displayCard() {
  cardGrid.innerHTML = '';
  for(var i = 0; i < ideaList.length; i++) {
    createCard(ideaList[i]);
  };
};

function createCard(ideaToDisplay) {
  cardGrid.innerHTML += `
  <article class="card-section" id="${ideaToDisplay.id}">
    <div id="favorite-delete-part">
      <img src="./assets/star.svg" alt="favorite-button" class="star-img-white" id="${ideaToDisplay.id}">
      <img src="./assets/delete.svg" alt="delete-button" class="delete-img" id="${ideaToDisplay.id}">
    </div>
    <div id="message-part">
      <h3>${ideaToDisplay.title}</h3>
      <p>${ideaToDisplay.body}</p>
    </div>
    <div id="comment-part">
      <img src="./assets/comment.svg" alt="comment-button" id="comment-img">
      <label id="comment-word">Comment</label>
    </div>
  </article>
  `;
};

function addToList() {
  ideaList.push(currentIdea);
  currentIdea.saveToStorage();
};

function clearForm() {
  titleField.value = '';
  bodyField.value = '';
  disableEnableSaveButton();
};

function favoriteOrDeleteCard(event) {
  if (event.target.className === 'delete-img') {
    deleteCard(event);
  } else if (event.target.className === 'star-img-white'|| event.target.className === 'star-img-red') {
    favoriteCard(event);
  }
};

function deleteCard(event) {
  for (var i = 0; i < ideaList.length; i++) {
    if (event.target.id === `${ideaList[i].id}`) {
      ideaList[i].deleteFromStorage();
      ideaList.splice(i, 1);
    }
  }

  displayCard();
};

function favoriteCard(event) {
  for (var i = 0; i < ideaList.length; i++) {
    if (event.target.id === `${ideaList[i].id}` && event.target.className === 'star-img-white') {
      event.target.src = "./assets/star-active.svg";
      event.target.className = 'star-img-red';
    } else if (event.target.id === `${ideaList[i].id}` && event.target.className === 'star-img-red') {
      event.target.src = "./assets/star.svg";
      event.target.className = 'star-img-white';
    }
  }
};

function loadFromStorage() {
  for (var key in localStorage) {
    if (typeof localStorage[key] === 'string') {
      var parsed = JSON.parse(localStorage[key]);
      var cardToMakeIdeaAgain = new Idea(parsed.title, parsed.body);
      ideaList.push(cardToMakeIdeaAgain);
    }
  }

  console.log(localStorage);
  displayCard();
}
