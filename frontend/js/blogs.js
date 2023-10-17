import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getArticles,
  getCategoryOfCourses,
  searchInData,
  showNotFoundAlert,
} from "./funcs/shared.js";

let articlesInfo = null;
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  showCategoryOfArticles();
  await getArticles().then((data) => {
    articlesInfo = data;
  });
  showArticles(articlesInfo, "همه");

  getFooter();
})();

const $ = document;
let blogsContainer = $.querySelector(".reading_blogs");
function showArticles(articlesData, category) {
  if (articlesData == 0) {
    showNotFoundAlert("show", blogsContainer);
  } else {
    showNotFoundAlert("hide", blogsContainer);
  }
  addArticlesToContainer(articlesData, category);
}
function addArticlesToContainer(articlesArray, category) {
  const articlesContainer = $.querySelector(".blogs__boxes");
  articlesContainer.innerHTML = `${articlesArray
    .map((article) => {
      if (category === article.shortName) {
        return `
    <div class="blog__box pb-3">
    <div class="blog__box-container mx-1">
      <div class="blog__box-date">
        <span class="date-month">تیر</span>
        <div class="h4 date-day fw-bold">20</div>
      </div>
      <div class="blog__box-img" style="background-image:url('http://localhost:4000/courses/covers/${article.cover}');"></div>
      <div class="blog__box__content">
        <div class="blog__box__tags pt-4 pb-2">
          <a
            href=""
            class="blog__box-category text-green fw-bold"
            >${article.shortName}</a
          ><span class="text-green px-1 fw-bold">/</span>
          <span class="fw-bold text-gray ps-2">توسط</span>
          <a href="" class="blog__box__author fw-bold text-gray"
            >علی سلیمانی</a
          >
        </div>
        <div class="blog__box-title h3 py-2">${article.title} </div>
        <div class="blog__box-text p pb-2">${article.description}
        </div>
        <a
          href=""
          class="under__line-animate text-orange fw-bold d-inline-block pt-2 pb-1"
          >ادامه مطلب</a
        >
      </div>
    </div>
  </div>
    `;
      } else if (category === "همه") {
        return `
    <div class="blog__box pb-3">
    <div class="blog__box-container mx-1">
      <div class="blog__box-date">
        <span class="date-month">تیر</span>
        <div class="h4 date-day fw-bold">20</div>
      </div>
      <div class="blog__box-img" style="background-image:url('http://localhost:4000/courses/covers/${article.cover}');"></div>
      <div class="blog__box__content">
        <div class="blog__box__tags pt-4 pb-2">
          <a
            href=""
            class="blog__box-category text-green fw-bold"
            >${article.shortName}</a
          ><span class="text-green px-1 fw-bold">/</span>
          <span class="fw-bold text-gray ps-2">توسط</span>
          <a href="" class="blog__box__author fw-bold text-gray"
            >علی سلیمانی</a
          >
        </div>
        <div class="blog__box-title h3 py-2">${article.title} </div>
        <div class="blog__box-text p pb-2">${article.description}
        </div>
        <a
          href=""
          class="under__line-animate text-orange fw-bold d-inline-block pt-2 pb-1"
          >ادامه مطلب</a
        >
      </div>
    </div>
  </div>
    `;
      }
    })
    .join("")}`;
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
                    </li>`;
  const categoryInfo = await getCategoryOfCourses().then((data) => data);
  categoryInfo.forEach((cat) => {
    if (cat.title === "article") {
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
      <li class="nav-item position-relative">
                      <a href="#" class="nav-link py-1 pe-3"
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
let categoryTargetText = "همه";
function changeCategoryOfArticles(e) {
  e.preventDefault();

  if (e.target.tagName === "SPAN") {
    categoryTarget = e.target.parentElement;
  } else {
    categoryTarget = e.target;
  }
  categoryTargetText = categoryTarget.innerText.split("(")[0].trim();
  showArticles(articlesInfo, categoryTargetText);
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
