import { getData } from "../../utils/getData";
import { User } from "./User";

import { matchSearch } from "./utils/filter";

export class UsersList {
  usersList = []
  filter = {
    category: "name",
    field: "first",
    order: "desc",
    search: ""
  };

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

  setFilter(data) {
    this.filter = { ...this.filter, ...data }
    localStorage.setItem("Filter", JSON.stringify(this.filter));
    this.render(matchSearch(this.usersList, this.filter.search));
  }

  sortData(dataList) {
    const { order, category, field } = this.filter;
    switch (order) {
      case "asc": return dataList.sort((a, b) => {
        if (category) {
          return a[category][field] > b[category][field] ? 1 : -1;
        } else {
          return a[field] > b[field] ? 1 : -1
        };
      });
      case "desc": return dataList.sort((a, b) => {
        if (category) {
          return a[category][field] > b[category][field] ? -1 : 1;
        } else {
          return a[field] > b[field] ? -1 : 1
        }
      });
      default: {
        return dataList;
      }
    }
  }

  render(usersList = this.usersList) {
    this.container.innerHTML = "";

    this.sortData(usersList).forEach(userData => {
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
    return this;
  }

  setModal(modal) {
    this.modal = modal;
    return this;
  }
}
