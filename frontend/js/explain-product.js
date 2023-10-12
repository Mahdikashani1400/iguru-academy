import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";

(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  getFooter();
})();

const $ = document;
function selectionImg() {
  let imgContainers = $.querySelectorAll(
    ".product__images__content .slick-dots li"
  );
  imgContainers.forEach((imgLi) => {
    imgLi.innerHTML = `
    <img
    class=""
    src="./img/products/product-1-big.png"
    alt=""
  />
    `;
  });
}
selectionImg();
