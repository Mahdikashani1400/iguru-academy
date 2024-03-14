import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { removeLoader } from "./funcs/shared.js";
window.addEventListener("load", async () => {
  const loader = $.querySelector('.loader_container')

  await getModals();
  await getHeader().then(res=>{
    removeLoader(loader)
  });
  getPoster("", "read-blog.jpg");
  getFooter();
});
