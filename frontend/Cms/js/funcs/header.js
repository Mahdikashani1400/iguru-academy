import { getTarget } from "./shared.js"
const $ = document;
async function createHeader() {
  const headerNav = $.querySelector('.header__nav')
  insertHeaderTemplate(headerNav)

  themeColorHandler()
  let themeToggles = document.querySelectorAll('.themeToggle')
  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', themeColorHandler)
  })

  const menuBtn = $.getElementById('menuBtn')
  menuBtn.addEventListener('click', () => {
    if (window.innerWidth >= 1024) {
      headerNav.classList.toggle('mobile')
    } else {

      headerNav.classList.toggle('hide')
    }
  });
  window.addEventListener('resize', () => {
    sizeOfMenuHandler(headerNav)

  });
  sizeOfMenuHandler(headerNav)

  insertIcons()
  await getAdminInfos()
}

function insertHeaderTemplate(headerNav) {

  headerNav.insertAdjacentHTML('beforeend', `
    <a
    href="#"
    class="absolute w-10 h-10 dark:bg-[#14141E] bg-[#F5F5F9] -left-5 top-1/2 rounded-full flex items-center justify-center shape"
    id="menuBtn"
  >
    <svg
      class="w-[26px] h-[26px] p-[2.5px] bg-blue-primary rounded-full dark:text-black text-white"
    >
      <use href="#chevron-right"></use>
    </svg>
  </a>
  <div class="nav__logo w-36 flex justify-center relative">
    <img class="dark:invert" src="../img/logo-dark.png" alt="" />
  </div>
  <ul class="header__menu">
    <a
      href="#"
      class="name__container flex flex-col gap-x-2 dark:text-white text-zinc-800 items-center md:hidden p-0 mb-7 mt-2"
    >
      <p class="flex items-center gap-x-1.5 order-1 md:-order-1">
      <span class="admin__name"></span>
      </p>

      <img
        class="w-12 h-12 rounded-full"
        src="../img/teachers/t3.jpg"
        alt=""
      />
    </a>
    <a href="index.html" class="">
      <svg class="w-5 h-5">
        <use href="#home"></use>
      </svg>
      <span>صفحه اصلی</span></a
    ><a href="courses.html"
      ><svg class="w-5 h-5">
        <use href="#book-open"></use>
      </svg>
      <span>دوره ها</span></a
    ><a href="sessions.html"
    ><svg class="w-5 h-5">
      <use href="#inbox-arrow-down"></use>
    </svg>
    <span>جلسات</span></a
  ><a href="products.html"
      ><svg class="w-5 h-5">
        <use href="#shopping-bag"></use>
      </svg>
      <span>محصولات</span></a
    ><a href="menus.html"
      ><svg class="w-5 h-5">
        <use href="#bars-3"></use>
      </svg>
      <span>منو ها</span></a
    ><a href="articles.html"
      ><svg class="w-5 h-5">
        <use href="#document-text"></use>
      </svg>
      <span>مقاله ها</span></a
    ><a href="users.html"
      ><svg class="w-5 h-5">
        <use href="#users"></use>
      </svg>
      <span>کاربران</span></a
    ><a href="comments.html"
      ><svg class="w-5 h-5">
        <use href="#chat-bubble-left-right"></use>
      </svg>
      <span>کامنت ها</span></a
    ><a href="discount.html"
      ><svg class="w-5 h-5">
        <use href="#receipt-percent"></use>
      </svg>
      <span>کد های تخفیف</span></a
    ><a href="categories.html"
      ><svg class="w-5 h-5">
        <use href="#folder"></use>
      </svg>
      <span>دسته بندی ها</span></a
    ><a href="messages.html"
      ><svg class="w-5 h-5">
        <use href="#envelope"></use>
      </svg>
      <span>پیغام ها</span></a
    ><a href="../login-form.html" class="text-red-500"
      ><svg class="w-5 h-5">
        <use href="#power"></use>
      </svg>
      <span>خروج</span></a
    >
  </ul>

    `)

  const header = $.querySelector('.header')
  header.innerHTML = `
    
    <div class="container">
    <div
      class="flex items-center dark:bg-black-dark bg-white rounded-md sm:p-3 justify-between shadow-main"
    >
      <div
        class="w-full md:w-fit flex items-center sm:justify-between justify-center md:justify-start gap-x-4 lg:gap-x-8"
      >
        <div
          class="md:w-fit sm:w-80 w-full h-12 flex items-center md:py-6 md:px-4 px-2 py-03 dark:bg-gray-700 bg-gray-200 rounded-md dark:text-white text-black"
        >
          <svg class="w-5 h-5 dark:text-gray-300 text-light-primary">
            <use href="#magnifying-glass"></use>
          </svg>
          <input
            class="bg-transparent border-none focus:outline-none focus:shadow-none sm:w-80 w-full px-3"
            type="text"
          />
        </div>
        <div class="relative sm:flex hidden group">
          <a href="#" class="relative">
            <svg class="w-7 h-7 text-light-primary dark:text-gray-300">
              <use href="#bell"></use>
            </svg>
            <div
              class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-2 dark:border-gray-900"
            >
              20
            </div>
          </a>
          <div class="absolute pt-5 top-4 -left-32">
            <div
              class="bg-white dark:bg-black-dark text-zinc-800 dark:text-gray-primary shadow-main w-64 h-64 overflow-y-scroll scrollbar-customize px-4 py-2 rounded-lg child:py-2 child:border-b child:border-gray-300 child:dark:border-gray-700 child:break-words transition-all duration-300 hidden group-hover:block"
            >
              <p class="">پرداختی ها با موفقیت انجام شد</p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
              <p class="">
                خونه ها با موفقیت
                wccccccccccccccccccccccccccccccccccccccccخریداری شدند.
              </p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
              <p class="">خونه ها با موفقیت خریداری شدند.</p>
            </div>
          </div>
        </div>
        <a href="#" class="themeToggle hidden md:inline-block">
          <svg class="w-7 h-7 text-gray-300 dark:inline-block hidden">
            <use href="#sun"></use>
          </svg>
          <svg
            class="w-6 h-6 text-light-primary dark:hidden inline-block"
          >
            <use href="#moon"></use>
          </svg>
        </a>
        <a
          href="#"
          class="themeToggle fixed bottom-4 left-4 dark:bg-gray-700 bg-white z-10 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center md:hidden"
        >
          <svg class="w-7 h-7 text-gray-300 dark:inline-block hidden">
            <use href="#sun"></use>
          </svg>
          <svg
            class="w-6 h-6 text-light-primary dark:hidden inline-block"
          >
            <use href="#moon"></use>
          </svg>
        </a>
      </div>
      <a
        href="#"
        class="md:flex hidden gap-x-2 lg:gap-x-4 dark:text-white text-zinc-800 font-semibold items-center"
      >
        <p class="flex items-center gap-x-1.5 order-1 md:-order-1">
          <svg class="w-4 h-4 rotate-90 stroke-1">
            <use href="#chevron-right"></use>
          </svg>
          <span class="admin__name"></span>

        </p>

        <img
          class="w-12 h-12 rounded-full"
          src="../img/teachers/t3.jpg"
          alt=""
        />
      </a>
    </div>
  </div>

    `

  const items = headerNav.querySelectorAll('a')
  items.forEach(item => {
    if (item.href === location.href) {
      item.classList.add('active')
    }
  })



}

function themeColorHandler(e) {
  let stateMode = null

  stateMode = localStorage.getItem('theme')

  if (stateMode === 'dark') {

    e ? (localStorage.theme = 'light') && (document.documentElement.classList.remove('dark')) : (document.documentElement.classList.add('dark'))



  } else {
    e ? (localStorage.theme = 'dark') && (document.documentElement.classList.add('dark')) : (document.documentElement.classList.remove('dark'))

  }
}



function sizeOfMenuHandler(headerNav) {
  if (window.innerWidth < 1024 && !headerNav.classList.contains('mobile')) {
    headerNav.classList.add('mobile')
  } else if (window.innerWidth >= 1024) {
    headerNav.classList.remove('hide')

  }
}


function insertIcons() {
  const icons = $.querySelector('.icons')
  icons.innerHTML = `
  
  <symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="2.25"
  stroke="currentColor"
  id="chevron-right"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M8.25 4.5l7.5 7.5-7.5 7.5"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="magnifying-glass"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="bell"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="sun"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="moon"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
  />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="currency-dollar"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="banknotes"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="shopping-cart"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
  />
</symbol>

<!-- menu-cions -->
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="home"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="book-open"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
  />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="shopping-bag"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
  />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="bars-3"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="document-text"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="users"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
  />
</symbol>
<symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" id="inbox-arrow-down">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="chat-bubble-left-right"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="ticket"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="receipt-percent"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
  />
</symbol>

<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="gift"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="folder"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="envelope"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
  />
</symbol>
<symbol
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  id="power"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
  />
</symbol>

  `
}
let adminInfos = null

async function getAdminInfos() {
  await getTarget("infos/p-admin", "author").then(data => {
    adminInfos = data
  })
  let adminNameElem = $.querySelectorAll('.admin__name')
  adminNameElem.forEach(elem => {
    elem.innerHTML = adminInfos.adminName
  })

}

export { createHeader, adminInfos }