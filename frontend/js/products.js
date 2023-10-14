import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getCourses } from "./funcs/shared.js";
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  getFooter();
})();
const $ = document;
window.addEventListener("load", () => {
  getProducts();
});
const productsContainer = $.querySelector(".products__boxes");
function getProducts() {
  getCourses().then((data) => {
    productsContainer.innerHTML = `
    ${data
      .map((product) => {
        if (product.name === "product") {
          return `
        
        <div class="products__box d-flex flex-column justify-content-center align-items-center my-5">
                    <div class="products__box-img rounded rounded-3 px-3 px-lg-0 py-lg-3">
                      <div class="p products__box-add-basket fw-bold d-flex bg-green p-3 text-white rounded-top position-absolute">
                        افزودن به سبد خرید
                      </div>
                      <img class="rounded mx-auto d-block" src="http://localhost:4000/courses/covers/${product.cover}" alt="">
                    </div>
                    <div class="products__box-title h6 pt-4 fw-bold">${product.shortName}</div>
                    <div class="products__box-price p fw-bold text-orange fs-6">
                      ${product.price} تومان
                    </div>
                  </div>`;
        }
      })
      .join("")}
    `;
  });
}
