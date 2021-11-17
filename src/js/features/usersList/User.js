export class User {
  constructor(data) {
    this.data = data;
  }

  render(parentElement) {
    console.log(parentElement, this.data);
    const { gender, name, location, email, phone, picture } = this.data;

    const userWrapper = document.createElement("div");
    userWrapper.className = "user user__full";
    userWrapper.innerHTML = `
      <div class="user__data">Full ${gender}-${name}-${location}-${email}-${phone}-${picture}</div>
    `;
    parentElement.append(userWrapper);
  }

  renderForModal(parentElement, modal) {
    const { gender, name, location, email, phone, picture } = this.data;

    const userWrapper = document.createElement("div");
    userWrapper.className = "user user__short";
    userWrapper.innerHTML = `
      <div class="user__data">${name.first} ${name.last}</div>
    `;
    parentElement.append(userWrapper);
  }
}