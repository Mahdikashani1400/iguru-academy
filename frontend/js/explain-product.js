import { getModals } from "./modals.js";
import { getHeader } from "./header.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";
import {
  mainHost,
  getCourseDetails,
  getRelatedCourses,
  sendComment,
  registerUserToCourseTarget,
  changeDateToFa,
  changePriceNumberToFa,

  goToProductDetail,
  removeLoader,
  calculateDiscount,
} from "../js/funcs/shared.js";
import { getUserInfo } from "../js/funcs/auth.js";
import { productCoverSlider } from "../vendor/slick-slider/app.js";
import { showToast } from "../js/funcs/utils.js";

window.goToProductDetail = goToProductDetail;

const $ = document;
let productInfo = null;
let relatedProducts = null;
let userInfo = null;
let productName = new URLSearchParams(location.search).get("name");




window.addEventListener("load", async () => {
  const loader = $.querySelector('.loader_container')
  await getModals();
  await getHeader();
  await getCourseDetails(productName).then((data) => {
    productInfo = data;
    showProductDetails();

  });
  contentBtnHandler()
  getPoster(productName.split("_")[1], "blog_page-bg.jpg");



  await getRelatedCourses(productName).then((data) => {
    relatedProducts = data;
    removeLoader(loader)

  });
  setTimeout(async () => {
    await productCoverSlider();
    selectionImg();
  }, 200);
  await getUserInfo().then((data) => {
    userInfo = data;
  });
  getAllComments();
  showRelatedproducts();
  getFooter();
});
function showProductDetails() {
  const title = $.querySelector(".product-title");
  const price = $.querySelector(".product-price");
  const category = $.querySelector(".product-category");
  const imagesContainer = $.querySelector(".main-img");
  title.innerHTML = productInfo.name;
  price.innerHTML = `
  <span class="${productInfo.discount && productInfo.price ? "main__price" : ""}"> ${changePriceNumberToFa(productInfo.price)}</span>
  ${productInfo.discount && productInfo.price ? `
  <span class="off__price px-1">
  ${changePriceNumberToFa(calculateDiscount(productInfo.price, productInfo.discount))}
  </span>`: ""}
  `
  category.innerHTML = productInfo.categoryID.name;
  imagesContainer.innerHTML = `
    <img
    class=""
    src="${mainHost}/courses/covers/${productInfo.cover}"
    alt=""
  />
    <img
    class=""
    src="${mainHost}/courses/covers/${productInfo.cover}"
    alt=""
  />
    `;
}

function selectionImg() {
  let imgContainers = $.querySelectorAll(
    ".product__images__content .slick-dots li"
  );
  imgContainers.forEach((imgLi) => {
    imgLi.innerHTML = `
    <img
    class=""
    src="${mainHost}/courses/covers/${productInfo.cover}"
    alt=""
  />
    `;
  });
}
const relatedProductsContainer = $.querySelector(".same__products__boxes");
function showRelatedproducts() {
  if (relatedProducts.length) {
    relatedProductsContainer.innerHTML = `
    ${relatedProducts
        .map((product) => {
          return `
        <div class="same__product__box d-flex flex-column justify-content-center align-items-center pb-5 pb-lg-0 mb-4"
        onclick = "goToProductDetail('${product.shortName}')">
        <div class="same__product__content">
          <div class="same__product__box-img rounded rounded-3 px-3 px-lg-0 py-lg-3 w-100">
            <div class="p same__product__box-add-basket fw-bold d-flex bg-green p-3 text-white rounded-top position-absolute">
              افزودن به سبد خرید
            </div>
            <img class="rounded mx-auto d-block" src="${mainHost}/courses/covers/${product.cover
            }" alt="">
          </div>
          <div class="same__product__box-title h6 pt-4 fw-bold text-center">
          ${product.name}
          </div>
          <div class="same__product__box-price p fw-bold text-orange fs-6 text-center">
          <span class="${product.discount && product.price ? "main__price" : ""}"> ${changePriceNumberToFa(product.price)}</span>
          ${product.discount && product.price ? `
          <span class="off__price px-1">
          ${changePriceNumberToFa(calculateDiscount(product.price, product.discount))}
          </span>`: ""}
          </div>
        </div>
      </div>
      `;
        })
        .join("")}`;
  } else {
    relatedProductsContainer.innerHTML = `
    <div class="empty__comments d-flex p justify-content-center align-items-center py-4 py-sm-5 w-100 mx-auto text-white rounded-3 fs-5">محصول مرتبطی وجود ندارد !</div>`;
  }
}

let inputNumberContainers = $.querySelectorAll(".quantity__number-input");

inputNumberContainers.forEach((elem) => {
  elem.querySelector("input").addEventListener("keydown", (e) => {
    e.preventDefault();
  });
});

const productMenuItems = $.querySelectorAll(".more__details .titles > div");
let activeLastItem = null;
let activeLastDescribe = null;
let activeNewDescribe = null;
productMenuItems.forEach((item) => {
  item.addEventListener("click", descriptionCourseToggle.bind(item));
});
function descriptionCourseToggle() {
  // change activation item
  activeLastItem = $.querySelector(".more__details .titles .active");
  activeLastItem.classList.remove("active");
  this.classList.add("active");

  // change activation description
  activeLastDescribe = $.querySelector(".details__content > div.active");
  activeLastDescribe.classList.remove("active");
  activeLastDescribe.classList.add("d-none");
  activeNewDescribe = $.getElementById(`${this.dataset.bsTarget}`);
  activeNewDescribe.classList.add("active");
  activeNewDescribe.classList.remove("d-none");
}

//

// get all comments
let commentsContainer = $.getElementById("commentsContainer");
function getAllComments() {
  if (productInfo.comments.length) {
    commentsContainer.innerHTML = `
    <div class="h2">
      <span class="text-gray">${productInfo.comments.length}</span> دیدگاه
    </div>
    <div class="comments__container row mx-auto px-0">
    
    ${productInfo.comments
        .map((comment) => {
          return `
        <div class="comment card py-4 my-3 border-1 px-sm-3 bg-normal position-relative d-flex px-0"
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
      }</span>
         
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
  } else {
    commentsContainer.innerHTML = `
    <div class="h2">
      <span class="text-gray">${productInfo.comments.length}</span> دیدگاه
    </div>
    <div class="comments__container row mx-auto px-0">
    <div class="empty__comments d-flex p justify-content-center align-items-center py-4 py-sm-5 w-100 mx-auto text-white rounded-3 fs-5 mt-3 mb-5" style="background:#e95374d4;">هنوز هیچ دیدگاهی ثبت نشده است.</div>

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
  sendComment(productName, commentText.value, starNumber, getAllComments);
}






function addToBasketBtnHandler(e) {
  e.preventDefault()
  if (productInfo.price && !productInfo.isUserRegisteredToThisCourse) {
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
            await useDiscountCode(discountCode.value, productInfo).then(data => {
              discountInfo = data
              if (discountInfo.code) {
                showToast("کد تخفیف با موفقیت اعمال شد.", "success", () => {
                })

                registerUserToCourseTarget(productInfo, discountInfo)

              } else {
                showToast("کد تخفیف را به درستی وارد کنید.", "error", () => { })
              }
            })

          }

        })
      } else {
        registerUserToCourseTarget(productInfo)
      }
    })
  } else if (!productInfo.isUserRegisteredToThisCourse) {
    registerUserToCourseTarget(productInfo).then(res => {

    })
  } else {
    showToast("شما قبلا این محصول را خریداری کرده اید دوست عزیز.", "warning", () => { })
  }
}

let addToBasketBtn = $.getElementById('addToBasketBtn');


addToBasketBtn.addEventListener('click', addToBasketBtnHandler)

function contentBtnHandler() {
  addToBasketBtn.innerHTML = productInfo.isUserRegisteredToThisCourse ? "محصول قبلا خریداری شده" : "افزودن به سبد خرید"
}