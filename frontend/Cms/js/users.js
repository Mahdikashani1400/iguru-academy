import { createHeader } from "./funcs/header.js"
import { getUsersInfo, newUserFetch, removeUser, banUser } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js";

const $ = document;
let usersInfo = null
window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getUsersInfo().then(data => {
        usersInfo = data[0] ? data : []
        console.log(usersInfo[usersInfo.length - 1].password);

    })
    getUsersTable()
})

const usersTable = $.querySelector(".users__table tbody")
let numId = 20110

function getUsersTable() {
    usersTable.innerHTML = `
    ${usersInfo.map((user) => {
        return `
            <tr class="" id="${user._id}" onclick="userInfoHandler(event)">
            <th scope="col" class="">
              <input
                type="checkbox"
                class="rounded-[5px] focus:drop-shadow"
              />
            </th>
            <th scope="row" class="">${++numId}</th>
            <td class="px-5 py-5">${user.name}</td>
            <td class="px-5 py-5">${user.username}</td>
            <td class="px-5 py-5">${user.phone}</td>
            <td class="px-5 py-5">${user.email}</td>
            <td class="px-5 py-5">${user.role}</td>
            <td class="px-4 py-5">
              <a href="#" class="edit">ویرایش</a>
            </td>
            <td class="px-4 py-5">
              <a href="#" class="remove">حذف</a>
            </td>
            <td class="px-4 py-5">
              <a href="#" class="ban">بن</a>
            </td>
          </tr>
  `

    }).join('')}
    
    `
}

const firstName = $.getElementById("firstName")
const userName = $.getElementById("userName")
const email = $.getElementById("email")
const password = $.getElementById("password")
const phone = $.getElementById("phone")
async function addNewUser(e) {
    e.preventDefault()

    await newUserFetch(
        userName.value,
        email.value,
        password.value,
        password.value,
        firstName.value,
        phone.value,
    )
    cleanAndGetInfo()
}
const addUserBtn = $.getElementById('addUserBtn')
addUserBtn.addEventListener('click', addNewUser)



async function cleanAndGetInfo() {
    await getUsersInfo().then(data => {
        usersInfo = data[0] ? data : []

    })
    getUsersTable()
    clearInputs()
}
function clearInputs() {
    firstName.value = ''
    userName.value = ''
    email.value = ''
    password.value = ''
    phone.value = ''
}
window.userInfoHandler = userInfoHandler
let targetUserId = null
async function userInfoHandler(e) {
    e.preventDefault()

    targetUserId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف کاربر مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeUser(targetUserId)

                cleanAndGetInfo()
            }
        })

    } else if (e.target.classList.contains('ban')) {
        showSwal('آیا از بن کاربر مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {

                e.target.innerHTML = "بن شده"
                const body = JSON.stringify(usersInfo.find(user => {
                    return user._id === targetUserId
                }))
                await banUser(targetUserId, body)

                cleanAndGetInfo()
            }
        })
    } else if (e.target.classList.contains("edit")) {
        let { value: formValues } = await swal.fire({
            title: "ویرایش کاربر",
            html:
                `<div class="contain-input-swal"><lable>نام کاربری</lable> <input id="swal-input1" class="swal2-input "value=""></div>` +
                `<div class="contain-input-swal"><lable>ایمیل</lable> <input id="swal-input2" type="email" class="swal2-input" value=""></div>` +
                `<div class="contain-input-swal"><lable>رمز ورود</lable> <input id="swal-input3" type="password" class="swal2-input" value=""></div>`,
            preConfirm: () => {
                username = document.getElementById("swal-input1").value;
                email = document.getElementById("swal-input2").value;
                password = document.getElementById("swal-input3").value;
                if (
                    username.trim().length > 3 &&
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) &&
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                ) {
                    hasUser = usersInfo.some((user) => {
                        if (user.id != id) {
                            return user.username === username.trim();
                        }
                    });
                    hasEmail = usersInfo.some((user) => {
                        if (user.id != id) {
                            return user.email === email.trim();
                        }
                    });
                    if (hasUser) {
                        Toast.fire({
                            icon: "warning",
                            text: "نام کاربری تکراری میباشد!",
                            timer: 3000,
                        });
                    } else if (hasEmail) {
                        Toast.fire({
                            icon: "warning",
                            text: "ایمیل تکراری میباشد!",
                            timer: 3000,
                        });
                    }

                    return {
                        id,
                        username: username.trim(),
                        email: email.trim(),
                        password,
                    };
                } else {
                    Swal.showValidationMessage(
                        `لطفا اطلاعات خواسته شده را به درستی وارد کنید.`
                    );
                }
            },
        });
    }
}