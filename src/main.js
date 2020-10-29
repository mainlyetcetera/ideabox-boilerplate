var saveButton = document.querySelector('#save-button');
var titleField = document.querySelector('#title-input-area');
var bodyField = document.querySelector('#body-input-area');
var cardGrid = document.querySelector('#card-grid');
var ideaList = [];

titleField.addEventListener('keyup', toggleSaveButton);
bodyField.addEventListener('keyup', toggleSaveButton);
saveButton.addEventListener('click', saveIdea);

window.onload = toggleSaveButton;

function toggleSaveButton() {
  if (titleField.value === '' || bodyField.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function saveIdea(event) {
  event.preventDefault();
  var currentIdea = createIdea();
  displayCard(currentIdea);
  addToList(currentIdea);
  clearForm();
}

function createIdea(title, body) {
  title = titleField.value;
  body = bodyField.value;
  var idea = new Idea(title, body);
  return idea;
}

function displayCard(idea) {
  cardGrid.innerHTML += `
  <article class="card-section">
    <div id="favortie-delete-part">
      <img src="./assets/star-active.svg" alt="favorite-button" class="star-img">
      <img src="./assets/delete.svg" alt="delete-button" class="delete-img">
    </div>
    <div id="message-part">
      <h3>${idea.title}</h3>
      <p>${idea.body}</p>
    </div>
    <div id="comment-part">
      <img src="./assets/comment.svg" alt="comment-button" id="comment-img">
      <label id="comment-word">Comment</label>
    </div>
  </article>
  `;
}

function addToList(idea) {
  ideaList.push(idea);
}

function clearForm() {
  titleField.value = '';
  bodyField.value = '';
}
