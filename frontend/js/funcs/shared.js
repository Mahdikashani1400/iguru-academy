import { getToken, showSwal, showToast } from "./utils.js";

const $ = document;
const getCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/courses", {});

  const result = await res.json();
  return result;
};
const getPopularCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/courses/popular", {});

  const result = await res.json();
  return result;
};
const getArticles = async () => {
  const res = await fetch("http://localhost:4000/v1/articles", {});

  const result = await res.json();
  return result;
};
const getMenus = async () => {
  const res = await fetch("http://localhost:4000/v1/menus", {});

  const result = await res.json();
  return result;
};

const getCategoryOfCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/category");
  const result = await res.json();
  return result;
};

const getCourseDetails = async (courseName) => {
  const res = await fetch(`http://localhost:4000/v1/courses/${courseName}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const result = await res.json();
  return result;
};
const getRelatedCourses = async (courseName) => {
  const res = await fetch(
    `http://localhost:4000/v1/courses/related/${courseName}`
  );
  const result = await res.json();
  return result;
};

let findData = null;
let AllCategoryBox = null;
const searchInData = (
  array,
  prop,
  searchValue,
  showCallBack,
  catBoxCallBack
) => {
  findData = array.filter((data) =>
    data[prop]
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase().trim())
  );
  console.log(findData == 0);
  if (findData == 0) {
  } else {
  }
  AllCategoryBox =
    $.querySelector(".nav-item.all") ||
    $.querySelector(".products__category-items .nav-item.active");
  showCallBack(findData, "همه");
  catBoxCallBack(AllCategoryBox);
};

const showNotFoundAlert = (state, container) => {
  if (state === "show") {
    container.classList.add("not__found-active");
  } else {
    container.classList.remove("not__found-active");
  }
};

const goToCourseDetail = (courseName) => {
  window.location.href = `explain-course.html?name=${courseName}`;
};

let MSGInfo = {};
const submitContactsMSG = async () => {
  const userNameInput = $.getElementById("userName");
  const emailInput = $.getElementById("email");
  const phoneInput = $.getElementById("phone");
  const messageInput = $.getElementById("message");
  MSGInfo = {
    name: userNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    body: messageInput.value.trim(),
  };
  await fetch("http://localhost:4000/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MSGInfo),
  }).then((res) => {
    if (res.status === 201) {
      showSwal(
        "پیغام شما با موفقیت ارسال شد.",
        "success",
        "برگشت به صفحه اصلی",
        () => {
          location.href = "index.html";
        }
      );
    } else {
      showSwal(
        "مشکلی وجود دارد، \nلطفا دوباره امتحان کنید.",
        "error",
        "تصحیح اطلاعات"
      );
    }
  });
};

export {
  getCourses,
  getPopularCourses,
  getArticles,
  getMenus,
  getCategoryOfCourses,
  searchInData,
  showNotFoundAlert,
  getCourseDetails,
  getRelatedCourses,
  goToCourseDetail,
  submitContactsMSG,
};
