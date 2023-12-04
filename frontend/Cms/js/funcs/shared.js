
const getCourses = async () => {
    const res = await fetch("http://localhost:4000/v1/courses", {});

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
export {
    getCourses,
    getArticles,
    getMenus,
    getCategoryOfCourses
}