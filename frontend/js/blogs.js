import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getTitlePage } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getArticles } from "./funcs/shared.js";

getModals();
getHeader();
getTitlePage("وبلاگ لیست", "blog_page-bg.jpg");
getFooter();

const $ = document;
window.addEventListener("load", () => {
  showArticles();
});

async function showArticles() {
  const articlesContainer = $.querySelector(".blogs__boxes");
  articlesContainer.innerHTML = "";
  const articlesInfo = await getArticles().then((data) => data);
  articlesInfo.forEach((article) => {
    articlesContainer.insertAdjacentHTML(
      "beforeend",
      `
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
            `
    );
  });
}
