import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
getModals();
getHeader();
getTitlePage("زندگی مخفی", "blog_page-bg.jpg");
getFooter();
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
