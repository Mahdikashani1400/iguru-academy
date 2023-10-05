import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getCourses } from "../js/funcs/shared.js";
getModals();
getHeader();
getTitlePage("لیست دوره ها", "course_page-bg.jpg");
getFooter();

getCourses().then((data) => {
  console.log(data);
});
