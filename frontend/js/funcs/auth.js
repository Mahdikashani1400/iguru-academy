import { removeLoader } from "./shared.js";
import { showSwal, showToast, setToken, getToken } from "./utils.js";
const $ = document;
const mainHost = 'https://reverent-khayyam-cd1lhumdm.liara.run'

let newUserInfo = null;

const reviewformInputs = (state, username = "", password = "") => {
  const loginForm = $.querySelector(".login__form");

  if (state === "register") {
    loginForm.innerHTML = `





    <div class="container">
    <div
      class="toggle__btns__form d-flex shadow rounded rounded-2 bg-light w-fit-content mx-auto mb-4" onclick="changeStateForm(event)"
    >
      <div class="p toggle__btn-arrive py-2 px-3 rounded-end">
        ورود
      </div>
      <div class="p toggle__btn-register active py-2 px-3 rounded-start">
        ثبت نام
      </div>
    </div>
    <div
      class="form__container shadow bg-white rounded rounded-2 row mx-2 px-md-3 px-2 py-4"
    >
    <div class="h1">ثبت نام</div>
    <form class="">
    <div class="form-group my-4 ">
        <label class="fw-bold" for="lastName"
          >نام و نام خانوادگی *</label
        >
        <input
          type="text"
          class="form-control py-3 my-2"
          id="lastName"
          placeholder="احمد رشیدی"
        />
      </div>
      <div class="form-group my-4 ">
        <label class="fw-bold" for="phone"
          >شماره همراه *</label
        >
        <input
          type="text"
          class="form-control py-3 my-2"
          id="phone"
          placeholder="09123456789"
        />
      </div>
      <div class="form-group my-4 ">
        <label class="fw-bold" for="email"
          >آدرس ایمیل *</label
        >
        <input
          type="email"
          class="form-control py-3 my-2"
          id="email"
          placeholder="پست الکترونیک"
        />
      </div>
      <div class="form-group my-4 ">
        <label class="fw-bold" for="username"
          >نام کاربری *</label
        >
        <input
          type="text"
          class="form-control py-3 my-2"
          id="username"
          placeholder="نام کاربری"
        />
      </div>
      <div class="form-group my-4 ">
        <label class="fw-bold" for="password">کلمه عبور *</label>
        <input
          type="password"
          class="form-control py-3 my-2"
          id="password"
          placeholder="کلمه عبور"
        />
      </div>

      <div class="form-group my-4 ">
        <label class="fw-bold" for="confirmPassword">تایید کلمه عبور *</label>
        <input
          type="password"
          class="form-control py-3 my-2"
          id="confirmPassword"
          placeholder="کلمه عبور"
        />
      </div>
     
      <button
        type="submit"
        class="btn bg-green text-white w-100 py-3 my-3 fw-bold"
        onclick="register(event)"
      >ثبت نام
      </button>
     
    </form>
    </div>
  </div>






    
   
     
        `;
  } else {
    loginForm.innerHTML = ` <div class="container">
    <div
      class="toggle__btns__form d-flex shadow rounded rounded-2 bg-light w-fit-content mx-auto mb-4"
      onclick="changeStateForm(event)"
    >
      <div class="p toggle__btn-arrive active py-2 px-3 rounded-end">
        ورود
      </div>
      <div class="p toggle__btn-register py-2 px-3 rounded-start">
        ثبت نام
      </div>
    </div>
    <div
      class="form__container shadow bg-white rounded rounded-2 row mx-2 px-md-3 px-2 py-4"
    >
      <div class="h1">وارد شدن</div>
      <form class="">
        <div class="form-group my-4 ">
          <label class="fw-bold" for="emailUserName"
            >نام کاربری یا پست الکترونیک *</label
          >
          <input
            type="text"
            class="form-control py-3 my-2"
            id="emailUserName"
            value="${username}"
            placeholder="ایمیل یا نام کاربری"
          />
        </div>
        <div class="form-group my-4 ">
          <label class="fw-bold" for="password">کلمه عبور *</label>
          <input
            type="password"
            class="form-control py-3 my-2"
            id="password"
            value="${password}"
            placeholder="کلمه عبور"
          />
        </div>
        <div class="form-check d-flex align-items-center">
          <input type="checkbox" class="t" id="check" />
          <label class="form-check-label pe-2" for="check"
            >مرا به خاطر بسپار</label
          >
        </div>
        <button
          type="submit"
          class="btn bg-green text-white w-100 py-3 my-3 fw-bold"
          onclick="login(event)"

        >
          وارد شدن
        </button>
        <a href="#" class="text-green"
          >رمز عبور خود را فراموش کرده اید؟</a
        >
      </form>
    </div>
  </div>
 
    `;
  }
};

const successRegister = (result) => {
  if (result.isConfirmed) {
    reviewformInputs("login", newUserInfo.username, newUserInfo.password);
  }
};
const successLogin = async () => {
  let role = null
  await getUserInfo().then(data => {
    role = data.role
  })
  if (role === "USER") {
    window.location.href = "index.html"
  } else {
    window.location.href = "./Cms/index.html"

  }
};

const loader = $.querySelector('.loader_container')

const register = (e) => {
  e.preventDefault();
  const lastName = $.getElementById("lastName");
  const phone = $.getElementById("phone");
  const email = $.getElementById("email");
  const username = $.getElementById("username");
  const password = $.getElementById("password");
  const confirmPassword = $.getElementById("confirmPassword");

  newUserInfo = {
    name: lastName.value.trim(),
    phone: phone.value.trim(),
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    confirmPassword: confirmPassword.value.trim(),

  };

  loader.classList.remove('d-none')
  fetch(`${mainHost}/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  }).then((res) => {
    removeLoader(loader)

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
  loader.classList.remove('d-none')

  fetch(`${mainHost}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkUserInfo),
  })
    .then((res) => {
      removeLoader(loader)
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

async function getUserInfo() {
  const token = getToken();
  if (!token) {
    return 0;
  } else {
    const res = await fetch(`${mainHost}/v1/auth/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
}





export { register, login, getUserInfo, reviewformInputs };
