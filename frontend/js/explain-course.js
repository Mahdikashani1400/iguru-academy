import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getCourses } from "../js/funcs/shared.js";
const $ = document;

let courseInfo = null;

getModals();
getHeader();
getPoster("آموزش زبان انگلیسی ! اصول بنیادی", "blog_page-bg.jpg");
getFooter();

(async function () {
  getModals();
  await getHeader();
  await getPoster(pageTitle, "course_page-bg.jpg");
  getFooter();
})();
