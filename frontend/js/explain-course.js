import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  mainHost,
  getCourseDetails,
  getRelatedCourses,
  goToCourseDetail,
  registerUserToCourseTarget,
  useDiscountCode,
  sendComment,
  changeDateToFa,
  changePriceNumberToFa,
  calculateDiscount,
  minuteToTimer,
  answerComment,
} from "../js/funcs/shared.js";
import { getUserInfo, register } from "../js/funcs/auth.js";
import { showToast } from "../js/funcs/utils.js";
const $ = document;
window.goToCourseDetail = goToCourseDetail;

let courseInfo = null;
let userInfo = null;
let relatedCourses = null;
let courseName = new URLSearchParams(location.search).get("name");
let scoresInfo = null;

window.addEventListener("load", async () => {
  await getModals();
  await getHeader();
  await getCourseDetails(courseName).then((data) => {
    courseInfo = data;
    console.log(courseInfo);
    scoresInfo = _.countBy(courseInfo.comments, (obj) => {
      return obj.score;
    });
  });
  getPoster(courseInfo.name, "course_page-bg.jpg");
  showCourseSessions();
  showCourseDetails();
  showScoreUsersByStars();
  await getRelatedCourses(courseName).then((data) => {
    relatedCourses = data;
  });
  showRelatedCourses();
  await getUserInfo().then((data) => {
    userInfo = data;
  });

  getAllComments();

  getFooter();
});



const courseDetailsContainer = $.querySelector(".learning__info")
function showCourseDetails() {
  const title = $.querySelector(".course__title");
  title.innerHTML = courseInfo.name;
  // const price = $.querySelector(".price-number");
  // price.innerHTML = changePriceNumberToFa(calculateDiscount(courseInfo.price, courseInfo.discount))

  const category = $.querySelector(".course__category");
  category.innerHTML = courseInfo.categoryID.name;

  const cover = $.querySelector(".course__img img");

  cover.setAttribute(
    "src",
    `${mainHost}/courses/covers/${courseInfo.cover}`
  );
  courseDetailsContainer.innerHTML = `

                  <div class="learning__info-price bg-green text-white d-flex justify-content-center gap-3 py-4 align-items-center rounded-top">
                  <a class="d-flex flex-column gap-1  price__number span order-1 bg-green py-1 px-2 rounded fw-bold text-white text-center" href="#">
                  
      
                 <span class="fs-5 ${courseInfo.discount && courseInfo.price ? "main__price " : ""}"> ${changePriceNumberToFa(courseInfo.price)
    }</span>
           ${courseInfo.discount && courseInfo.price ? `
           <span class="off__price fs-5 px-1">
           ${changePriceNumberToFa(calculateDiscount(courseInfo.price, courseInfo.discount))}
           </span>`: ""}


           ${courseInfo.discount && courseInfo.price ? `<span class="discount d-flex justify-content-center align-items-center bg-orange rounded-2 p-2 ">${courseInfo.discount}% تخفیف ویژه</span>` : ""}
                  </a>
                    
                  </div>
                  <div class="learning__info__decription p-4">
                    <ul class="items d-flex flex-column gap-3">
                      <li class="item text-normal">
                        <svg class="svg-inline--fa fa-user ps-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg><!-- <i class="fa fa-user ps-2"></i> Font Awesome fontawesome.com --><span>${courseInfo.courseStudentsCount ? "تعداد دانشجویان : " + courseInfo.courseStudentsCount : "اولین دانشجو باشید"}</span>
                      </li>
                      <li class="item text-normal">
                        <i class="bi bi-mortarboard-fill ps-2"></i><span class="course__state">وضعیت : ${courseInfo.isComplete ? "به اتمام رسیده" : "در حال برگزاری"
    }</span>
                      </li>
                      <li class="item text-normal">
                        <i class="bi bi-calendar3 text-gray ps-2"></i><span class="course__date">آخرین بروزرسانی : ${changeDateToFa(courseInfo.updatedAt.split("T")[0])}</span>
                      </li>
                      <li class="item text-normal">
                       <i class="bi bi-collection text-gray ps-2"></i><span class="course__time">تعداد جلسات  : ${courseInfo.sessions.length}</span>
                      </li>
                      <li class="item text-normal">
                        <i class="bi bi-clock-history text-gray ps-2"></i><span class="course__time">مدت زمان دوره : ${minuteToTimer(
      courseTime
    )}</span>
                      </li>
                      <li class="item text-normal">
                        <i class="bi bi-chat-left text-gray ps-2"></i><span class="course__time">تعداد دیدگاه ها : ${courseInfo.comments.length}</span>
                      </li>
                 
                     
                    </ul>
                  </div>
                  <div class="learning__info-btn btn w-100 rounded-0 fw-bold bg-orange to-green py-3 text-center text-white rounded-bottom"
                  onclick= "registerToCourseHandler(event)">
${courseInfo.isUserRegisteredToThisCourse
      ? "شما دانشجوی دوره هستید!"
      : "ثبت نام در دوره"}
                  </div>
`









}

window.registerToCourseHandler = registerToCourseHandler
async function registerToCourseHandler() {
  if (courseInfo.price && !courseInfo.isUserRegisteredToThisCourse) {
    swal.fire({ title: "آیا کد تخفیف داری؟", icon: "warning", confirmButtonText: "بله", showCancelButton: true, cancelButtonText: "خیر" }).then(res => {
      if (res.isConfirmed) {
        swal.fire({
          title: "کد تخفیف خود را وارد کنید.",
          html:
            `<input id="discountCode" placeholder="کد تخفیف ...">`,
          confirmButtonText: 'تایید',
          showCancelButton: true,
          cancelButtonText: 'لغو',

          preConfirm: async () => {
            const discountCode = $.getElementById('discountCode')
            let discountInfo = null
            console.log(discountCode, courseInfo._id);
            await useDiscountCode(discountCode.value, courseInfo).then(data => {
              discountInfo = data
              console.log(discountInfo);
              if (discountInfo.code) {
                showToast("کد تخفیف با موفقیت اعمال شد.", "success", () => {
                })

                registerUserToCourseTarget(courseInfo, discountInfo)

              } else {
                showToast("کد تخفیف را به درستی وارد کنید.", "error", () => { })
              }
            })

          }

        })
      } else {
        registerUserToCourseTarget(courseInfo)
      }
    })
    // await registerUserToCourseTarget(courseInfo).then(data => {
    //   console.log(data);
    // })
  } else if (!courseInfo.isUserRegisteredToThisCourse) {
    registerUserToCourseTarget(courseInfo).then(res => {

    })
  } else {
    showToast("شما در حال حاضر دانشجوی دوره هستی دوست عزیز.", "warning", () => { })
  }
}

const sessionsContainer = $.getElementById("sessionsContainer");
let sessionsBox = null;
let sessionsBoxesCounter = null;
let sessionsCategory = null;
let courseTime = 0;

function showCourseSessions() {
  // let sorted_obj = _.sortBy(courseInfo.sessions,
  //   [function (o) { return o.title; }]);
  // console.log(sorted_obj);


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
      if (sessionsCategory !== session.title.split("/")[0].trim()) {
        sessionsCategory = session.title.split("/")[0].trim();
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
      <a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">${session.title.split("/")[1].trim()
          }</span><span class="me-auto">${session.time} دقیقه
          <i class="bi bi-${(session.free || courseInfo.isUserRegisteredToThisCourse) ? "un" : ""
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
            <a href="#" class="text-normal fw-bold px-1 py-2 d-flex align-items-center justify-content-center justify-content-sm-start w-100"><i class="bi bi-file-earmark text-orange fw-bold fs-5 ps-2 d-none d-sm-inline"></i><span class="course__video__title">${session.title.split("/")[1].trim()
          }</span><span class="me-auto">${session.time} دقیقه
                <i class="bi bi-${session.free || courseInfo.isUserRegisteredToThisCourse
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

let singleScoresContainer = $.querySelectorAll(
  ".single__scores__container > div"
);
let staticStarNumber = null;
let countOfScore = null;
let scoreTargetProgress = null;
let StarNumberAverageVar = null;
let countOfComments = $.querySelector(".count__comments");
let StarNumberAverageElem = $.querySelector(".average__star-number");
let StarsIconsAverage = $.querySelectorAll(".average__star-icons > i");
function showScoreUsersByStars() {
  singleScoresContainer.forEach((elemScore) => {
    staticStarNumber = elemScore.querySelector(".star-number");
    countOfScore = elemScore.querySelector(".score");
    scoreTargetProgress = elemScore.querySelector(".progress-bar");
    countOfScore.innerHTML = scoresInfo[staticStarNumber.innerText] || 0;
    scoreTargetProgress.style.width = `${(countOfScore.innerHTML / Object.entries(scoresInfo).length) * 100
      }%`;

    StarNumberAverageVar +=
      scoresInfo[staticStarNumber.innerText] * staticStarNumber.innerText || 0;
  });
  StarNumberAverageVar = +(
    StarNumberAverageVar / _.sum(Object.values(scoresInfo))
  ).toFixed(1);
  console.log(StarNumberAverageVar);
  StarNumberAverageElem.innerHTML = StarNumberAverageVar || 0;

  StarsIconsAverage.forEach((icon, index) => {
    console.log(index + 1, +String(StarNumberAverageVar).split(".")[0] + 1);
    if (StarNumberAverageVar) {
      if (index + 1 <= String(StarNumberAverageVar).split(".")[0]) {
        icon.style.setProperty(
          "--star-fill-color",
          `-webkit-linear-gradient(0deg, #ffb606 100%, #6062622b 0%)`
        );
      } else if (index + 1 == +String(StarNumberAverageVar).split(".")[0] + 1) {
        const colorPercent = String(StarNumberAverageVar).split(".")[1] * 10
        icon.style.setProperty(
          "--star-fill-color",
          `-webkit-linear-gradient(0deg, #ffb606 ${colorPercent
          }%, #6062622b ${100 - colorPercent}%)`
        );
      } else {
        icon.style.setProperty("--star-fill-color", `#6062622b`);
      }
    }
  });

  countOfComments.innerHTML = `${_.sum(Object.values(scoresInfo))} نقد و بررسی`;
}

const relatedCoursesContainer = $.querySelector(".courses__same-boxes");
let notFoundourse = $.querySelector(".not__found__course");
function showRelatedCourses() {
  relatedCoursesContainer.innerHTML = "";
  if (relatedCourses.length) {
    relatedCoursesContainer.innerHTML = `${relatedCourses.map((course) => {
      console.log(course);
      return `
          <div class="course__box rounded">
                            <div class="course__box-container d-flex flex-column justify-content-end text-white h-100"
        onclick = "goToCourseDetail('${course.shortName}')"
        >
                              <div class="course__box-bg-img position-absolute bg-img"
                              style="background-image:url('${mainHost}/courses/covers/${course.cover
        }');">
                              </div>
                              <a class="course__box-category fw-bold rounded px-3 py-2 bg-orange text-white" href="#">${courseInfo.categoryID.name
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
                                <a class="position-relative d-flex flex-column gap-1 course__box-price span order-1 bg-green py-1 px-2 rounded fw-bold text-white text-center" href="#">
                                ${course.discount && course.price ? `<span class="discount d-flex justify-content-center align-items-center bg-orange rounded-circle position-absolute ">${course.discount}%</span>` : ""}
                    
                               <span class="${course.discount && course.price ? "main__price" : ""}"> ${changePriceNumberToFa(course.price)
        }</span>
                         ${course.discount && course.price ? `
                         <span class="off__price px-1">
                         ${changePriceNumberToFa(calculateDiscount(course.price, course.discount))}
                         </span>`: ""}
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
    }).join("")}`;
  } else {
    notFoundourse.classList.remove("d-none");
  }
}

const courseMenuItems = $.querySelectorAll(".content__menu .breadcrumb-item");
let activeLastItem = null;
let activeLastDescribe = null;
let activeNewDescribe = null;
courseMenuItems.forEach((item) => {
  item.addEventListener("click", descriptionCourseToggle.bind(item));
});
function descriptionCourseToggle() {
  // change activation item

  activeLastItem = $.querySelector(".content__menu .breadcrumb-item.active");
  activeLastItem.classList.remove("active");
  this.classList.add("active");

  // change activation description
  activeLastDescribe = $.querySelector(
    ".course__content__details > div.active"
  );
  activeLastDescribe.classList.remove("active");
  activeLastDescribe.classList.add("d-none");
  activeNewDescribe = $.getElementById(`${this.dataset.bsToggle}`);
  activeNewDescribe.classList.add("active");
  activeNewDescribe.classList.remove("d-none");
}

// get all comments
let commentsContainer = $.getElementById("commentsContainer");
function getAllComments() {
  if (courseInfo.comments.length) {
    commentsContainer.innerHTML = `
    <div class="h2">
      <span class="text-gray">${courseInfo.comments.length}</span> دیدگاه
    </div>
    <div class="comments__container row mx-auto">
    
    ${courseInfo.comments
        .map((comment) => {
          return `
        <div class="comment card py-4 my-3 border-1 px-3 bg-normal position-relative d-flex"
        >
        <div class="row g-0">
          <div class="col-md-2 d-flex justify-content-center contain-img pe-4 pe-md-0 pb-2 pb-md-0">
            <img src="./img/teachers/t4.jpg" class="rounded-3" alt="...">
          </div>
          <div class="col-md-10 flex-grow-1 pe-4">
            <div class="card-body p-0">
             <div class="d-flex align-items-center gap-2" >
             <h3 class="card-title fw-bold mb-0 username">${comment.creator.username
            }</h3>
            <span class="badge bg-green">${comment.creator.role === "ADMIN" ? "ادمین" : "کاربر"
            }</span>
             </div>
              
              <small class="text-gray fw-bold date-comment">${changeDateToFa(
              comment.updatedAt.split("T")[0]
            )}</small>
           
              <p class="card-text mt-1 text-normal lh-lg">
              ${comment.body}

              </p>
              <p class="card-text"></p>
            </div>
          </div>
        </div>

       ${comment.answerContent
              ? ` <div class="comment answer card py-3 mt-4 mb-3 border-1 px-3 position-relative align-self-center bg-transparent"
         >
       <div class="row g-0">
         <div class="col-md-2 d-flex justify-content-center contain-img pe-4 pe-md-0 pb-2 pb-md-0">
           <img src="./img/teachers/t4.jpg" class="rounded-3" alt="...">
         </div>
         <div class="col-md-10 flex-grow-1 pe-4">
           <div class="card-body p-0">
           <div class="d-flex align-items-center gap-2" >
           <h3 class="card-title fw-bold mb-0 username">${comment.answerContent.creator.username
              }</h3>
          <span class="badge bg-primary">${comment.answerContent.creator.role === "ADMIN" ? "ادمین" : "کاربر"
              }</span>
           </div>
         
             <small class="text-gray fw-bold date-comment">${changeDateToFa(
                comment.answerContent.updatedAt.split("T")[0]
              )}</small>
   
             <p class="card-text mt-1 text-normal lh-lg">
${comment.answerContent.body} 
             </p>
             <p class="card-text"></p>
           </div>
         </div>
       </div>
     </div>`
              : ""
            }
      </div>

      `;
        })
        .join("")}
    </div>
    <div class="send__comment shadow pt-5 pb-3 pb-md4 px-md-5 px-sm-4 px-3 mt-4">
      <div class="h1 pb-1">دیدگاهتان را بنویسید</div>

      <form class="row py-4">
        <div class="mb-3">
          <div class="h3 my-3 d-flex justify-content-between align-items-center"><span class="text-normal" id="userName">${userInfo.username
      || "ناشناس"}</span>
         
          </div>
          <textarea name="comment" cols="45" rows="5" placeholder="${userInfo ? " دیدگاه شما ..." : "برای نظر دادن باید وارد شوید"}" id="commentText" class="form-control p-3" ${userInfo ? "" : "readonly"}></textarea>
        </div>
        <div class="mb-3 d-flex pe-3 me-1" id="starsContainer">
          <span class="text-normal ps-3" style="font-size: 18px">
            امتیاز شما به دوره :</span>
          <div class="p fw-bold course__star-icons d-flex flex-row-reverse gap-1 align-items-end"
          onclick="setStarsByUser(event)">
            <i class="bi bi-star-fill" data-bs-target="star-1"></i>
            <i class="bi bi-star" data-bs-target="star-2"></i>
            <i class="bi bi-star" data-bs-target="star-3"></i>
            <i class="bi bi-star" data-bs-target="star-4"></i>
            <i class="bi bi-star" data-bs-target="star-5"></i>
          </div>
        </div>
        <div class="mb-3 col-md-3">
          <button class="btn fw-bold w-100 py-3 bg-orange text-white submit-comment" 
          onclick = "submitCommentHandler(event)">
            فرستادن دیدگاه
          </button>
        </div>
      </form>
    </div>
`;
  } else {
    commentsContainer.innerHTML = `
    <div class="h2">
      <span class="text-gray">${courseInfo.comments.length}</span> دیدگاه
    </div>
    <div class="comments__container row mx-auto">
    <div class="empty__comments d-flex p justify-content-center align-items-center py-4 py-sm-5 w-100 mx-auto text-white rounded-3 fs-5" style="background:#e95374d4;">هنوز هیچ دیدگاهی ثبت نشده است.</div>

    </div>
    <div class="send__comment shadow pt-5 pb-3 pb-md4 px-md-5 px-sm-4 px-3 mt-4">
      <div class="h1 pb-1">دیدگاهتان را بنویسید</div>

      <form class="row py-4">
        <div class="mb-3">
          <div class="h3 my-3 d-flex justify-content-between align-items-center"><span class="text-normal" id="userName">${userInfo.username}</span>
         
          </div>
          <textarea name="comment" cols="45" rows="5" placeholder="دیدگاه شما ..." id="commentText" class="form-control p-3"></textarea>
        </div>
        <div class="mb-3 d-flex pe-3 me-1" id="starsContainer">
          <span class="text-normal ps-3" style="font-size: 18px">
            امتیاز شما به دوره :</span>
          <div class="p fw-bold course__star-icons d-flex flex-row-reverse gap-1 align-items-end"
          onclick="setStarsByUser(event)">
            <i class="bi bi-star-fill" data-bs-target="star-1"></i>
            <i class="bi bi-star" data-bs-target="star-2"></i>
            <i class="bi bi-star" data-bs-target="star-3"></i>
            <i class="bi bi-star" data-bs-target="star-4"></i>
            <i class="bi bi-star" data-bs-target="star-5"></i>
          </div>
        </div>
        <div class="mb-3 col-md-3">
          <button class="btn fw-bold w-100 py-3 bg-orange text-white submit-comment" 
          onclick = "submitCommentHandler(event)">
            فرستادن دیدگاه
          </button>
        </div>
      </form>
    </div>
`;
  }
}

let starTarget = null;
let starNumber = 1;
window.setStarsByUser = setStarsByUser;
function setStarsByUser(e) {
  if (e.target.tagName === "I") {
    starTarget = e.target;
    starNumber = starTarget.dataset.bsTarget.split("-")[1];
    $.querySelectorAll(".course__star-icons i").forEach((star) => {
      if (starNumber < star.dataset.bsTarget.split("-")[1]) {
        star.classList.remove("bi-star-fill");
        star.classList.add("bi-star");
      } else {
        star.classList.add("bi-star-fill");
        star.classList.remove("bi-star");
      }
    });
  }
}

// send comment from user

let commentText = null;
window.submitCommentHandler = submitCommentHandler;
function submitCommentHandler(e) {
  e.preventDefault();
  commentText = $.getElementById("commentText");
  sendComment(courseName, commentText.value, starNumber, getAllComments);
}

