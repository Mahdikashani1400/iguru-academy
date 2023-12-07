import { showSwal, showToast } from "./utils.js";



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


const addTarget = async (target, targetFa, bodyObj, state = null) => {
    await fetch(`http://localhost:4000/v1/${target}/`, {
        method: "POST",
        headers: {
            Authorization: state === "author" && `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
    }).then(async (res) => {
        console.log(res);
        if (res.status === 201 || res.status === 200) {

            showToast(`${targetFa} مد نظر با موفقیت اضافه شد.`, "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {

            showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        }
        return res.json();
    });
}
const addCourse = async (bodyObj) => {
    const res = await fetch(`http://localhost:4000/v1/courses/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
        },
        body: bodyObj,
    })
    if (res.ok) {
        // if (res.status === 201 || res.status === 200) {

        //     showToast(`${targetFa} مد نظر با موفقیت اضافه شد.`, "success");

        // } else if (res.status === 409) {

        //     showToast("اطلاعات داده شده تکراری میباشند .", "error");

        // } else if (res.status === 400) {

        //     showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

        // }
    }
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



const UpdateTarget = async (target, id, targetFa, bodyObj) => {
    await fetch(`http://localhost:4000/v1/${target}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTcwMTc1Njg3OCwiZXhwIjoxNzA0MzQ4ODc4fQ.zzRTFi5EQnv4zkPV31Rv-Xy-m2OzSpHDL-gE2QuCqoA`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
    }).then(async (res) => {
        if (res.status === 200 || res.status === 201) {

            showToast(`اطلاعات ${targetFa} مورد نظر با موفقیت ویرایش شد.`, "success");

        } else if (res.status === 409) {

            showToast("اطلاعات داده شده تکراری میباشند .", "error");

        } else if (res.status === 400) {
            console.log(res.status);

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












const changePriceNumberToFa = (priceNumber) => {
    return priceNumber
        ? Number(priceNumber).toLocaleString("fa-IR") + " تومان"
        : "رایگان";
};
export {
    getTarget,
    addTarget,
    removeTarget,
    UpdateTarget,
    banUser,
    changePriceNumberToFa,
    addCourse
}