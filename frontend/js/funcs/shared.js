import { getToken } from "./utils.js";

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



const goToCourseDetail = (courseName)=> {
  window.location.href = `explain-course.html?name=${courseName}`;
}

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
};
