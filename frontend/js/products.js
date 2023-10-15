import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getCourses,
  getCategoryOfCourses,
  searchInData,
} from "./funcs/shared.js";
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  showCategoryOfProducts();
  showProducts(getCourses(), "همه");

  getFooter();
})();
const $ = document;

const productsContainer = $.querySelector(".products__boxes");
function showProducts(productsData, category) {
  if (productsData[0]) {
    addProductsToContainer(productsData, category);
  } else {
    productsData.then((data) => {
      addProductsToContainer(data, category);
    });
  }
}
function addProductsToContainer(productsArray, category) {
  productsContainer.innerHTML = `
    ${productsArray
      .map((product) => {
        if (
          product.name === "product" &&
          category === product.categoryID.name
        ) {
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
        } else if (product.name === "product" && category === "همه") {
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
}
const categoryContainer = $.querySelector(".products__category-items");

async function showCategoryOfProducts() {
  categoryContainer.innerHTML = `
  <li class="nav-item position-relative active">
                      <a href="#" 
                      class="nav-link py-1 pe-3"
  onclick="changeCategoryOfProducts(event)"
  >همه
                        <span class="text-gray fs-6 fw-bold">(11)</span></a>
                    </li>`;
  const categoryInfo = await getCategoryOfCourses().then((data) => data);
  categoryInfo.forEach((cat) => {
    if (cat.title === "product") {
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
      <li class="nav-item position-relative">
                      <a href="#" class="nav-link py-1 pe-3"
  onclick="changeCategoryOfProducts(event)"
  >${cat.name}
                        <span class="text-gray fs-6 fw-bold">(11)</span></a>
                    </li>
      `
      );
    }
  });
}

window.changeCategoryOfProducts = changeCategoryOfProducts;

let categoryTarget = null;
let categoryTargetText = null;
function changeCategoryOfProducts(e) {
  e.preventDefault();

  if (e.target.tagName === "SPAN") {
    categoryTarget = e.target.parentElement;
  } else {
    categoryTarget = e.target;
  }
  categoryTargetText = categoryTarget.innerText.split("(")[0].trim();

  showProducts(getCourses(), categoryTargetText);
  changeActivityCategoryBox(categoryTarget.parentElement);
}

let activeCategory = null;

function changeActivityCategoryBox(elem) {
  activeCategory = categoryContainer.querySelector(".nav-item.active");
  activeCategory.classList.remove("active");
  elem.classList.add("active");
}

window.seacrhInputHandler = seacrhInputHandler;
function seacrhInputHandler(e) {
  getCourses().then((data) => {
    searchInData(
      data,
      "shortName",
      e.target.value,
      showProducts,
      changeActivityCategoryBox
    );
  });
}
