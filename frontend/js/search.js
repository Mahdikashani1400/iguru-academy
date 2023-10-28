import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { aricleSliderSearch } from "../vendor/slick-slider/app.js";
import { getFooter } from "./footer.js";
const $ = document;

(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();

  getPoster(pageTitle, "blog_page-bg.jpg");
  aricleSliderSearch();
  getFooter();
})();
