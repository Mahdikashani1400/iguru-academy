const $ = document
const menuBtn = $.getElementById('menuBtn')
const headerNav = $.querySelector('.header__nav')

menuBtn.addEventListener('click', () => {
    headerNav.classList.toggle('mobile')
})