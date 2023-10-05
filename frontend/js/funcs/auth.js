// import { reviewformInputs } from "../login-form.js";
import { showSwal, showToast, setToken, getToken } from "./utils.js";
const $ = document;
let newUserInfo = null;
const successRegister = (result) => {
  if (result.isConfirmed) {
    reviewformInputs("login", newUserInfo.username, newUserInfo.password);
  }
};
const successLogin = (result) => {
  console.log(result);
  if (result.isDismissed) {
    location.href = "index.html";
  }
};

const register = (e) => {
  e.preventDefault();
  const email = $.getElementById("email");
  const username = $.getElementById("username");
  const password = $.getElementById("password");
  const confirmPassword = $.getElementById("confirmPassword");

  newUserInfo = {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    confirmPassword: confirmPassword.value.trim(),
    name: "مجمد مهدی",
    phone: "09123456789",
  };
  fetch("http://localhost:4000/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  }).then((res) => {
    if (res.status === 201) {
      showSwal(
        "ثبت نام شما با موفقیت انجام شد.",
        "success",
        "ورود به پنل کاربری",
        successRegister
      );
    } else if (res.status === 409) {
      showSwal(
        "نام کاربری یا ایمیل شما تکراری میباشد.",
        "error",
        "تصحیح اطلاعات"
      );
    } else if (res.status === 400) {
      showSwal(
        "لطفا اطلاعات خود را به طور کامل وارد کنید.",
        "error",
        "تکمیل اطلاعات"
      );
    }
    return res.json();
  });
};
const login = (e) => {
  e.preventDefault();
  const emailUserName = $.getElementById("emailUserName");
  const password = $.getElementById("password");
  const checkUserInfo = {
    identifier: emailUserName.value.trim(),
    password: password.value.trim(),
  };
  fetch("http://localhost:4000/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkUserInfo),
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        showToast("ورود با موفقیت انجام شد.", "success", successLogin);
      } else if (res.status === 401) {
        showSwal(
          "کاربری با این اطلاعات ثبت نام نکرده است.",
          "error",
          "تصحیح اطلاعات"
        );
      } else if (res.status === 400) {
        showSwal(
          "لطفا اطلاعات خود را به طور کامل وارد کنید.",
          "error",
          "تکمیل اطلاعات"
        );
      }
      return res.json();
    })
    .then((result) => {
      result.accessToken ? setToken(result.accessToken) && getUserInfo() : null;
    });
};

const token = getToken()?.token || null;
async function getUserInfo() {
  if (!isLogin()) {
    return 0;
  } else {
    const res = await fetch("http://localhost:4000/v1/auth/me", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
}
function isLogin() {
  return token;
}
export { register, login, getUserInfo, isLogin };
