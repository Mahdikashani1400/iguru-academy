import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
getModals();
getHeader();
getPoster("", "read-blog.jpg");
getFooter();

// (async function () {
//     getModals();
//     await getHeader();
//     let pageTitle = getPageTitle();
//     getPoster(pageTitle, "read-blog.jpg");
//     getFooter();
//   })();
