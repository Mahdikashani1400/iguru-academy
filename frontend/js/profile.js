import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";

window.addEventListener("load", async () => {

  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  getFooter();

 
});

const $ = document;
let haveSubset = $.querySelector(".profile__menu .have-subset > a");

const openCloseMenuHandler = (e) => {
  if (window.innerWidth <= 976) {
    e.preventDefault();
    haveSubset.classList.toggle("open");
  }
};

haveSubset.addEventListener("click", openCloseMenuHandler);
