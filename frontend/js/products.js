import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getCourses,
  getCategoryOfCourses,
  searchInData,
  showNotFoundAlert,
  goToProductDetail,
} from "./funcs/shared.js";

window.goToProductDetail = goToProductDetail;
window.changeCategoryOfProducts = changeCategoryOfProducts;
window.seacrhInputHandler = seacrhInputHandler;

let productsInfo = null;
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  showCategoryOfProducts();
  await getCourses().then((data) => {
    productsInfo = data;
  });
  showProducts(productsInfo, "همه");

  getFooter();
})();
const $ = document;

let productsContent = $.querySelector(".products__content");

function showProducts(productsData, category) {
  if (productsData == 0) {
    showNotFoundAlert("show", productsContent);
  } else {
    showNotFoundAlert("hide", productsContent);
  }
  addProductsToContainer(productsData, category);
}

const productsContainer = $.querySelector(".products__boxes");
let productTarget = null;
function addProductsToContainer(productsArray, category) {
  productsContainer.innerHTML = `
    ${productsArray
      .map((product) => {
        if (
          product.shortName.split("_")[0].includes("محصول") &&
          category === product.categoryID.name
        ) {
          productTarget = product;
        } else if (
          product.shortName.split("_")[0].includes("محصول") &&
          category === "همه"
        ) {
          productTarget = product;
        } else {
          return "";
        }
        return `
        
        <div class="products__box d-flex flex-column justify-content-center align-items-center my-5"
        onclick = "goToProductDetail('${productTarget.shortName}')">
                    <div class="products__box-img rounded rounded-3 px-3 px-lg-0 py-lg-3">
                      <div class="p products__box-add-basket fw-bold d-flex bg-green p-3 text-white rounded-top position-absolute">
                        افزودن به سبد خرید
                      </div>
                      <img class="rounded mx-auto d-block" src="http://localhost:4000/courses/covers/${
                        productTarget.cover
                      }" alt="">
                    </div>
                    <div class="products__box-title h6 pt-4 fw-bold">${
                      productTarget.name
                    }</div>
                    <div class="products__box-price p fw-bold text-orange fs-6">
                      ${
                        productTarget.price
                          ? Number(productTarget.price).toLocaleString(
                              "fa-IR"
                            ) + " تومان"
                          : "رایگان"
                      }
                    </div>
                  </div>`;
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

let categoryTarget = null;
let categoryTargetText = "همه";
function changeCategoryOfProducts(e) {
  e.preventDefault();

  if (e.target.tagName === "SPAN") {
    categoryTarget = e.target.parentElement;
  } else {
    categoryTarget = e.target;
  }
  categoryTargetText = categoryTarget.innerText.split("(")[0].trim();

  showProducts(productsInfo, categoryTargetText);
  changeActivityCategoryBox(categoryTarget.parentElement);
}

let activeCategory = null;

function changeActivityCategoryBox(elem) {
  activeCategory = categoryContainer.querySelector(".nav-item.active");
  activeCategory.classList.remove("active");
  elem.classList.add("active");
}

let searchInput = $.getElementById("searchProducts");
function seacrhInputHandler(e) {
  searchInData(
    productsInfo,
    "shortName",
    searchInput.value,
    showProducts,
    changeActivityCategoryBox
  );
}

let sortFilter = $.getElementById("sortFilter");
sortFilter.addEventListener("change", sortedProductByUser);
async function sortedProductByUser(e) {
  let value = e.target.value;
  let outPutArray = [];

  switch (value) {
    case "default": {
      outPutArray = productsInfo;
      break;
    }
    case "last": {
      outPutArray = productsInfo;
      break;
    }
    case "first": {
      console.log(productsInfo);
      outPutArray = [...productsInfo].reverse();
      break;
    }
    // case "score" : {
    //   outPutArray =productsInfo.filter(product=>{

    //   })
    //   break
    // }
  }
  showProducts(outPutArray, categoryTargetText);
}
