import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { submitContactsMSG } from "../js/funcs/shared.js";

const $ = document;

(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "contacts_page-bg.jpg");
  getFooter();
})();

const submitBtn = $.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitContactsMSG();
});
