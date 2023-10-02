import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;
getModals();
getHeader();
getTitlePage("سبد خرید ", "blog_page-bg.jpg");
getFooter();

let inputNumberContainers = $.querySelectorAll(".quantity__number-input");
let inputNumber = null;
function changeNumber(e) {
  inputNumber = this.querySelector("input");

  if (e.target.classList.contains("plus")) {
    inputNumber.stepUp();
  } else if (e.target.classList.contains("minus")) {
    inputNumber.stepDown();
  }
}
inputNumberContainers.forEach((elem) => {
  elem.addEventListener("click", changeNumber.bind(elem));
});
