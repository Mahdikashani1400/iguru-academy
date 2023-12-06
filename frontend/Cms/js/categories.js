import { createHeader } from "./funcs/header.js"
import { getTarget, addCategory, removeTarget } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"
const $ = document;
let categoriesInfo = null

window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data : []

    })
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


    await addCategory(title.value, destination.value).then(res => {
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

    }

}

function clearInputs() {

    title.value = ''
    destination.value = ''
}

async function cleanAndGetInfo() {
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data : []

    })
    getCategoriesTable()
    clearInputs()
}