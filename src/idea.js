class Idea {
  constructor(title, body, id) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage(gblList) {
    localStorage.setItem('ideas', JSON.stringify(gblList));
  }

}
