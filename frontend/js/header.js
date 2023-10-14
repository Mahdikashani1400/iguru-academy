import { getUserInfo, isLogin } from "../js/funcs/auth.js";
import { getMenus } from "../js/funcs/shared.js";

const $ = document;
const header = $.querySelector(".header");
let navMenuFix = null;
let navMenuScroll = null;
async function getHeader() {
  header.innerHTML = `
    <nav class="navbar__info d-none d-xl-flex user-out">
      <div
        class="container-fluid row justify-content-center align-items-center bg-none"
      >
        <div class="navbar__info__right col-md-3 d-flex row">
          <a href="" class="navbar__info__right-place"
            >ایران، استان خراسان رضوی، مشهد مقدس
          </a>
        </div>
        <div
          class="navbar__info__left col-md-9 px-5 row justify-content-center align-items-center h-100"
        >
          <div class="navbar__info__left-gmail col h-100 d-flex align-items-center">
            <a href="#">iguru@mail.com</a>
            <a href="#" class="user-info p-3 text-white d-flex align-items-center mx-auto rounded-top  h-100">محمد مهدی جان</a>
          </div>
          <div
            class="navbar__info__left-accessibility col row justify-content-center"
          >
            <div
              class="navbar__info__left-login col-3 row justify-content-end d-none d-xl-flex"
            >
              <button class="btn btn-primary d-flex align-items-center">
                <svg
                  class="svg-inline--fa fa-user col-6"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                  ></path>
                </svg>
                <span class="text-white d-none d-md-inline col-6"
                  >ورود</span
                >
              </button>
            </div>
            <div
              class="navbar__info__left-social-media col-5 align-self-center row mx-5 d-none d-xl-flex"
            >
              <div
                class="navbar__info__left-social-media-icon col row align-items-center"
              >
                <svg
                  class="svg-inline--fa fa-twitter"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                  ></path>
                </svg>
              </div>
              <div
                class="navbar__info__left-social-media-icon col row align-items-center"
              >
                <svg
                  class="svg-inline--fa fa-facebook"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"
                  ></path>
                </svg>
              </div>
              <div
                class="navbar__info__left-social-media-icon col row align-items-center"
              >
                <svg
                  class="svg-inline--fa fa-linkedin-in"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin-in"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M100.3 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.6 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                  ></path>
                </svg>
              </div>
              <div
                class="navbar__info__left-social-media-icon col row align-items-center"
              >
                <svg
                  class="svg-inline--fa fa-instagram"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="instagram"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav
      class="navbar navbar-expand-xl navbar__header__menu fix bg-body-tertiary border-bottom bg-transparent user-out"
    >
      <span class="line-bottom-item d-none d-xl-inline-block"></span>

      <div class="container">
        <a href="#" class="navbar__brand order-2 order-xl-0 col-4"
          ><img
            src="./img/logo-light.png"
            alt=""
            class="navbar__brand-item"
        /></a>
        <button
          class="navbar-toggler order-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fa fa-bars text-white"></span>
        </button>
        <div class="d-flex flex-column flex-sm-row order-3 d-xl-none align-items-center gap-3">
        <a href="#" class="user-info px-sm-3 p-2 text-white d-flex align-items-center rounded rounded-2 bg-green">محمد مهدی جان</a>
          <button class="btn d-flex align-items-center gap-2 w-auto bg-white">
            <i class="fa fa-user col text-orange"></i>
            <span class="text-normal d-md-inline col">ورود</span>
          </button>
          
        </div>
        <div class="navbar-collapse collapse " id="navbarSupportedContent">
          
          <ul class="navbar-nav mx-auto bg-xl-danger bg-light h-100">
          <li class="nav-item">
          <a
          href="#navbarSupportedContent"
          data-bs-toggle="collapse"
            class="close-icon d-inline-block right-0 p-3 d-xl-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                class="text-danger"
              />
            </svg>
          </a>
          </ul>
        </div>
        <ul
          class="navbar__icon__box nav flex-row align-items-center list-unstyled ms-xl-auto gap-5 d-none d-xl-flex"
        >

          <li class="nav-item"
          data-bs-toggle="modal"
          data-bs-target="#userBasketModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-check"
              viewBox="0 0 16 16"
            >
              <path
                class="check-basket"
                fill-rule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
          </li>
          <li class="nav-item search"
          data-bs-toggle="modal"
          data-bs-target="#searchModal">
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

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          </li>
        </ul>
      </div>
    </nav>
    <nav
      class="navbar navbar-expand-xl navbar__header__menu scroll bg-body-tertiary border-bottom bg-white"
    >
      <span class="line-bottom-item d-none d-xl-inline-block"></span>

      <div class="container">
        <a href="#" class="navbar__brand order-2 order-xl-0 col-4"
          ><img
            src="./img/logo-dark.png"
            alt=""
            class="navbar__brand-item"
        /></a>
      
 
        <div class="navbar-collapse">
          
          <ul class="navbar-nav mx-auto bg-xl-danger h-100">
          </ul>
        </div>
        <ul
          class="navbar__icon__box nav flex-row align-items-center list-unstyled ms-xl-auto gap-5 d-none d-xl-flex"
        >

          <li class="nav-item"
          data-bs-toggle="modal"
          data-bs-target="#userBasketModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-check"
              viewBox="0 0 16 16"
            >
              <path
                class="check-basket"
                fill-rule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
          </li>
          <li class="nav-item search"
          data-bs-toggle="modal"
          data-bs-target="#searchModal">
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

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          </li>
        </ul>
      </div>
    </nav>
 `;
  showUserNameHandler();

  navMenuFix = header.querySelector(".navbar__header__menu.fix");
  navMenuScroll = header.querySelector(".navbar__header__menu.scroll");
  await showMenus();

  navContainer = $.querySelector(".navbar-collapse");
  seacrhModal = $.getElementById("searchModal");
  navContainer.addEventListener("show.bs.collapse", openMenuHandler);
  navContainer.addEventListener("hide.bs.collapse", closeMenuHandler);

  seacrhModal.addEventListener("show.bs.modal", seacrhModalHandler);
  seacrhModal.addEventListener("hide.bs.modal", seacrhModalHandler);
}

function getPageTitle() {
  let pageTitle =
    fixMenuContainer.querySelector(".navbar-nav  .dropdown-item.active")
      ?.innerHTML ||
    fixMenuContainer.querySelector(".navbar-nav  .nav-item.active .nav-link")
      .innerHTML;
  return pageTitle;
}

function showUserNameHandler() {
  if (isLogin()) {
    const navs = header.querySelectorAll("nav");
    const userNames = header.querySelectorAll(".user-info");

    getUserInfo().then((data) => {
      navs.forEach((nav) => {
        nav.classList.remove("user-out");
        userNames.forEach((nameElem) => {
          nameElem.innerHTML = `${data.name}`;
        });
      });
    });
  }
}
let fixMenuContainer = null;
let scrollMenuContainer = null;

// let pageTitle = null;

async function showMenus() {
  fixMenuContainer = navMenuFix.querySelector(".navbar-nav");
  scrollMenuContainer = navMenuScroll.querySelector(".navbar-nav");
  const menusInfo = await getMenus().then((data) => data);

  menusInfo.forEach((menuInfo) => {
    if (menuInfo.submenus.length) {
      fixMenuContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="nav-item dropdown ${
          location.href.includes(menuInfo.href) ? "active" : ""
        }"
        onmouseenter="lineBottomItemHandler(event)"
        onmouseleave="lineBottomItemHandler(event)">
        <a
          href="${menuInfo.href}"
          class="nav-link fs-5 fs-xl-6 text-muted py-lg-4 text-white plus-toggle px-4"
   
          >${menuInfo.title}</a
        >
        <ul
          class="dropdown-menu rounded mt-3 py-4"
          aria-labelledby="navbarDropdown"

        >
        ${menuInfo.submenus
          .map(
            (subsmenu) =>
              `
        <li class="dropdown-submenu dropend">
        <a href="${subsmenu.href}" class="dropdown-item ${
                location.href.includes(subsmenu.href) ? "active" : ""
              } text-white "
          >${subsmenu.title}</a
        >
      </li>
        `
          )
          .join("")}
        </ul>
        
        </li>

      `
      );
      scrollMenuContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="nav-item dropdown ${
          location.href.includes(menuInfo.href) ? "active" : ""
        }"
        onmouseenter="lineBottomItemHandler(event)"
        onmouseleave="lineBottomItemHandler(event)">
        <a
          href="${menuInfo.href}"
          class="nav-link fs-5 fs-xl-6 text-muted py-lg-4 text-white plus-toggle px-4"
   
          >${menuInfo.title}</a
        >
        <ul
          class="dropdown-menu rounded mt-3 py-4"
          aria-labelledby="navbarDropdown"

        >
        ${menuInfo.submenus
          .map(
            (subsmenu) =>
              `
        <li class="dropdown-submenu dropend">
        <a href="${subsmenu.href}" class="dropdown-item ${
                location.href.includes(subsmenu.href) ? "active" : ""
              } text-white "
          >${subsmenu.title}</a
        >
      </li>
        `
          )
          .join("")}
        </ul>
        
        </li>

      `
      );
    } else {
      fixMenuContainer.insertAdjacentHTML(
        "beforeend",
        `
      <li class="nav-item ${
        location.href.includes(menuInfo.href) ? "active" : ""
      }"
      onmouseenter="lineBottomItemHandler(event)"
      onmouseleave="lineBottomItemHandler(event)">
      <a
        href="${menuInfo.href}"
        class="nav-link fs-5 fs-xl-6 text-muted py-lg-4 text-white px-4"

        >${menuInfo.title}</a
      >
    </li>`
      );
      scrollMenuContainer.insertAdjacentHTML(
        "beforeend",
        `
      <li class="nav-item ${
        location.href.includes(menuInfo.href) ? "active" : ""
      }"
      onmouseenter="lineBottomItemHandler(event)"
      onmouseleave="lineBottomItemHandler(event)">
      <a
        href="${menuInfo.href}"
        class="nav-link fs-5 fs-xl-6 text-muted py-lg-4 text-white px-4"

        >${menuInfo.title}</a
      >
    </li>`
      );
    }
  });

  navLinkActiveFix =
    fixMenuContainer.querySelector(".navbar-nav > .nav-item.active") ||
    fixMenuContainer.querySelector(".navbar-nav  .dropdown-item.active")
      .parentElement.parentElement.parentElement;
  navLinkActiveScroll =
    scrollMenuContainer.querySelector(".navbar-nav > .nav-item.active") ||
    scrollMenuContainer.querySelector(".navbar-nav  .dropdown-item.active")
      .parentElement.parentElement.parentElement;

  conculateLineBottom(navLinkActiveFix);
  conculateLineBottom(navLinkActiveScroll);

  menuItem = header.querySelectorAll("#navbarSupportedContent .nav-link");
  dropDownHandler();
  setHeighOfDropDownItem();
}
function setHeighOfDropDownItem() {
  let dropdownItems = fixMenuContainer.querySelectorAll(".dropdown-menu");
  dropdownItems.forEach((dropdownItem) => {
    dropdownItem.style.setProperty(
      "--subset-menu-height",
      `${dropdownItem.childElementCount * 37 + 36}px`
    );
  });
}

window.addEventListener("resize", () => {
  {
    dropDownHandler();
  }
});
let lineBottomItem = null;
function conculateLineBottom(elem) {
  lineBottomItem =
    elem.parentElement.parentElement.parentElement.parentElement.querySelector(
      ".line-bottom-item"
    );
  lineBottomItem.style.left =
    ((elem.getBoundingClientRect().x + 28) * 100) / window.innerWidth + "%";
  lineBottomItem.style.width = elem.clientWidth - 36 + "px";
}
window.lineBottomItemHandler = lineBottomItemHandler;
let navLinkActiveFix = null;
let navLinkActiveScroll = null;
function lineBottomItemHandler(e) {
  if (e.type === "mouseenter") {
    conculateLineBottom(e.target);
  } else if (
    e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
      "scroll"
    )
  ) {
    conculateLineBottom(navLinkActiveScroll);
  } else {
    conculateLineBottom(navLinkActiveFix);
  }
}

let menuItem = null;

function dropDownHandler() {
  if (window.innerWidth < 1200) {
    menuItem.forEach((item) => {
      item.setAttribute("data-bs-toggle", "dropdown");
    });
  } else {
    menuItem.forEach((item) => {
      item.setAttribute("data-bs-toggle", "");
    });
  }
}

let navContainer = null;
let seacrhModal = null;
function openMenuHandler() {
  navContainer.classList.add("show-delay");
  $.body.classList.add("no-scroll");
}
function closeMenuHandler() {
  navContainer.classList.remove("show-delay");
  $.body.classList.remove("no-scroll");
}

function seacrhModalHandler() {
  let searchIcons = header.querySelectorAll(".navbar__icon__box .search");
  searchIcons.forEach((searchIcon) => {
    searchIcon.classList.toggle("close");
  });
}

window.addEventListener("scroll", showMenuOnScroll);
let scrollValue = null;

let topSpace = null;
function showMenuOnScroll() {
  topSpace = $.documentElement.scrollTop;

  if (topSpace > scrollValue || topSpace < 150) {
    navMenuScroll.style.top = "-200px";
  } else {
    navMenuScroll.style.top = 0;
  }
  scrollValue = topSpace;
}

export { getHeader, getPageTitle };
