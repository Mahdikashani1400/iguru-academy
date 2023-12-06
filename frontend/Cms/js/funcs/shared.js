import { showSwal, showToast } from "./utils.js";


const getCourses = async () => {
    const res = await fetch("http://localhost:4000/v1/courses", {});

    const result = await res.json();
    return result;
};
const getTarget = async (target, state = null) => {
    const res = await fetch(`http://localhost:4000/v1/${target}`, state === "author" ? {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
    } : null);

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
const addMenuItem = async (title, href, parent) => {
    const newItemMenu = { title, href, parent }
    console.log(newItemMenu);
    await fetch("http://localhost:4000/v1/menus/", {
        method: "POST",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItemMenu),
    }).then(async (res) => {
        if (res.status === 201) {

            showToast("آیتم مد نظر با موفقیت اضافه شد.", "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });
}
const removeTarget = async (id, target, targetFa) => {

    await fetch(`http://localhost:4000/v1/${target}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
    }).then((res) => {

        showToast(`${targetFa} مد نظر با موفقیت حذف شد.`, "success");

        return res.json();
    });

}
const getUsersInfo = async () => {
    const res = await fetch("http://localhost:4000/v1/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
    })
    const result = await res.json();
    return result;
};
const newUserFetch = async (username, email, password, confirmPassword, name, phone) => {
    const newUser = { username, email, password, confirmPassword, name, phone }
    console.log(newUser);
    await fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then(async (res) => {
        if (res.status === 201) {

            showToast("کاربر مد نظر با موفقیت اضافه شد.", "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });

}

const banUser = async (id, body) => {

    await fetch(`http://localhost:4000/v1/users/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body
    }).then((res) => {

        showToast("کاربر مد نظر با موفقیت بن شد.", "success");

        return res.json();
    });

}

const editUserInfo = async (id, name, username, email, password, phone) => {
    const newInfo = { username, email, password, name, phone }
    console.log(newInfo);
    await fetch(`http://localhost:4000/v1/users/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
    }).then(async (res) => {
        console.log(res);
        if (res.status === 200) {

            showToast("اطلاعات کاربر مورد نظر با موفقیت ویرایش شد.", "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });

}


const getDiscounts = async () => {
    const res = await fetch("http://localhost:4000/v1/offs", {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        }
    },);

    const result = await res.json();
    return result;
}

const addOff = async (code, percent, course, max) => {
    const newDiscount = { code, percent, course, max }
    await fetch("http://localhost:4000/v1/offs/", {
        method: "POST",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscount),
    }).then(async (res) => {
        if (res.status === 201) {

            showToast("کد تخفیف مد نظر با موفقیت اضافه شد.", "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات کد خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });
}
const addCategory = async (title, name) => {
    const newCategory = { title, name }
    await fetch("http://localhost:4000/v1/category", {
        method: "POST",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
    }).then(async (res) => {
        if (res.status === 201) {

            showToast("دسته بندی مد نظر با موفقیت اضافه شد.", "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });
}
const changePriceNumberToFa = (priceNumber) => {
    return priceNumber
        ? Number(priceNumber).toLocaleString("fa-IR") + " تومان"
        : "رایگان";
};
export {
    getTarget,
    getCourses,
    getArticles,
    getMenus,
    getCategoryOfCourses,
    changePriceNumberToFa,
    addMenuItem,
    removeTarget,
    getUsersInfo,
    newUserFetch,

    banUser,
    editUserInfo,
    getDiscounts,
    addOff,
    addCategory
}