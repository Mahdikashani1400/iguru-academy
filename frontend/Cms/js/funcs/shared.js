import { getToken, showSwal, showToast } from "./utils.js";

const mainHost = 'https://reverent-khayyam-cd1lhumdm.liara.run'


const getTarget = async (target, state = null) => {
    const res = await fetch(`${mainHost}/v1/${target}`, state === "author" ? {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
    } : null);

    const result = await res.json();
    return result;
};

// await fetch(`${mainHost}/v1/comments/answer/commentId`, {
// const bodyObj = {
// body:"text"
// }
//         method: "POST",
//         headers: {
//             Authorization:  `Bearer {adminToke}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bodyObj),
// })

const addTarget = async (target, targetFa, bodyObj, state = null) => {
    const res = await fetch(`${mainHost}/v1/${target}/`, {
        method: "POST",
        headers: {
            Authorization: state === "author" && `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
    })
    console.log(res);
    if (res.status === 201 || res.status === 200) {

        showToast(`${targetFa} مد نظر با موفقیت اضافه شد.`, "success");

    } else if (res.status === 409) {

        showToast("اطلاعات داده شده تکراری میباشند .", "error");

    } else if (res.status === 400) {

        showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

    }
    return res.json();

}
const addTargetFormData = async (target, targetFa, bodyObj) => {
    const res = await fetch(`${mainHost}/v1/${target}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,

        },
        body: bodyObj,
    })
    if (res.status === 201 || res.status === 200) {

        showToast(`${targetFa} مد نظر با موفقیت اضافه شد.`, "success");

    } else if (res.status === 409) {

        showToast("اطلاعات داده شده تکراری میباشند .", "error");

    } else if (res.status === 400) {

        showToast("لطفا اطلاعات خود را به طور کامل وارد کنید.", "error");

    }
    return res.json();
}





const removeTarget = async (id, target, targetFa) => {
    console.log(id);

    await fetch(`${mainHost}/v1/${target}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
    }).then((res) => {
        showToast(`${targetFa} مد نظر با موفقیت حذف شد.`, "success");

        return res.json();
    });

}



const UpdateTarget = async (target, id, targetFa, bodyObj) => {
    await fetch(`${mainHost}/v1/${target}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
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

    await fetch(`${mainHost}/v1/users/ban/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        body
    }).then((res) => {

        showToast("کاربر مد نظر با موفقیت بن شد.", "success");

        return res.json();
    });

}

const commentState = async (bodyObj, state, stateFa) => {
    await fetch(`${mainHost}/v1/comments/${state}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
    }).then(async (res) => {
        console.log(res);
        if (res.status === 201 || res.status === 200) {

            showToast(`کامنت مد نظر با موفقیت ${stateFa} شد.`, "success");

        }
        return res.json();
    });
}


const changePriceNumberToFa = (priceNumber) => {
    return priceNumber
        ? Number(priceNumber).toLocaleString("fa-IR") + " تومان"
        : "رایگان";
};


const minuteToTimer = (time) => {
    return `${Math.floor(time / 60) > 9
        ? Math.floor(time / 60)
        : `0${Math.floor(time / 60)}`
        }:${Math.floor(time % 60) > 9
            ? Math.floor(time % 60)
            : `0${Math.floor(time % 60)}`
        }`;
};

const timerToNum = (time) => {
    return time.includes(':') ? Number(time.split(":")[0] * 60) + Number(time.split(":")[1]) : time
}

const ckEditorHandler = () => {

    return ClassicEditor
        .create(document.querySelector('#editor'), {


            language: 'fa',

        })
        .catch(error => {
            console.error(error);
        });

}


export {
    getTarget,
    addTarget,
    removeTarget,
    UpdateTarget,
    banUser,
    changePriceNumberToFa,
    addTargetFormData,
    commentState,
    ckEditorHandler,
    minuteToTimer,
    timerToNum
}