import Cookies from "universal-cookie";

const jwt = require("jwt-decode");
declare let DOMAIN_URL: string;

export const setCookie = (key, value) => {
  const cookies = new Cookies();
  const expiryDateTime = new Date();
  expiryDateTime.setDate(expiryDateTime.getDate() + 1);
  cookies.set(key, value, {
    path: "/",
    expires: expiryDateTime,
    domain: DOMAIN_URL,
  });
};

export function getFromCookie(key) {
  const cookies = new Cookies();
  return cookies.get(key);
}

export function saveAccessCredentials(values) {
  setCookie("email", values.email);
  setCookie("name", values.first_name);
}

export function getAccessToken() {
  return getFromCookie("Access-Token");
}

export function getEmail() {
  return getFromCookie("email");
}

export function deleteToken() {
  const cookies = new Cookies();
  const obj = { path: "", domain: DOMAIN_URL };
  cookies.remove("token", obj);
  cookies.remove("email", obj);
  cookies.remove("Access-Token", obj);
  cookies.remove("name", obj);
}

export function getTokenValues() {
  const tokenDetails = getAccessToken() ? jwt(getAccessToken()) : {};
  return tokenDetails;
}

export function isPageAccessible(page) {
  const ap = getTokenValues().accessiblePages || [];
  return ap.indexOf(page) > -1;
}
