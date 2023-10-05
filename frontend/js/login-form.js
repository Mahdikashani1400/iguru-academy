import { register, login, getUserInfo } from "./funcs/auth.js";
const $ = document;
window.addEventListener("load", () => {
  reviewformInputs("register");
});

window.register = register;
window.login = login;

// fetch("http://localhost:4000/v1/users", {
//   method: "GET",
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQzOTQyOWU1MTQ4OTgzNTNlNDIzYSIsImlhdCI6MTY5NjQxNDAxOCwiZXhwIjoxNjk5MDA2MDE4fQ.drfQP3071Hjg2nCZiq93NhyQ4WW8yK2Lb2mlPVGbwZ4",
//   },
// })
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const loginForm = $.querySelector(".login__form");
window.changeStateForm = changeStateForm;
function changeStateForm(e) {
  let state =
    (e.target.classList.contains("toggle__btn-arrive") && "arrive") ||
    "register";
  reviewformInputs(state);
}

function reviewformInputs(state, username = "", password = "") {
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
}

export { reviewformInputs };
