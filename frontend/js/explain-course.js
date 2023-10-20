import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import { getCourseDetails } from "../js/funcs/shared.js";
const $ = document;

let courseInfo = null;
let courseName = new URLSearchParams(location.search).get("name");

(async function () {
  getModals();
  await getHeader();
  await getCourseDetails(courseName).then((data) => {
    courseInfo = data;
  });
  showCourseSessions();
  showCourseDetails();
  getPoster(courseName, "course_page-bg.jpg");
  getFooter();
})();

function showCourseDetails() {
  console.log(courseInfo);
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
  courseTimeContainer.innerHTML = `مدت زمان دوره : ${courseTime}`;
}

function changeDateToFa(date) {
  let dateTarget = new Date(
    Date.UTC(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2])
  );

  return dateTarget.toLocaleDateString("fa-IR");
}

const sessionsContainer = $.getElementById("sessionsContainer");
let sessionsBox = null;
let sessionsBoxesCounter = null;
let sessionsCategory = null;
let courseTime = null;
function showCourseSessions() {
  sessionsContainer.innerHTML = "";
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
        session.free ? "un" : ""
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
      console.log(sessionsBox);
    } else {
      sessionsBox.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item gap-0 gap-sm-2 align-items-center d-flex bg-light py-0 px-1 px-sm-3 rounded-0">
        <a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">${
          session.title.split("/")[1]
        }</span><span class="me-auto">${session.time} دقیقه
            <i class="bi bi-${
              session.free ? "un" : ""
            }lock-fill me-1 me-sm-3 text-orange"></i></span></a>
      </li>
        `
      );
    }
  });
}
