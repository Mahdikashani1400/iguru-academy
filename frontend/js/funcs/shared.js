import { getToken, showSwal, showToast } from "./utils.js";

const $ = document;
const mainHost = 'https://reverent-khayyam-cd1lhumdm.liara.run'
const protocol = 'https'
const editUserInfo = async (userInfo) => {
  console.log(userInfo);
  const res = await fetch(`${mainHost}/v1/users/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",

    },
    body: JSON.stringify(userInfo)
  });

  const result = await res.json();
  console.log(result);
  result.name ? await showToast("اطلاعات شما با موفقیت تغییر پیدا کرد :)", "success", () => { }) : await showToast(result?.message[0].message, "error", () => { })
  return result;
};



const getCourses = async () => {
  const res = await fetch(`${mainHost}/v1/courses`, {});

  const result = await res.json();
  return result;
};
const getPopularCourses = async () => {
  const res = await fetch(`${mainHost}/v1/courses/popular`, {});

  const result = await res.json();
  return result;
};
const getArticles = async () => {
  const res = await fetch(`${mainHost}/v1/articles`, {});

  const result = await res.json();
  return result;
};
const getMenus = async () => {
  const res = await fetch(`${mainHost}/v1/menus`);

  const result = await res.json();
  return result;
};

const getCategoryOfCourses = async () => {
  const res = await fetch(`${mainHost}/v1/category`);
  const result = await res.json();
  return result;
};

const getCourseDetails = async (courseName) => {
  const res = await fetch(`${mainHost}/v1/courses/${courseName}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const result = await res.json();
  return result;
};

const registerUserToCourseTarget = async (courseInfo, discountInfo = null) => {

  const priceBody = { price: (discountInfo ? (calculateDiscount(calculateDiscount(courseInfo.price, courseInfo.discount), discountInfo.percent)).toFixed() : calculateDiscount(courseInfo.price, courseInfo.discount)) }
  const res = await fetch(`${mainHost}/v1/courses/${courseInfo._id}/register`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",

    },
    body: JSON.stringify(priceBody)

  }).then(async res => {
    if (res.status === 200 || res.status === 201) {

      if (courseInfo.categoryID.title === 'course') {
        await showToast("به دوره خودت خوش اومدی :)", "success", () => {
        })

      } else {
        await showToast("محصول مورد نظر با موفقیت خریداری شد :)", "success", () => {
        })
      }
      setTimeout(() => {
        location.reload()
      }, 2000)
    }
  })
  console.log(res);
}
const useDiscountCode = async (code, courseInfo) => {
  const courseBody = { course: courseInfo._id }
  const res = await fetch(`${mainHost}/v1/offs/${code}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",

    },
    body: JSON.stringify(courseBody)
  })

  return res.json()
}
const getRelatedCourses = async (courseName) => {
  const res = await fetch(
    `${mainHost}/v1/courses/related/${courseName}`
  );
  const result = await res.json();
  return result;
};


const getAllOfOrders = async () => {
  const res = await fetch(`${mainHost}/v1/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const result = await res.json();
  return result;
}


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
}

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
  await fetch(`${mainHost}/v1/contact`, {
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
  await fetch(`${mainHost}/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoComment),
  }).then((res) => {
    if (res.status === 201) {
      showToast("دیدگاه شما با موفقیت ارسال شد و پس از تایید منتشر خواهد شد.", "success", () => { });
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
  await fetch(`${mainHost}/v1/comments/answer/${commentID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoCommentAnswer),
  }).then((res) => {
    if (res.status === 201) {
      showToast("دیدگاه شما با موفقیت ارسال شد.", "success", () => { });
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
  return `${Math.floor(time / 60) > 9
    ? Math.floor(time / 60)
    : `0${Math.floor(time / 60)}`
    }:${Math.floor(time % 60) > 9
      ? Math.floor(time % 60)
      : `0${Math.floor(time % 60)}`
    }`;
};

function changePriceNumberToFa(priceNumber) {
  return priceNumber
    ? Number(priceNumber).toLocaleString("fa-IR") + " تومان"
    : "رایگان";
};

function calculateDiscount(price, discount) {
  {
    return price * (100 - discount) / 100
  }
}

const globalSearchHandler = async (searchValue) => {
  const res = await fetch(`${mainHost}/v1/search/${searchValue}`);

  const result = await res.json();
  return result;
};



export {
  mainHost,
  getCourses,
  getPopularCourses,
  getArticles,
  getMenus,
  getCategoryOfCourses,
  searchInData,
  showNotFoundAlert,
  getCourseDetails,
  registerUserToCourseTarget,
  useDiscountCode,
  getRelatedCourses,
  goToCourseDetail,
  goToProductDetail,
  editUserInfo,
  getAllOfOrders,
  submitContactsMSG,
  sendComment,
  changeDateToFa,
  changePriceNumberToFa,
  minuteToTimer,
  calculateDiscount,
  answerComment,
  globalSearchHandler,
};
