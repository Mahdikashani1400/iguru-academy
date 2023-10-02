import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
getModals();
getHeader();
getTitlePage("مشخصات", "blog_page-bg.jpg");
getFooter();
const $ = document;
let haveSubset = $.querySelector(".profile__menu .have-subset > a");

const openCloseMenuHandler = (e) => {
  if (window.innerWidth <= 976) {
    e.preventDefault();
    haveSubset.classList.toggle("open");
  }
};

haveSubset.addEventListener("click", openCloseMenuHandler);
