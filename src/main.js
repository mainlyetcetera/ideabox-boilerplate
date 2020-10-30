var saveButton = document.querySelector('#save-button');

var titleField = document.querySelector('#title-input-area');
var bodyField = document.querySelector('#body-input-area');

var cardGrid = document.querySelector('#card-grid');

var ideaList = [];
var currentIdea;

titleField.addEventListener('keyup', disableEnableSaveButton);
bodyField.addEventListener('keyup', disableEnableSaveButton);
saveButton.addEventListener('click', saveIdea);


function disableEnableSaveButton() {
  if (titleField.value === '' || bodyField.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
  toggleSaveBtnColor()
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
  displayCard(currentIdea);
  addToList(currentIdea);
  clearForm();
};

function createIdea(title, body) {
  title = titleField.value;
  body = bodyField.value;
  currentIdea = new Idea(title, body);
};

function displayCard() {
  cardGrid.innerHTML += `
  <article class="card-section" id="${currentIdea.id}">
    <div id="favorite-delete-part">
      <button>
        <img src="./assets/star.svg" alt="favorite-button" class="star-img">
      </button>
      <button>
        <img src="./assets/delete.svg" alt="delete-button" class="delete-img">
      </button>
    </div>
    <div id="message-part">
      <h3>${currentIdea.title}</h3>
      <p>${currentIdea.body}</p>
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
};

function clearForm() {
  titleField.value = '';
  bodyField.value = '';
  disableEnableSaveButton();
};
