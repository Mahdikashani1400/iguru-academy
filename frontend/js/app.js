import { getHeader } from "./header.js";
import { getModals } from "./modals.js";
import { getFooter } from "./footer.js";
import { aricleSliderHome } from "../vendor/slick-slider/app.js";
import {
  getPopularCourses,
  getArticles,
  getCategoryOfCourses,
  goToCourseDetail,
} from "./funcs/shared.js";

const $ = document;
window.addEventListener("load", async () => {
  getModals();
  await getHeader();

  showPopularCourses("همه");
  showArticles();
  showCategoryOfCourses();
  getFooter();

  particlesJS(
    "about__us__particles",

    {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ff6e34", "#00bda6"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            // color: "#000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 10,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover",
      },
    }
  );
});

let courseTarget = null;

function showPopularCourses(category) {
  const coursesContainer = $.querySelector(".about__us_courses-boxes");
  getPopularCourses().then((data) => {
    coursesContainer.innerHTML = `
    ${data
        .map((course) => {
          if (
            course.categoryID.title === "course" &&
            category === course.categoryID.name
          ) {
            courseTarget = course;
          } else if (
            course.categoryID.title === "course" &&
            category === "همه"
          ) {
            courseTarget = course;
          } else {
            return "";
          }

          return `
      
        <div class="course__box col-xl-3 col-lg-4 col-md-6 col-12 rounded">
        <div class="course__box-container d-flex flex-column justify-content-end text-white h-100"
        onclick = "goToCourseDetail('${courseTarget.shortName}')">
          <div class="course__box-bg-img position-absolute bg-img" style="background-image:url('http://localhost:4000/courses/covers/${courseTarget.cover
            }');">
            
          </div>
          <a class="course__box-category fw-bold rounded px-3 py-2 bg-orange text-white" href="#">${courseTarget.categoryID.name
            }</a>
          <div class="course__box-content">
            <div class="course__box-description pb-3 d-flex flex-column pe-4 ps-2 align-items-start">
              <div class="course__box-img">
                <img src="./img/poster.jpg" alt="" class="img-fluid">
              </div>
              <div class="course__box-teacher h6 mt-2">علی رحیمی</div>
              <div class="course__box-title h5 fw-bold text-end mt-1">${courseTarget.name
            }</div>
            </div>
            <div class="course__box-state d-flex justify-content-between p-3">
              <a class="course__box-price span order-1 bg-green py-1 px-3 rounded fw-bold text-white" href="#">
              ${courseTarget.price
              ? Number(courseTarget.price).toLocaleString("fa-IR") +
              " تومان"
              : "رایگان"
            }
              </a>
              <div class="course__box-star d-flex align-items-center gap-1">
                
              ${Array(courseTarget.courseAverageScore)
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
  });
}
window.goToCourseDetail = goToCourseDetail;
async function showArticles() {
  const articlesContainer = $.querySelector(".blogs__boxes");
  articlesContainer.innerHTML = "";
  const articlesInfo = await getArticles().then((data) => data);
  articlesInfo.forEach((article) => {
    articlesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="blog__box">
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
          <div class="blog__box-title h5 fw-bold">${article.title}</div>
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

  aricleSliderHome();
}

const categoryContainer = $.querySelector(".about__us_courses-menu ul");
async function showCategoryOfCourses() {
  const categoryInfo = await getCategoryOfCourses().then((data) => data);
  categoryContainer.innerHTML = `
  <li class="nav-item">
  <a
    href="#"
    class="nav-link fs-5 fs-xl-6 px-3 line-side active" onclick="changeCategoryOfCourses(event)"
    >همه</a
  >
  `;
  categoryInfo.forEach((cat) => {
    if (cat.title === "course") {
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="nav-item">
        <a href="#" class="nav-link fs-5 fs-xl-6 px-3" onclick="changeCategoryOfCourses(event)">${cat.name}</a>
      </li>
      `
      );
    }
  });
}

window.changeCategoryOfCourses = changeCategoryOfCourses;
let activeCategory = null;
function changeCategoryOfCourses(e) {
  e.preventDefault();
  activeCategory = categoryContainer.querySelector(".nav-link.active");
  activeCategory.classList.remove("active");
  e.target.classList.add("active");
  showPopularCourses(e.target.innerHTML);
}

// particles
