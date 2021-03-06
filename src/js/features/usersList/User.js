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
      <div class="user__data">
        <div class="user__image">
          <img src="${picture.medium}">
        </div>
        <div class="user__info">
          <div class="user__info__name">${name.title}. ${name.first} ${name.last}</div>
        </div>
      </div>
    `;

    userWrapper.addEventListener("click", () => {
      modal.fillData(this.data);
      modal.open();
    })
    parentElement.append(userWrapper);
  }
}