import { getModals } from "./modals.js";
import { getHeader, getPageTitle } from "./header.js";
import { editUserInfo } from "./funcs/shared.js";
import { getUserInfo } from "./funcs/auth.js";
import { getPoster } from "./title-page.js";
import { getFooter } from "./footer.js";


let userInfo = null

window.addEventListener("load", async () => {

  await getModals();
  await getHeader();
  let pageTitle = getPageTitle();
  getPoster(pageTitle, "blog_page-bg.jpg");
  await getUserInfo().then(data => {
    userInfo = data
  })
  showUserInfoHandler()
  getFooter();
  console.log(userInfo);

});

const $ = document;
let haveSubset = $.querySelector(".profile__menu .have-subset > a");

const openCloseMenuHandler = (e) => {
  if (window.innerWidth <= 976) {
    e.preventDefault();
    haveSubset.classList.toggle("open");
  } else {
    haveSubset.classList.toggle('active')
  }
};

haveSubset.addEventListener("click", openCloseMenuHandler);



const profileSetting = $.querySelector('.profile__setting')
const profileSettingItems = $.querySelector('.profile__setting__items')

let profileSettingItemsHandler = formChanging()
profileSettingItems.querySelectorAll('a').forEach(item => {
  item.addEventListener('click', profileSettingItemsHandler)
})

function formChanging() {
  let lastForm = null
  let formTarget = null
  return function (e) {
    e.preventDefault()
    if (e.target.dataset.change) {
      profileSettingItems.querySelector('.active').classList.remove('active')
      e.target.classList.add('active')
      lastForm = profileSetting.querySelector('.form-active')
      lastForm.classList.remove('form-active')
      lastForm.classList.add('d-none')
      formTarget = profileSetting.querySelector(`#${e.target.dataset.change}`)
      formTarget.classList.remove('d-none')
      formTarget.classList.add('form-active')
    }

  }

}

const firstName = $.getElementById('firstName')
const userName = $.getElementById('userName')
const phone = $.getElementById('phone')
const email = $.getElementById('email')
function showUserInfoHandler() {

  firstName.value = userInfo.name
  userName.value = userInfo.username
  phone.value = userInfo.phone
  email.value = userInfo.email

}


function editUserInfoHandler(e) {
  e.preventDefault()
  const newInfo = {
    name: firstName.value,
    username: userName.value,
    phone: phone.value,
    email: email.value,
  }
  editUserInfo(userInfo._id, newInfo).then(res => {
    console.log(res);
  })
}

const changeInfoBtn = $.getElementById("changeInfoBtn")
changeInfoBtn.addEventListener('click', editUserInfoHandler)