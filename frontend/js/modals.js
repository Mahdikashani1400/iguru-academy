const $ = document;
const modals = $.querySelector(".modals");
function getModals() {
  modals.innerHTML = `
    
  <div
  class="modal fade user__basket-modal"
  id="userBasketModal"
  tabindex="-1"
>
  <div class="modal-dialog">
    <div class="modal-content bg-modal">
      <div class="modal-body p-0">
        <div class="product__boxes-modal row pb-4 gap-3">
          <div class="product__box-modal d-flex">
            <div class="product__content-modal d-flex">
              <div class="product__img-modal ms-3">
                <img
                  src="./img/products/product-1-small.png"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <div class="product__info-modal">
                <p class="product__title-modal fw-bold text-white">
                  آموزش HTML و CSS
                </p>
                <p class="mt-1 text-end">
                  <span class="product__count-modal text-gray">* 39</span>
                  <span class="product__price-modal text-orange me-2"
                    >۲۰,۰۰۰ تومان</span
                  >
                </p>
              </div>
            </div>
            <div class="product__remove-modal me-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-x text-gray"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
          <div class="product__box-modal d-flex">
            <div class="product__content-modal d-flex">
              <div class="product__img-modal ms-3">
                <img
                  src="./img/products/product-1-small.png"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <div class="product__info-modal">
                <p class="product__title-modal fw-bold text-white">
                  آموزش HTML و CSS
                </p>
                <p class="mt-1 text-end">
                  <span class="product__count-modal text-gray">* 39</span>
                  <span class="product__price-modal text-orange me-2"
                    >۲۰,۰۰۰ تومان</span
                  >
                </p>
              </div>
            </div>
            <div class="product__remove-modal me-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-x text-gray"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer px-0">
        <p class="fs-5 fw-bold flex-grow-1">
          <span class="text-white">جمع كل سبد خريد: </span>
          <span class="product__price-modal text-orange me-2"
            >۱,۵۸۰,۰۰۰ تومان</span
          >
        </p>
        <br />
        <br />
        <br />
        <div class="d-flex justify-content-center w-100">
          <button
            class="btn px-4 py-3 fw-bold text-white bg-green to-orange"
          >
            مشاهده سبد خرید
          </button>
        </div>
      </div>
    </div>
    <div class="modal-content bg-modal d-none">
      <div class="modal-body">
        <div class="h6 text-white">هیچ محصولی در سبد خرید نیست.</div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade search__box-modal" id="searchModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content bg-modal rounded rounded-3">
      <div class="modal-body">
        <form class="search__form">
          <div class="">
            <input
              type="text"
              class="form-control px-3 py-3"
              id="searchBox"
              placeholder="جستجو ..."
            />
            <div
              class="search__box-icon position-absolute bg-green rounded rounded-1"
              onclick="goToSearchPage()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search-heart"
                viewBox="0 0 16 16"
              >
                <path
                  class="check-search"
                  d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"
                />
                <path
                  d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    
    `;
}
window.goToSearchPage = goToSearchPage;
function goToSearchPage() {
  let searchBox = $.getElementById("searchBox");
  window.location.href = `search.html?searchValue=${searchBox.value}`;
}
export { getModals };
