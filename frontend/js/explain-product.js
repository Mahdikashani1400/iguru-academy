import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getCourseDetails, getRelatedCourses } from "../js/funcs/shared.js";
import { productCoverSlider } from "../vendor/slick-slider/app.js";
const $ = document;
let productInfo = null;
let relatedProducts = null;
let productName = new URLSearchParams(location.search).get("name");
console.log(productName);
(async function () {
  getModals();
  await getHeader();
  await getCourseDetails(productName).then((data) => {
    productInfo = data;
  });

  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");

  showProductDetails();
  setTimeout(() => {
    productCoverSlider();
    selectionImg();
  }, 50);

  await getRelatedCourses(productName).then((data) => {
    relatedProducts = data;
    console.log(relatedProducts);
  });

  showRelatedproducts();
  getFooter();
})();

function showProductDetails() {
  const title = $.querySelector(".product-title");
  const price = $.querySelector(".product-price");
  const category = $.querySelector(".product-category");
  const imagesContainer = $.querySelector(".main-img");
  title.innerHTML = productInfo.name;
  price.innerHTML = productInfo.price
    ? Number(productInfo.price).toLocaleString("fa-IR") + " تومان"
    : "رایگان";
  category.innerHTML = productInfo.categoryID.name;
  imagesContainer.innerHTML = `
    <img
    class=""
    src="http://localhost:4000/courses/covers/${productInfo.cover}"
    alt=""
  />
    <img
    class=""
    src="http://localhost:4000/courses/covers/${productInfo.cover}"
    alt=""
  />
    `;
}

function selectionImg() {
  let imgContainers = $.querySelectorAll(
    ".product__images__content .slick-dots li"
  );
  imgContainers.forEach((imgLi) => {
    imgLi.innerHTML = `
    <img
    class=""
    src="http://localhost:4000/courses/covers/${productInfo.cover}"
    alt=""
  />
    `;
  });
}
const relatedProductsContainer = $.querySelector(".same__products__boxes");
function showRelatedproducts() {
  relatedProductsContainer.innerHTML = "";
  if (relatedProducts.length) {
    relatedProductsContainer.innerHTML = `
    ${relatedProducts
      .map((product) => {
        return `
        <div class="same__product__box d-flex flex-column justify-content-center align-items-center pb-5 pb-lg-0 mb-4"
        onclick = "goToProductDetail('${product.shortName}')">
        <div class="same__product__content">
          <div class="same__product__box-img rounded rounded-3 px-3 px-lg-0 py-lg-3">
            <div class="p same__product__box-add-basket fw-bold d-flex bg-green p-3 text-white rounded-top position-absolute">
              افزودن به سبد خرید
            </div>
            <img class="rounded mx-auto d-block" src="http://localhost:4000/courses/covers/${
              product.cover
            }" alt="">
          </div>
          <div class="same__product__box-title h6 pt-4 fw-bold text-center">
          ${product.name}
          </div>
          <div class="same__product__box-price p fw-bold text-orange fs-6 text-center">
          ${
            product.price
              ? Number(product.price).toLocaleString("fa-IR") + " تومان"
              : "رایگان"
          }
          </div>
        </div>
      </div>
      `;
      })
      .join("")}`;
  }
}
