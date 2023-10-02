import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
const $ = document;
getModals();
getHeader();
getTitlePage("درباره ما", "about-us_page-bg.jpg");
getFooter();
