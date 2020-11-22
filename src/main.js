const saveButton = document.querySelector('#save-button');
const showFavoriteIdeaButton = document.querySelector('#favorite-idea');
const searchBar = document.querySelector('#search-bar');

const titleField = document.querySelector('#title-input-area');
const bodyField = document.querySelector('#body-input-area');

let cardGrid = document.querySelector('#card-grid');

let ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
let currentIdea;

const toggleSaveButton = () => {
  !titleField.value || !bodyField.value ? saveButton.disabled = true : saveButton.disabled = false;
  toggleSaveBtnColor();
}

const toggleSaveBtnColor = () => !saveButton.disabled ? saveButton.className = 'enabled-save-button' : saveButton.className = 'disabled-save-button';

const saveIdea = event => {
  event.preventDefault();
  toggleSaveButton();
  createIdea();
  displayCard(ideaList);
  clearForm();
}

function createIdea(title, body) {
  title = titleField.value;
  body = bodyField.value;
  currentIdea = new Idea(title, body);
  ideaList.push(currentIdea);
  currentIdea.saveToStorage(ideaList);
}

function displayCard(list) {
  cardGrid.innerHTML = '';
  for (var i = 0; i < list.length; i++) {
    createCard(list[i]);
  }
}

function createCard(ideaToDisplay) {
  var changeStarColor = 'star-img-white';
  var changeImgSrc = './assets/star.svg';
  if (ideaToDisplay.star === true) {
    changeStarColor = 'star-img-red';
    changeImgSrc = './assets/star-active.svg';
  }

  cardGrid.innerHTML += `
  <article class="card-section" id="${ideaToDisplay.id}">
    <div id="favorite-delete-part">
      <img src="${changeImgSrc}" alt="favorite-button" class="${changeStarColor}" id="${ideaToDisplay.id}">
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
}

function clearForm() {
  titleField.value = '';
  bodyField.value = '';
  toggleSaveButton();
}

function favoriteOrDeleteCard(event) {
  if (event.target.className === 'delete-img') {
    deleteCard(event);
  } else if (event.target.className === 'star-img-white'|| event.target.className === 'star-img-red') {
    favoriteCard(event);
  }
}

function deleteCard(event) {
  for (var i = 0; i < ideaList.length; i++) {
    if (event.target.id === `${ideaList[i].id}`) {
      ideaList.splice(i, 1);
    }
  }

  localStorage.setItem('ideas', JSON.stringify(ideaList));
  displayCard(ideaList);
}

function favoriteCard(event) {
  var target = event.target;
  for (var i = 0; i < ideaList.length; i++) {
    if (target.id === `${ideaList[i].id}` && target.className === 'star-img-white') {
      target.src = "./assets/star-active.svg";
      target.className = 'star-img-red';
      ideaList[i].star = true;
    } else if (target.id === `${ideaList[i].id}` && target.className === 'star-img-red') {
      target.src = "./assets/star.svg";
      target.className = 'star-img-white';
      ideaList[i].star = false;
    }
  }

  localStorage.setItem('ideas', JSON.stringify(ideaList));
}

function displayFavoriteCard() {
  showFavoriteIdeaButton.innerText = 'Show All Ideas';
  cardGrid.innerHTML = '';
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].star === true) {
      createCard(ideaList[i]);
    }
  }
}

function toggleCardDisplay() {
  if (showFavoriteIdeaButton.innerText === 'Show Starred Ideas') {
    displayFavoriteCard();
  } else {
    showFavoriteIdeaButton.innerText = 'Show Starred Ideas';
    displayCard(ideaList);
  }
}

function searchIdea() {
  var searchValue = searchBar.value.toLowerCase();
  cardGrid.innerHTML = '';
  var matchIdea = [];
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].title.toLowerCase().includes(searchValue) || ideaList[i].body.toLowerCase().includes(searchValue)) {
      matchIdea.push(ideaList[i]);
    }
  }

  displayCard(matchIdea);
}

window.onload = displayCard(ideaList);
titleField.addEventListener('keyup', toggleSaveButton);
bodyField.addEventListener('keyup', toggleSaveButton);
saveButton.addEventListener('click', saveIdea);
cardGrid.addEventListener('click', favoriteOrDeleteCard);
showFavoriteIdeaButton.addEventListener('click', toggleCardDisplay);
searchBar.addEventListener('keyup', searchIdea);