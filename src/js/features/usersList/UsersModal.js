export class UsersModal {
  // isActive = false;

  constructor({ selector, activeClass }) {
    this.setContainer(selector);
    this.activeClass = activeClass;
  }

  setContainer(selector) {
    if (selector) {
      this.modal = document.querySelector(selector);
      console.log(this.modal);

      this.modal.querySelectorAll("[data-modal='close']").forEach(element => {
        element.addEventListener("click", () => {
          this.close();
        })
      })
    } else {
      console.error("[Modal] Selector hasn't been passed");
    }
  }

  fillData(data) {
    const { name: { first: firstName, last: lastName, title }, location: { street, city, state, postcode }, email, phone, picture: { large } } = data;
    const [
      name,
      address,
      contactPhone,
      contactEmail,
      image
    ] = [
        document.querySelector("[data-modalContent='name']"),
        document.querySelector("[data-modalContent='address']"),
        document.querySelector("[data-modalContent='phone']"),
        document.querySelector("[data-modalContent='email']"),
        document.querySelector("[data-modalContent='image']")
      ]

    name.innerHTML = `${title}. ${firstName} ${lastName}`;
    address.innerHTML = `${postcode}, ${state}, ${city}, ${street}`;
    contactPhone.innerHTML = `<a href="tel:${phone}">${phone}</a>`;
    contactEmail.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    image.setAttribute("src", large);

    console.log(this.modalOutputs);
  }

  open() {
    this.modal.classList.add(this.activeClass);
  }
  close() {
    this.modal.classList.remove(this.activeClass);
  }
}