import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { removeLoader } from "./funcs/shared.js";
const $ = document;

window.addEventListener('load', async () => {

  const loader = $.querySelector('.loader_container')
  await getModals();
  await getHeader().then(res => {
    removeLoader(loader)
  });
  let pageTitle = getPageTitle();

  getPoster(pageTitle, "blog_page-bg.jpg");

  getFooter();


})