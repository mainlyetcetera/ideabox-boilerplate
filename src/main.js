var saveButton = document.querySelector('#save-button');
var showFavoriteIdea = document.querySelector('#favorite-idea')

var titleField = document.querySelector('#title-input-area');
var bodyField = document.querySelector('#body-input-area');

var cardGrid = document.querySelector('#card-grid');

var ideaList = JSON.parse(localStorage.getItem('ideas')) || [];
var currentIdea;

window.onload = displayCard;
titleField.addEventListener('keyup', disableEnableSaveButton);
bodyField.addEventListener('keyup', disableEnableSaveButton);
saveButton.addEventListener('click', saveIdea);
cardGrid.addEventListener('click', favoriteOrDeleteCard);
showFavoriteIdea.addEventListener('click', displayFavoriteCard);

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
  displayCard();
  clearForm();
};

function createIdea(title, body) {
  title = titleField.value;
  body = bodyField.value;
  currentIdea = new Idea(title, body);
  ideaList.push(currentIdea)
  currentIdea.saveToStorage(ideaList);
};

function displayCard() {
  cardGrid.innerHTML = '';
  for(var i = 0; i < ideaList.length; i++) {
    createCard(ideaList[i]);
  };
};

function createCard(ideaToDisplay) {
  var changeStarColor = 'star-img-white'
  var changeImgSrc = './assets/star.svg'
  if (ideaToDisplay.star === true) {
    changeStarColor = 'star-img-red'
    changeImgSrc = './assets/star-active.svg'
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
      ideaList.splice(i, 1);
    }
  }

  localStorage.setItem('ideas', JSON.stringify(ideaList));
  displayCard();
};

function favoriteCard(event) {
  for (var i = 0; i < ideaList.length; i++) {
    if (event.target.id === `${ideaList[i].id}` && event.target.className === 'star-img-white') {
      event.target.src = "./assets/star-active.svg";
      event.target.className = 'star-img-red';
      ideaList[i].star = true;
    } else if (event.target.id === `${ideaList[i].id}` && event.target.className === 'star-img-red') {
      event.target.src = "./assets/star.svg";
      event.target.className = 'star-img-white';
      ideaList[i].star = false;
    }
  }
  localStorage.setItem('ideas', JSON.stringify(ideaList));
};

function displayFavoriteCard() {
  cardGrid.innerHTML = '';
  for(var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].star === true) {
    createCard(ideaList[i]);
    }
  }
};
