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

// fetch("http://localhost:4000/v1/users", {
//   method: "GET",
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTY5NjQxNDAxOCwiZXhwIjoxNjk5MDA2MDE4fQ.drfQP3071Hjg2nCZiq93NhyQ4WW8yK2Lb2mlPVGbwZ4",
//   },
// })
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

window.changeStateForm = changeStateForm;
function changeStateForm(e) {
  let state =
    (e.target.classList.contains("toggle__btn-arrive") && "arrive") ||
    "register";
  reviewformInputs(state);
}
