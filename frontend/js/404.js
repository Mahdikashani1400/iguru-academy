import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;

window.addEventListener('load', async () => {

  await getModals();
  await getHeader();
  let pageTitle = getPageTitle();

  getPoster(pageTitle, "blog_page-bg.jpg");

  getFooter();


})