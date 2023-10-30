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
  const res = await fetch("http://localhost:4000/v1/menus");

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
const goToProductDetail = (productName) => {
  window.location.href = `explain-product.html?name=${productName}`;
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

let infoComment = {};
const sendComment = async (courseShortName, body, score, getAllComments) => {
  infoComment = {
    body,
    courseShortName,
    score,
  };
  console.log(infoComment);
  await fetch(`http://localhost:4000/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoComment),
  }).then((res) => {
    if (res.status === 201) {
      showToast("دیدگاه شما با موفقیت ارسال شد.", "success", () => {});
    } else {
      showToast("مشکلی وجود دارد، \nلطفا دوباره امتحان کنید.", "error");
    }
    getAllComments();
  });
};

let infoCommentAnswer = {};
const answerComment = async (commentID, body, getAllComments) => {
  infoCommentAnswer = {
    body,
  };
  console.log(getToken());
  await fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoCommentAnswer),
  }).then((res) => {
    if (res.status === 201) {
      showToast("دیدگاه شما با موفقیت ارسال شد.", "success", () => {});
    } else {
      showToast("مشکلی وجود دارد، \nلطفا دوباره امتحان کنید.", "error");
    }
    getAllComments();
  });
};

const changeDateToFa = (date) => {
  let dateTarget = new Date(
    Date.UTC(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2])
  );

  return dateTarget.toLocaleDateString("fa-IR");
};

const minuteToTimer = (time) => {
  return `${
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`
  }:${
    Math.floor(time % 60) > 9
      ? Math.floor(time % 60)
      : `0${Math.floor(time % 60)}`
  }`;
};

const changePriceNumberToFa = (priceNumber) => {
  return priceNumber
    ? Number(priceNumber).toLocaleString("fa-IR") + " تومان"
    : "رایگان";
};

const globalSearchHandler = async (searchValue) => {
  const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`);

  const result = await res.json();
  return result;
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
  goToProductDetail,
  submitContactsMSG,
  sendComment,
  changeDateToFa,
  changePriceNumberToFa,
  minuteToTimer,
  answerComment,
  globalSearchHandler,
};
