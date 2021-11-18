import { UsersList } from './js/features/usersList/UsersList';
import { UsersModal } from './js/features/usersList/UsersModal';
import './css/style.scss'

const usersList = new UsersList({
  url: "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture",
  selector: "#usersList"
}).setModal(new UsersModal({
  selector: "#usersModal",
  activeClass: "usersModal_active"
})).init();

const usersFilter = document.querySelector("#usersFilter");
usersFilter.addEventListener("change", ({ target }) => {
  if (target.classList.contains("select")) {
    const [field, category] = target.value.split(":");
    if (category === "order") {
      usersList.setFilter({
        order: field
      });
    } else {
      usersList.setFilter({ category, field });
    }
  }
});
usersFilter.querySelector(".search").addEventListener("input", ({ target: { value: input } }) => {
  usersList.setFilter({ search: input });
})