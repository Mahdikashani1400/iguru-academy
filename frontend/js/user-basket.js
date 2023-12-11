import { getModals } from "./modals.js";

import {
  changePriceNumberToFa,
  calculateDiscount
} from "../js/funcs/shared.js";
import { getHeader, getPageTitle } from "./header.js";
import { getPoster } from "./title-page.js";
import { ordersInfo } from "./modals.js";
import { getFooter } from "./footer.js";
const $ = document;

window.addEventListener("load", async () => {
  await getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  showOrdersInfo()

  getFooter();
});

const ordersContainer = $.querySelector('.orders__container')
let sumMainPrice = null
let sumOffs = null
let sumFinallyPrice = null
function showOrdersInfo() {
  ordersContainer.innerHTML = `
  
  <header class="row w-100 m-0 text-white fs-6 fs-md-5 px-0">
  <div class="h5 col-1 text-md-center   align-item-center pe-2 rounded-end"><h5>شماره</h5></div>
  <div class="h5 col-2 px-md-4 px-3 "><h5>عکس</h5></div>
  <div class="h5 col-3 px-md-4 px-3 "><h5>عنوان</h5></div>
  <div class="h5 col-2 text-md-center   align-item-center px-md-4 px-3
px-md-3 px-2">قیمت اصلی</div>
  <div class="h5 col-2 text-md-center  justify-content-lg-center px-md-4 px-3
px-md-3 px-2 ps-2">تخفیف</div>
  <div class="h5 col-2 text-md-center  align-item-center px-md-4 px-3
px-md-3 px-2">قیمت نهایی</div>
</header>
${ordersInfo.map((order, index) => {
    sumMainPrice += order.course.price
    sumFinallyPrice += order.price
    sumOffs += order.course.price - order.price
    return `
  <article class="row fw-bold py-4 border-bottom w-100">
<div class="col-1"><h6>${++index}</h6></div>
  <div
    class="col-2 px-0 rounded-end"
  >
    <img
      src="http://localhost:4000/courses/covers/${order.course.cover
      }"
      class="product-img"
      alt=""
    />
  
  </div>
  <div
  class="col-3 px-0 h5 product-name fw-bold lh-lg fs-5"
>
  آموزش HTML و CSS
</div>
  <div class="product-price p text-orange fs-6 col-2">
    ${order.price ? changePriceNumberToFa(order.course.price) : 0}
  </div>
  
  <div class="product-subtotal p text-orange fs-6 col-2">
    ${order.price ? changePriceNumberToFa(order.course.price - order.price) : 0}
  </div>
  <div class="product-subtotal p text-orange fs-6 col-2">
    ${order.price ? changePriceNumberToFa(order.price) : 0}
  </div>
  
</article>
  `
  }).join("")}


  `
  calculateOrdersHandler()
}

const calculateOrdersBody = $.querySelector('.calculate__orders__body')
function calculateOrdersHandler() {
  const transforPrice = 15000
  calculateOrdersBody.innerHTML = `
  <div class="card-text subtotal__products py-3 border-bottom">
    <span class="ms-5">جمع قیمت واقعی</span
    ><b class="fw-bold fs-6">${changePriceNumberToFa(sumMainPrice)}</b>
  </div>
  <div class="card-text subtotal__products py-3 border-bottom">
    <span class="ms-5">جمع تخفیفات</span
    ><b class="fw-bold fs-6">${changePriceNumberToFa(sumOffs)}</b>
  </div>
  <div class="card-text subtotal__products py-3 border-bottom">
    <span class="ms-5">جمع قیمت نهایی</span
    ><b class="fw-bold fs-6">${changePriceNumberToFa(sumFinallyPrice)}</b>
  </div>
  <div class="card-text transfor__products py-3 border-bottom">
    <span class="ms-5">حمل و نقل</span
    ><b class="fw-bold fs-6">${changePriceNumberToFa(transforPrice)}</b>
  </div>
  <div class="card-text subtotal__products-transfor py-3">
    <span class="ms-5 fw-bold">جمع کل</span
    ><b class="fw-bold fs-6">${changePriceNumberToFa(sumFinallyPrice + transforPrice)}</b>
  </div>
  <button
    class="payment btn bg-orange text-white px-4 py-3 mt-3 w-100 fw-bold"
  >
    پرداخت
  </button>

  
  `
}