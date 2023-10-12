import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;

(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "about-us_page-bg.jpg");
  getFooter();
})();
