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
  AllCategoryBox =
    $.querySelector(".learning__tag-box.all") ||
    $.querySelector(".products__category-items .nav-item.active");
  showCallBack(findData, "همه");
  catBoxCallBack(AllCategoryBox);
};

export {
  getCourses,
  getPopularCourses,
  getArticles,
  getMenus,
  getCategoryOfCourses,
  searchInData,
};
