import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import {
  globalSearchHandler,
  goToCourseDetail,
  goToProductDetail,
  getCategoryOfCourses,
  changePriceNumberToFa,
  calculateDiscount
} from "../js/funcs/shared.js";
import { aricleSliderSearch } from "../vendor/slick-slider/app.js";
import { getFooter } from "./footer.js";

window.goToCourseDetail = goToCourseDetail;
window.goToProductDetail = goToProductDetail;
const $ = document;
let searchValue = new URLSearchParams(location.search).get("searchValue");
let searchValueInfos = null;
let categoryInfos = null;
window.addEventListener("load", async () => {

  getModals();
  await getHeader();
  let pageTitle = getPageTitle();

  getPoster(pageTitle, "blog_page-bg.jpg");
  await globalSearchHandler(searchValue).then((data) => {
    searchValueInfos = data;
  });
  await getCategoryOfCourses().then((data) => {
    categoryInfos = data;
  });

  getSearchValueData();
  showSearchValueData();
  aricleSliderSearch();
  getFooter();


});

let coursesInfoArray = [];
let productsInfoArray = [];
let articlesInfoArray = [];

function getSearchValueData() {
  console.log(searchValueInfos.allResultCourses);
  console.log(categoryInfos);
  searchValueInfos.allResultCourses.forEach((data) => {
    for (let i = 0; i < categoryInfos.length; i++) {
      if (data.categoryID == categoryInfos[i]._id && categoryInfos[i].title === "course") {
        coursesInfoArray.push(data)
        break
      } else if (data.categoryID == categoryInfos[i]._id && categoryInfos[i].title === "product") {
        console.log('t');
        productsInfoArray.push(data)
        break

      }

    }

  });

  articlesInfoArray = searchValueInfos.allResultArticles;
  // coursesInfoArray = new Set()
}

let coursesContainer = $.querySelector(".search__courses");
let productsContainer = $.querySelector(".search__products");
let articlesContainer = $.querySelector(".search__blogs");
let searchTitle = $.querySelector(".search__title");

function showSearchValueData() {
  searchTitle.innerHTML = `
  نتیجه جستجو برای : ${searchValue || "..."}
`;
  articlesInfoArray.length
    ? (articlesContainer.innerHTML = `
    <div class="search__title-courses h2 text-normal pb-3 pt-5">
    مقالات مرتبط
  </div>
  <div class="blogs__boxes text-end">
   ${articlesInfoArray
        .map((article) => {
          return ` <div class="blog__box">
    <div class="blog__box-container mx-1">
      <div class="blog__box-date">
        <span class="date-month">تیر</span>
        <div class="h4 date-day">20</div>
      </div>
      <div class="blog__box-img" style="background-image:url('http://localhost:4000/courses/covers/${article.cover}');"></div>
      <div class="blog__box__content">
        <div class="blog__box__tags pt-4 pb-2">
          <a href="" class="blog__box-category text-green fw-bold"
            >${article.shortName}</a
          ><span class="text-green px-1 fw-bold">/</span>
          <span class="fw-bold text-gray ps-2">توسط</span>
          <a href="" class="blog__box__author fw-bold text-gray"
            >علی سلیمانی</a
          >
        </div>
        <div class="blog__box-title h5 fw-bold">
        ${article.title}
        </div>
        <a
          href=""
          class="under__line-animate text-orange fw-bold d-inline-block pt-2 pb-1"
          >ادامه مطلب</a
        >
      </div>
    </div>
  </div>`;
        })
        .join("")}
  </div>
  `)
    : (articlesContainer.innerHTML = "");
  coursesInfoArray.length
    ? (coursesContainer.innerHTML = `
        
    <div class="search__title-course h2 text-normal py-5">
    دوره های مرتبط
  </div>
  <div class="about__us_courses-boxes row gx-5 gy-5 mx-auto">
   ${coursesInfoArray
        .map((course) => {
          return `
    <div
    class="course__box col-xl-3 col-lg-4 col-md-6 col-12 rounded">
    <div
      class="course__box-container d-flex flex-column justify-content-end text-white h-100"
      onclick="goToCourseDetail('${course.shortName}')"
    >
      <div
        class="course__box-bg-img position-absolute bg-img"
        style="background-image:url('http://localhost:4000/courses/covers/${course.cover
            }');"
      ></div>
    
      <div class="course__box-content">
        <div
          class="course__box-description pb-3 d-flex flex-column pe-4 ps-2 align-items-start"
        >
          <div class="course__box-img">
            <img
              src="./img/poster.jpg"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="course__box-teacher h6 mt-2">علی رحیمی</div>
          <div class="course__box-title h5 fw-bold text-end mt-1">
          ${course.name} 
          </div>
        </div>
        <div
          class="course__box-state d-flex justify-content-between p-3 flex-wrap"
        >
        <a class="position-relative d-flex flex-column gap-1 course__box-price span order-1 bg-green py-1 px-2 rounded fw-bold text-white" href="#">
        ${course.discount && course.price ? `<span class="discount d-flex justify-content-center align-items-center bg-orange rounded-circle position-absolute ">${course.discount}%</span>` : ""}

       <span class="${course.discount && course.price ? "main__price" : ""}"> ${changePriceNumberToFa(course.price)
            }</span>
 ${course.discount && course.price ? `
 <span class="off__price px-1">
 ${changePriceNumberToFa(calculateDiscount(course.price, course.discount))}
 </span>`: ""}
        </a>
          <div
            class="course__box-star d-flex align-items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>`;
        })
        .join("")}
  </div>

        `)
    : (coursesContainer.innerHTML = "");
  productsInfoArray.length
    ? (productsContainer.innerHTML = `
    <div class="search__title-products h2 text-normal pb-3">
    محصولات مرتبط
  </div>
  <div
  class="products__boxes text-end row justify-content-start row-cols-lg-3 row-cols-sm-2 g-5 g-sm-4 pb-4 w-100 mx-auto"
>
${productsInfoArray
        .map((product) => {
          return `
    <div
    class="products__box d-flex flex-column justify-content-center align-items-center my-5"
    onclick = "goToProductDetail('${product.shortName}')">
    <div
      class="products__box-img rounded rounded-3 px-3 px-lg-0 py-lg-3"
    >
      <div
        class="p products__box-add-basket fw-bold d-flex bg-green py-3 px-4 text-white rounded-top position-absolute"
      >
        افزودن به سبد خرید
      </div>
      <img
        class="rounded mx-auto d-block"
        src="http://localhost:4000/courses/covers/${product.cover}"
        alt=""
      />
    </div>
    <div class="products__box-title h6 pt-4 fw-bold">
    ${product.name}
    </div>
    <div class="products__box-price p fw-bold text-orange fs-6">
    ${changePriceNumberToFa(product.price)}
    </div>
  </div>

    `;
        })
        .join("")}
</div>
    `)
    : (productsContainer.innerHTML = "");
}
