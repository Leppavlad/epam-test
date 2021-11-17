export class UsersModal {
  constructor(selector) {
    this.setContainer(selector);
  }

  setContainer(selector) {
    if (selector) {
      this.modal = document.querySelector(selector);
    } else {
      console.error("[Modal] Selector hasn't been passed");
    }
  }
}