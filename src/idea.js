class Idea {
  constructor(title, body, id) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {    
    localStorage.removeItem(this.id);
  }

  updateIdea() {
    saveToStorage();
  }

}
