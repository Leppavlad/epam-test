import { UsersList } from './js/features/usersList/UsersList';
import { UsersModal } from './js/features/usersList/UsersModal';
import './css/style.css'

new UsersList({
  url: "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture",
  selector: "#usersList"
}).setModal(new UsersModal("#usersModal")).init();
