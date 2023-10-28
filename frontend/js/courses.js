import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getCourses,
  getCategoryOfCourses,
  searchInData,
  showNotFoundAlert,
  goToCourseDetail,
} from "../js/funcs/shared.js";
let coursesInfo = null;
(async function () {
  getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "course_page-bg.jpg");
  showCategoryOfCourses();
  await getCourses().then((data) => {
    coursesInfo = data;
  });

  showCourses(coursesInfo, "همه");
  getFooter();
})();

const $ = document;

let coursesContainer = $.querySelector(".learning_courses");
let courseTarget = null;

function showCourses(coursesData, category) {
  if (coursesData == 0) {
    showNotFoundAlert("show", coursesContainer);
  } else {
    showNotFoundAlert("hide", coursesContainer);
  }
  addCoursesToContainer(coursesData, category);
}
function addCoursesToContainer(coursesArray, category) {
  const coursesContainer = $.querySelector(".learning_courses-boxes");

  coursesContainer.innerHTML = `
  ${coursesArray
    .map((course) => {
      if (course.name !== "product" && category === course.categoryID.name) {
        courseTarget = course;
      } else if (course.name !== "product" && category === "همه") {
        courseTarget = course;
      } else {
        return "";
      }
      return `
       
      <div class="course__box rounded">
      <div
        class="course__box-container d-flex flex-column justify-content-end text-white h-100"
        onclick = "goToCourseDetail('${courseTarget.shortName}')"
      >
        <div class="course__box-bg-img position-absolute bg-img" style="background-image:url('http://localhost:4000/courses/covers/${
          courseTarget.cover
        }');">
          
        </div>
        <a
          class="course__box-category fw-bold rounded px-3 py-2 bg-orange text-white"
          href="#"
          >${courseTarget.categoryID.name}</a
        >
        <div class="course__box-content">
          <div
            class="course__box-description pb-3 d-flex flex-column pe-5 ps-2 align-items-start"
          >
            <div class="course__box-img">
              <img
                src="./img/poster.jpg"
                alt="courseTarget"
                class="img-fluid"
              />
            </div>
            <div class="course__box-teacher h6 mt-2">
              علی رحیمی
            </div>
            <div
              class="course__box-title h2 fw-bold text-end mt-1"
            >${courseTarget.name}  </div>
          </div>
          <div
            class="course__box-state d-flex justify-content-between p-3 pe-sm-4 flex-wrap"
          >
            <a
              class="course__box-price span order-1 bg-green py-1 px-3 rounded fw-bold text-white"
              href="#"
            >
              ${
                courseTarget.price
                  ? Number(courseTarget.price).toLocaleString("fa-IR") +
                    " تومان"
                  : "رایگان"
              }
            </a>
            <div
              class="course__box-star d-flex align-items-center gap-1"
            >
            
         ${
           Array(courseTarget.courseAverageScore)
             .fill(0)
             .map(
               (
                 score
               ) => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
         <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
       </svg>`
             )
             .join(" ") +
           Array(5 - courseTarget.courseAverageScore)
             .fill(0)
             .map(
               (
                 score
               ) => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
               <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
             </svg>`
             )
             .join(" ")
         }
            </div>
          </div>
        </div>
      </div>
    </div>
    
   `;
    })
    .join("")}  
  `;
}
const categoryContainer = $.querySelector(".learning__tags-container");

async function showCategoryOfCourses() {
  categoryContainer.innerHTML = `
  <div class="learning__tag-box p-2 bg-gray rounded rounded-3 active all"
  onclick="changeCategoryOfCourses(event)"
                >
                  همه
                </div>`;
  const categoryInfo = await getCategoryOfCourses().then((data) => data);
  categoryInfo.forEach((cat) => {
    if (cat.title === "course") {
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div class="learning__tag-box p-2 bg-gray rounded rounded-3"
      onclick="changeCategoryOfCourses(event)"
                    >
                      ${cat.name}
                    </div>`
      );
    }
  });
}
window.changeCategoryOfCourses = changeCategoryOfCourses;
function changeCategoryOfCourses(e) {
  showCourses(coursesInfo, e.target.innerText);
  changeActivityCategoryBox(e.target);
}
let activeCategory = null;

function changeActivityCategoryBox(elem) {
  activeCategory = categoryContainer.querySelector(".learning__tag-box.active");
  activeCategory.classList.remove("active");
  elem.classList.add("active");
}

window.seacrhInputHandler = seacrhInputHandler;
let searchInput = $.getElementById("searchCourses");
function seacrhInputHandler(e) {
  console.log(searchInput.value);
  searchInData(
    coursesInfo,
    "name",
    searchInput.value,
    showCourses,
    changeActivityCategoryBox
  );
}

window.goToCourseDetail = goToCourseDetail;
