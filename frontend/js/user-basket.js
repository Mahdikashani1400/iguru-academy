import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;

(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  getFooter();
})();

let inputNumberContainers = $.querySelectorAll(".quantity__number-input");
let inputNumber = null;
function changeInputNumber(e) {
  inputNumber = this.querySelector("input");

  if (e.target.classList.contains("plus")) {
    inputNumber.stepUp();
  } else if (e.target.classList.contains("minus")) {
    inputNumber.stepDown();
  }
}
inputNumberContainers.forEach((elem) => {
  elem.querySelector("input").addEventListener("keydown", (e) => {
    e.preventDefault();
  });
  elem.addEventListener("click", changeInputNumber.bind(elem));
});
