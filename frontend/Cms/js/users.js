import { createHeader } from "./funcs/header.js"
import { getTarget, addTarget, removeTarget, banUser, UpdateTarget } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js";

const $ = document;
let usersInfo = null
window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getTarget("users", "author").then(data => {
        usersInfo = data[0] ? data.reverse() : []


    })
    getUsersTable()
})

const usersTable = $.querySelector(".users__table tbody")

function getUsersTable() {
    usersTable.innerHTML = `
    ${usersInfo.map((user, index) => {
        return `
            <tr class="" id="${user._id}" onclick="userInfoHandler(event)">
            <th scope="col" class="">
              <input
                type="checkbox"
                class="rounded-[5px] focus:drop-shadow"
              />
            </th>
            <th scope="row" class="">${++index}</th>
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
    const newUser = { username: userName.value, email: email.value, password: password.value, confirmPassword: password.value, name: firstName.value, phone: phone.value }
    await addTarget(
        "auth/register",
        "کاربر",
        newUser
    )
    cleanAndGetInfo()
}
const addUserBtn = $.getElementById('addUserBtn')
addUserBtn.addEventListener('click', addNewUser)



async function cleanAndGetInfo() {
    await getTarget("users", "author").then(data => {
        usersInfo = data[0] ? data.reverse() : []

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
                await removeTarget(targetUserId, "users", "کاربر")

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
        const userTargetInfo = usersInfo.find(user => user._id === targetUserId)
        await swal.fire({
            title: "ویرایش کاربر",
            html:
                `<div class="contain-input-swal"><lable>نام و نام خانوادگی</lable> <input id="swalFirstName" class="swal2-input" value="${userTargetInfo.name}"></div>` +
                `<div class="contain-input-swal"><lable>نام کاربری</lable> <input id="swalUserName" class="swal2-input" value="${userTargetInfo.username}"></div>` +
                `<div class="contain-input-swal"><lable>ایمیل</lable> <input id="swalEmail" type="email" class="swal2-input"  value="${userTargetInfo.email}"></div>` +

                `<div class="contain-input-swal"><lable>رمز عبور جدید</lable> <input id="swalPassword" type="password" class="swal2-input" value=""></div>`
                +
                `<div class="contain-input-swal"><lable>شماره</lable> <input id="swalPhone" class="swal2-input" value="${userTargetInfo.phone}"></div>`,
            confirmButtonText: 'تصحیح اطلاعات',
            showCancelButton: true,
            cancelButtonText: 'لغو',

            preConfirm: async () => {
                const swalFirstNameValue = $.getElementById('swalFirstName').value
                const swalUserNameValue = $.getElementById('swalUserName').value
                const swalEmailValue = $.getElementById('swalEmail').value
                const swalPasswordValue = $.getElementById('swalPassword').value
                const swalPhoneValue = $.getElementById('swalPhone').value
                const UpdateInfo = {
                    username: swalUserNameValue, email: swalEmailValue, password: swalPasswordValue, name: swalFirstNameValue, phone: swalPhoneValue
                }
                await UpdateTarget(
                    "users",
                    targetUserId,
                    "کاربر",
                    UpdateInfo
                )

            }

        });
        cleanAndGetInfo()
    }
}