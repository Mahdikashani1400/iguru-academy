const $ = document;
const modals = $.querySelector(".modals");
function getModals() {
  modals.innerHTML = `
    
  <div
  class="user__basket-modal position-absolute bg-modal rounded rounded-3 d-flex justify-content-center align-items-center d-none"
>
  <div class="h6 text-white">هیچ محصولی در سبد خرید نیست.</div>
</div>
<div
  class="search__box-modal bg-modal position-absolute rounded rounded-3"
>
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

    
    `;
}

export { getModals };
