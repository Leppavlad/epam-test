import { getData } from "../../utils/getData";
import { User } from "./User";

export class UsersList {
  usersList = []
  filter = {
    category: "name",
    field: "last",
    order: "desc"
  };;

  constructor({
    url, selector
  } = {}) {
    this.setUrl(url);
    this.setContainer(selector);
  }

  setUrl(url) {
    if (url) {
      this.url = url;
    } else {
      console.error("[Constructor] Url hasn't been passed. Pass url in constructor or using 'this.setUrl(url)'");
    }
  }
  setContainer(selector) {
    if (selector) {
      this.container = document.querySelector(selector);
    } else {
      console.error("[Constructor] Selector hasn't been passed. Pass selector in constructor or using 'this.setContainer(selector)'");
    }
  }

  fetchData(url) {
    if (url) {
      this.setUrl(url);
      this.init();
    }
    return getData(this.url).then(({ results }) => results);
  }

  setFilter(filter) {
    this.filter = filter;
  }

  filterData(dataList) {
    const { filter } = this;
    // console.log(dataList);
    switch (filter.order) {
      case "asc": dataList.sort((a, b) => {
        if (filter.category) {
          return a[filter.category][filter.field] > b[filter.category][filter.field] ? 1 : -1;
        } else {
          return a[filter.field] > b[filter.field] ? 1 : -1
        }
      });
      case "desc": dataList.sort((a, b) => {
        if (filter.category) {
          return a[filter.category][filter.field] > b[filter.category][filter.field] ? 1 : -1;
        } else {
          return a[filter.field] > b[filter.field] ? 1 : -1
        }
      });
      default: {
        return dataList;
      }
    }
  }

  render(usersList = this.usersList) {
    this.container.innerHTML = "";

    this.filterData(usersList).forEach(userData => {
      const user = new User(userData);
      if (this.modal) {
        user.renderForModal(this.container, this.modal);
      } else {
        user.render(this.container);
      }
    })
  }

  init() {
    this.fetchData().then(data => {
      this.usersList = data;
      this.render(data);
    });
  }

  setModal(modal) {
    this.modal = modal;
    return this;
  }
}
