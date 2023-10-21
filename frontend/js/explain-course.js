import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  getCourseDetails,
  getRelatedCourses,
  goToCourseDetail,
} from "../js/funcs/shared.js";
const $ = document;

let courseInfo = null;
let relatedCourses = null;
let courseName = new URLSearchParams(location.search).get("name");

(async function () {
  getModals();
  await getHeader();
  await getCourseDetails(courseName).then((data) => {
    courseInfo = data;
  });
  getPoster(courseName, "course_page-bg.jpg");
  showCourseSessions();
  showCourseDetails();
  await getRelatedCourses(courseName).then((data) => {
    relatedCourses = data;
  });
  showRelatedCourses();
  getFooter();
})();

function showCourseDetails() {
  const title = $.querySelector(".course__title");
  title.innerHTML = courseInfo.shortName;
  const price = $.querySelector(".price-number");
  price.innerHTML = courseInfo.price
    ? Number(courseInfo.price).toLocaleString("fa-IR") + " تومان"
    : "رایگان";

  const category = $.querySelector(".course__category");
  category.innerHTML = courseInfo.categoryID.name;

  const cover = $.querySelector(".course__img img");

  cover.setAttribute(
    "src",
    `http://localhost:4000/courses/covers/${courseInfo.cover}`
  );

  const userState = $.querySelector(".learning__info-btn");
  userState.innerHTML = courseInfo.isUserRegisteredToThisCourse
    ? "شما دانشجوی دوره هستید!"
    : "ثبت نام در دوره";

  const courseState = $.querySelector(".course__state");
  courseState.innerHTML = `وضعیت : ${
    courseInfo.isComplete ? "به اتمام رسیده" : "در حال برگزاری"
  }`;

  const lastUpdate = $.querySelector(".course__date");
  lastUpdate.innerText =
    "آخرین بروزرسانی : " + changeDateToFa(courseInfo.updatedAt.split("T")[0]);

  const courseTimeContainer = $.querySelector(".course__time");
  courseTimeContainer.innerHTML = `مدت زمان دوره : ${minuteToTimer(
    courseTime
  )}`;
}

const sessionsContainer = $.getElementById("sessionsContainer");
let sessionsBox = null;
let sessionsBoxesCounter = null;
let sessionsCategory = null;
let courseTime = 0;
function showCourseSessions() {
  sessionsContainer.innerHTML = "";
  if (!courseInfo.sessions.length) {
    sessionsContainer.insertAdjacentHTML(
      "beforeend",
      `
    
    <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse">
        جلسات دوره
      </button>
    </h2>
    <div id="panelsStayOpen-collapse" class="accordion-collapse collapse show" style="">
<div class="accordion-body p-0">
<ol class="list-group list-group-numbered">

<li class="list-group-item gap-0 gap-sm-2 align-items-center d-flex bg-light py-0 px-1 px-sm-3 rounded-0">
<a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">جلسه ای موجود نیست !</span><span class="me-auto">00:00 دقیقه
  <i class="bi bi-lock-fill me-1 me-sm-3 text-orange"></i></span></a>
</li>

</ol>
</div>
</div>
  </div>`
    );
  } else {
    courseInfo.sessions.forEach((session) => {
      courseTime += +session.time;
      if (sessionsCategory !== session.title.split("/")[0]) {
        sessionsCategory = session.title.split("/")[0];
        sessionsBoxesCounter++;
        sessionsContainer.insertAdjacentHTML(
          "beforeend",
          `
            <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${sessionsBoxesCounter}">
                ${sessionsCategory}
              </button>
            </h2>
            <div id="panelsStayOpen-collapse${sessionsBoxesCounter}" class="accordion-collapse collapse" style="">
    <div class="accordion-body p-0">
      <ol class="list-group list-group-numbered box-${sessionsBoxesCounter}">
    
      <li class="list-group-item gap-0 gap-sm-2 align-items-center d-flex bg-light py-0 px-1 px-sm-3 rounded-0">
      <a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">${
        session.title.split("/")[1]
      }</span><span class="me-auto">${session.time} دقیقه
          <i class="bi bi-${
            session.free || session.isUserRegisteredToThisCourse ? "un" : ""
          }lock-fill me-1 me-sm-3 text-orange"></i></span></a>
    </li>
    
      </ol>
    </div>
    </div>
          </div>
            `
        );
        sessionsBox = sessionsContainer.querySelector(
          `.box-${sessionsBoxesCounter}`
        );
      } else {
        sessionsBox.insertAdjacentHTML(
          "beforeend",
          `
            <li class="list-group-item gap-0 gap-sm-2 align-items-center d-flex bg-light py-0 px-1 px-sm-3 rounded-0">
            <a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">${
              session.title.split("/")[1]
            }</span><span class="me-auto">${session.time} دقیقه
                <i class="bi bi-${
                  session.free || session.isUserRegisteredToThisCourse
                    ? "un"
                    : ""
                }lock-fill me-1 me-sm-3 text-orange"></i></span></a>
          </li>
            `
        );
      }
    });
  }
}
const relatedCoursesContainer = $.querySelector(".courses__same-boxes");
let notFoundourse = $.querySelector(".not__found__course");
function showRelatedCourses() {
  relatedCoursesContainer.innerHTML = "";
  if (relatedCourses.length) {
    relatedCoursesContainer.innerHTML = `${relatedCourses.map((course) => {
      return `
          <div class="course__box rounded">
                            <div class="course__box-container d-flex flex-column justify-content-end text-white h-100"
        onclick = "goToCourseDetail('${course.shortName}')"
        >
                              <div class="course__box-bg-img position-absolute bg-img"
                              style="background-image:url('http://localhost:4000/courses/covers/${
                                course.cover
                              }');">
                              </div>
                              <a class="course__box-category fw-bold rounded px-3 py-2 bg-orange text-white" href="#">${
                                courseInfo.categoryID.name
                              }</a>
                              <div class="course__box-content">
                                <div class="course__box-description pb-3 d-flex flex-column pe-4 ps-2 align-items-start">
                                  <div class="course__box-img">
                                    <img src="./img/poster.jpg" alt="" class="img-fluid">
                                  </div>
                                  <div class="course__box-teacher h6 mt-2">
                                    علی رحیمی
                                  </div>
                                  <div class="course__box-title h5 fw-bold text-end mt-1">
                                    ${course.name}
                                  </div>
                                </div>
                                <div class="course__box-state d-flex justify-content-between p-3">
                                  <a class="course__box-price span order-1 bg-green py-1 px-3 rounded fw-bold text-white" href="#">
                                  ${
                                    course.price
                                      ? Number(course.price).toLocaleString(
                                          "fa-IR"
                                        ) + " تومان"
                                      : "رایگان"
                                  }
                                  </a>
                                  <div class="course__box-star d-flex align-items-center justify-content-center justify-content-sm-start">
                                    <span class="course__box-number-star align-self-end"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
          `;
    })}`;
  } else {
    notFoundourse.classList.remove("d-none");
  }
}

window.goToCourseDetail = goToCourseDetail;

function changeDateToFa(date) {
  let dateTarget = new Date(
    Date.UTC(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2])
  );

  return dateTarget.toLocaleDateString("fa-IR");
}

function minuteToTimer(time) {
  return `${
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`
  }:${
    Math.floor(time % 60) > 9
      ? Math.floor(time % 60)
      : `0${Math.floor(time % 60)}`
  }`;
}
