import { ADMIN, MERCHANT, SERVICE, GUEST } from "./constant.js";

export function siblings(elem) {
  const nodes = [];
  let prev = elem.previousSibling;
  while (prev) {
    if (prev.nodeType === 1) {
      nodes.push(prev);
    }
    prev = prev.previousSibling;
  }
  nodes.reverse();
  let next = elem.nextSibling;
  while (next) {
    if (next.nodeType === 1) {
      nodes.push(next);
    }
    next = next.nextSibling;
  }
  return nodes;
}

export function setLocalStorageRole(role) {
  return localStorage.setItem("roleName", role);
}


export function getLocalStorageRole() {
  return localStorage.getItem("roleName");
}

const authorityMap = {
  admin: ADMIN,
  merchant: MERCHANT,
  service: SERVICE,
  guest: GUEST,
};

export function routesAuthority(route, NotFound, authority = []) {
  if (getLocalStorageRole()) {
    if (!authority || authority.length === 0) {
      return route;
    }
    let router = null;
    for (let i = 0; i < authority.length; i += 1) {
      if (authorityMap[getLocalStorageRole()] === authority[i]) {
        router = route;
      }
      if (authorityMap[getLocalStorageRole()] !== authority[i]) {
        router = NotFound;
      }
    }
    return router;
  }
  return route;
}


export function getPortfolioCode() {
  const arr = window.location.href.split("/");
  return arr[arr.length - 1];
}


export function getMenuCode() {
  const arr = window.location.href.split("/");
  return arr[3];
}


export function fuzzyQuery(list, keyWord) {
  const arr = [];
  for (let i = 0; i < list.length; i+=1) {
    if (list[i].indexOf(keyWord.split(" ").splice(0,1)) >= 0) {
      arr.push(list[i]);
    }
  }
  return arr;
}

