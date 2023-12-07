import { createHeader } from "./funcs/header.js"
import { getTarget, addTarget, removeTarget, UpdateTarget } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"
const $ = document;
let categoriesInfo = null

window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data.reverse() : []

    })
    console.log(categoriesInfo);
    getCategoriesTable()
})

const categoriesTable = $.querySelector(".categories__table tbody")
const getCategoriesTable = () => {
    categoriesTable.innerHTML = `
    ${categoriesInfo.map((category, index) => {
        return `
        <tr class="" id="${category._id}"
        onclick="categoryInfoHandler(event)">
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${category.name}</td>
        <td class="px-5 py-5">${category.title}</td>

        <td class="px-4 py-5">
          <a href="#" class="edit">ویرایش</a>
        </td>
        <td class="px-4 py-5">
          <a href="#" class="remove">حذف</a>
        </td>
      </tr>
        `
    }).join("")}
    `
}

const title = $.getElementById('title')
const destination = $.getElementById('destination')
const createCategory = async (e) => {
    e.preventDefault()

    const newCategory = { title: destination.value, name: title.value }

    await addTarget("category", "دسته بندی", newCategory, "author").then(res => {
    })
    cleanAndGetInfo()

}
const addCategoryBtn = $.getElementById('addCategoryBtn')
addCategoryBtn.addEventListener('click', createCategory)


let targetCategoryId = null
window.categoryInfoHandler = categoryInfoHandler
async function categoryInfoHandler(e) {
    e.preventDefault()

    targetCategoryId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف دسته بندی مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetCategoryId, "category", "دسته بندی")
                cleanAndGetInfo()
            }
        })

    } else if (e.target.classList.contains("edit")) {
        const categoryTargetInfo = categoriesInfo.find(category => category._id === targetCategoryId)
        await swal.fire({
            title: "ویرایش دسته بندی",
            html:
                `<div class="contain-input-swal"><lable>عنوان دسته بندی
                </lable> <input id="swalDestination" class="swal2-input" value="${categoryTargetInfo.name}"></div>` +
                `<div class="contain-input-swal"><lable>مقصد</lable> <input id="swalTitle" class="swal2-input" value="${categoryTargetInfo.title}"></div>`
            ,
            confirmButtonText: 'تصحیح اطلاعات',
            showCancelButton: true,
            cancelButtonText: 'لغو',

            preConfirm: async () => {
                const swalTitle = $.getElementById('swalTitle').value
                const swalDestination = $.getElementById('swalDestination').value

                const UpdateInfo = { title: swalTitle, name: swalDestination }

                await UpdateTarget("category", targetCategoryId, "دسته بندی", UpdateInfo)
            }

        });
        cleanAndGetInfo()
    }

}

function clearInputs() {

    title.value = ''
    destination.value = ''
}

async function cleanAndGetInfo() {
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data.reverse() : []

    })
    getCategoriesTable()
    clearInputs()
}