import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
window.addEventListener("load", async () => {
  await getModals();
  await getHeader();
  getPoster("", "read-blog.jpg");
  getFooter();
});
