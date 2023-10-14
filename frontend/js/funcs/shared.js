import { showCourses, changeActivityCategoryBox } from "../courses.js";
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

let findCourses = null;
let AllCategoryBox = null;
const searchInCourses = (array, prop, searchValue) => {
  findCourses = array.filter((course) => course[prop].includes(searchValue));
  AllCategoryBox = $.querySelector(".learning__tag-box.all");
  showCourses(findCourses, "همه");
  changeActivityCategoryBox(AllCategoryBox);
};

export {
  getCourses,
  getPopularCourses,
  getArticles,
  getMenus,
  getCategoryOfCourses,
  searchInCourses,
};
