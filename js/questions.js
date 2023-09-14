import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;
getModals();
getHeader();
getTitlePage("سوالات متداول", "qs_page-bg.jpg");
getFooter();

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
  if (e.type === "show.bs.collapse") {
    this.previousElementSibling.classList.add("active");
  } else {
    this.previousElementSibling.classList.remove("active");
  }
}
