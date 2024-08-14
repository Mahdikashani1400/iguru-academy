import { register, login, reviewformInputs } from "./funcs/auth.js";
import { removeLoader } from "./funcs/shared.js";
const $ = document;
window.addEventListener("load", () => {
  reviewformInputs("login");

});
const loader = $.querySelector('.loader_container')
window.addEventListener('DOMContentLoaded', () => {


  removeLoader(loader)
})
window.register = register;
window.login = login;


window.changeStateForm = changeStateForm;
function changeStateForm(e) {
  let state =
    (e.target.classList.contains("toggle__btn-arrive") && "arrive") ||
    "register";
  reviewformInputs(state);
}
