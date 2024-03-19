import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getArticles,
  getCategoryOfCourses,
  mainHost,
  removeLoader,
  searchInData,
  showNotFoundAlert,
} from "./funcs/shared.js";

let articlesInfo = null;
window.addEventListener("load", async () => {

  const loader = $.querySelector('.loader_container')
  await getModals();
  await getHeader().then(res => {

  });
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  showCategoryOfArticles();
  await getArticles().then((data) => {
    articlesInfo = data;
    removeLoader(loader)
  });
  showArticles(articlesInfo, "");

  getFooter();


});

const $ = document;
let blogsContainer = $.querySelector(".reading_blogs");
function showArticles(articlesData, categoryID) {
  if (articlesData == 0) {
    showNotFoundAlert("show", blogsContainer);
  } else {
    showNotFoundAlert("hide", blogsContainer);
  }
  addArticlesToContainer(articlesData, categoryID);
}
function addArticlesToContainer(articlesArray, categoryID) {
  const articlesContainer = $.querySelector(".blogs__boxes");
  articlesContainer.innerHTML = `${articlesArray
    .map((article) => {
      if (categoryID === article.categoryID) {
        return `
    <div class="blog__box pb-3">
    <div class="blog__box-container mx-1">
      <div class="blog__box-date">
        <span class="date-month">تیر</span>
        <div class="h4 date-day fw-bold">20</div>
      </div>
      <div class="blog__box-img" style="background-image:url('${mainHost}/courses/covers/${article.cover}');"></div>
      <div class="blog__box__content">
        <div class="blog__box__tags pt-4 pb-2">
          <a
            href="javascript:void(0)"
            class="blog__box-category text-green fw-bold"
            >${article.title}</a
          ><span class="text-green px-1 fw-bold">/</span>
          <span class="fw-bold text-gray ps-2">توسط</span>
          <a href="javascript:void(0)" class="blog__box__author fw-bold text-gray"
            >علی سلیمانی</a
          >
        </div>
        <div class="blog__box-title h3 py-2">${article.title} </div>
        <div class="blog__box-text p pb-2">${article.description}
        </div>
        <a
          href="javascript:void(0)"
          class="under__line-animate text-orange fw-bold d-inline-block pt-2 pb-1"
          >ادامه مطلب</a
        >
      </div>
    </div>
  </div>
    `;
      }
      else if (categoryID === "".trim()) {
        return `
        <div class="blog__box pb-3">
        <div class="blog__box-container mx-1">
          <div class="blog__box-date">
            <span class="date-month">تیر</span>
            <div class="h4 date-day fw-bold">20</div>
          </div>
          <div class="blog__box-img" style="background-image:url('${mainHost}/courses/covers/${article.cover}');"></div>
          <div class="blog__box__content">
            <div class="blog__box__tags pt-4 pb-2">
              <a
                href="javascript:void(0)"
                class="blog__box-category text-green fw-bold"
                >${article.shortName}</a
              ><span class="text-green px-1 fw-bold">/</span>
              <span class="fw-bold text-gray ps-2">توسط</span>
              <a href="javascript:void(0)" class="blog__box__author fw-bold text-gray"
                >علی سلیمانی</a
              >
            </div>
            <div class="blog__box-title h3 py-2">${article.title} </div>
            <div class="blog__box-text p pb-2">${article.description}
            </div>
            <a
              href="javascript:void(0)"
              class="under__line-animate text-orange fw-bold d-inline-block pt-2 pb-1"
              >ادامه مطلب</a
            >
          </div>
        </div>
      </div>
        `;
      }
    })
    .join("")
    } `;
  if (!articlesContainer.innerHTML.trim()) {
    articlesContainer.innerHTML = `
      <div class="empty__comments d-flex p justify-content-center align-items-center py-4 py-sm-5 w-100 mx-auto text-white rounded-3 fs-5">مقاله ای در این دسته وجود ندارد !</div>`
  }
}

const categoryContainer = $.querySelector(".reading__category-items");

async function showCategoryOfArticles() {
  categoryContainer.innerHTML = `
  <li class="nav-item position-relative active all">
    <a href="#"
      class="nav-link py-1 pe-3"
      onclick="changeCategoryOfArticles(event)"
    >همه
      <span class="text-gray fs-6 fw-bold">(11)</span></a>
                    </li> `;
  const categoryInfo = await getCategoryOfCourses().then((data) => data);
  categoryInfo.forEach((cat) => {
    if (cat.title === "article") {
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
  <li class="nav-item position-relative">
    <a href="#" class="nav-link py-1 pe-3"
      id="${cat._id}"
      onclick="changeCategoryOfArticles(event)"
    >${cat.name}
      <span class="text-gray fs-6 fw-bold">(11)</span></a>
                    </li>
  `
      );
    }
  });
}

window.changeCategoryOfArticles = changeCategoryOfArticles;

let categoryTarget = null;
let categoryID = "";
function changeCategoryOfArticles(e) {
  e.preventDefault();


  categoryTarget = e.currentTarget;

  categoryID = e.currentTarget.id;
  showArticles(articlesInfo, categoryID);
  changeActivityCategoryBox(categoryTarget.parentElement);
}

let activeCategory = null;

function changeActivityCategoryBox(elem) {
  activeCategory = categoryContainer.querySelector(".nav-item.active");
  activeCategory.classList.remove("active");
  elem.classList.add("active");
}

window.seacrhInputHandler = seacrhInputHandler;
let searchInput = $.getElementById("searchArticle");
function seacrhInputHandler() {
  searchInData(
    articlesInfo,
    "title",
    searchInput.value,
    showArticles,
    changeActivityCategoryBox
  );
}
