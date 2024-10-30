import Cookies from "universal-cookie";
const cookies = new Cookies();
export const Cookie = {
  set: function (key, value) {
    cookies.set(key, value);
  },
  get: function (key) {
    return cookies.get(key);
  },
  remove: function (key) {
    cookies.remove(key);
  },
};
