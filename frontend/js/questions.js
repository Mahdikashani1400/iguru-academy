import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "qs_page-bg.jpg");
  getFooter();
})();

$.querySelectorAll(".questions__collapse .collapse").forEach((qustion) => {
  qustion.addEventListener(
    "show.bs.collapse",
    collapseElemHandler.bind(qustion)
  );
  qustion.addEventListener(
    "hide.bs.collapse",
    collapseElemHandler.bind(qustion)
  );
});

function collapseElemHandler(e) {
  this.previousElementSibling.classList.toggle("active");
}
