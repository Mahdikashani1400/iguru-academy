import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { removeLoader, submitContactsMSG } from "../js/funcs/shared.js";

const $ = document;

window.addEventListener("load", async () => {
  const loader = $.querySelector('.loader_container')
  await getModals();
  await getHeader().then(res => {
    removeLoader(loader)
  });
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "contacts_page-bg.jpg");
  getFooter();
});

const submitBtn = $.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitContactsMSG();
});
