const $ = document;
function createHeader() {
  const headerNav = $.querySelector('.header__nav')
  insertHeaderTemplate(headerNav)
  let stateMode = null
  function themeColorHandler(e) {
    stateMode = localStorage.getItem('theme')

    if (stateMode === 'dark') {

      e ? (localStorage.theme = 'light') && (document.documentElement.classList.remove('dark')) : (document.documentElement.classList.add('dark'))



    } else {
      e ? (localStorage.theme = 'dark') && (document.documentElement.classList.add('dark')) : (document.documentElement.classList.remove('dark'))

    }
  }
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
    sizeOfMenuHandler()

  });
  function sizeOfMenuHandler() {
    if (window.innerWidth < 1024 && !headerNav.classList.contains('mobile')) {
      headerNav.classList.add('mobile')
    } else if (window.innerWidth >= 1024) {
      headerNav.classList.remove('hide')

    }
  }
  sizeOfMenuHandler()

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
      class="flex flex-col gap-x-2 dark:text-white text-zinc-800 items-center md:hidden p-0 mb-7 mt-2"
    >
      <p class="flex items-center gap-x-1.5 order-1 md:-order-1">علی</p>

      <img
        class="w-12 h-12 rounded-full"
        src="../img/teachers/t3.jpg"
        alt=""
      />
    </a>
    <a href="#" class="bg-blue-primary/10 text-blue-primary">
      <svg class="w-5 h-5">
        <use href="#home"></use>
      </svg>
      <span>صفحه اصلی</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#book-open"></use>
      </svg>
      <span>دوره ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#shopping-bag"></use>
      </svg>
      <span>محصولات</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#bars-3"></use>
      </svg>
      <span>منو ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#document-text"></use>
      </svg>
      <span>مقاله ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#users"></use>
      </svg>
      <span>کاربران</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#chat-bubble-left-right"></use>
      </svg>
      <span>کامنت ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#ticket"></use>
      </svg>
      <span>تیکت ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#receipt-percent"></use>
      </svg>
      <span>کد های تخفیف</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#gift"></use>
      </svg>
      <span>تخفیف همگانی</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#folder"></use>
      </svg>
      <span>دسته بندی ها</span></a
    ><a href="#"
      ><svg class="w-5 h-5">
        <use href="#envelope"></use>
      </svg>
      <span>پیغام ها</span></a
    ><a href="#" class="text-red-500"
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
          علی شاهینی
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

}

export { createHeader }