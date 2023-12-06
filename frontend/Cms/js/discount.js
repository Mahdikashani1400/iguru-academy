import { createHeader } from "./funcs/header.js"
import { getDiscounts, getCourses, addOff, removeTarget } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"

const $ = document;
let discountsInfo = null
let coursesInfo = null

window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getDiscounts().then(data => {
        discountsInfo = data[0] ? data.reverse() : []
    })
    await getCourses().then(data => {
        coursesInfo = data[0] ? data.reverse() : []
    })
    cleanAndGetInfo()
})


const discountsTable = $.querySelector(".discounts__table tbody")
function showDiscounts() {
    discountsTable.innerHTML = `
   ${discountsInfo.map((off, index) => {
        return ` <tr class="" id="${off._id}"
        onclick="discountInfoHandler(event)">
<th scope="row" class="">${++index}</th>
<td class="px-5 py-5">${off.code}</td>
<td class="px-5 py-5">${off.creator}</td>
<td class="px-5 py-5">${off.percent}</td>
<td class="px-5 py-5">${off.max}</td>
<td class="px-5 py-5">${off.uses}</td>
<td class="px-5 py-5">${off.updatedAt.split("T")[0]}</td>

<td class="px-4 py-5">
  <a href="#" class="edit">ویرایش</a>
</td>
<td class="px-4 py-5">
  <a href="#" class="remove">حذف</a>
</td>
</tr>`
    }).join("")}
    `
}

const courseSelect = $.getElementById("courseSelect")
function courseSelectHandler() {
    courseSelect.innerHTML = `     <option value="همه دوره ها و محصولات">همه دوره ها و محصولات</option>
    ${coursesInfo.map(info => {
        return `<option value="${info.name}">${info.name} (${info.categoryID.title === 'product' ? "محصول" : "دوره"})</option>`
    })}`


}


const code = $.getElementById('code')
const percent = $.getElementById('percent')
const max = $.getElementById('max')
async function createDiscount(e) {
    e.preventDefault()
    const courseTargetId = coursesInfo.find(item => {
        return item.name === courseSelect.value
    })?._id
    await addOff(code.value, percent.value, courseTargetId, max.value)
    cleanAndGetInfo()
}
const addOffBtn = $.getElementById("addOffBtn")
addOffBtn.addEventListener("click", createDiscount)
function clearInputs() {

    code.value = ''
    percent.value = ''
    max.value = ''
}

async function cleanAndGetInfo() {
    await getDiscounts().then(data => {
        discountsInfo = data[0] ? data.reverse() : []
    })
    courseSelectHandler()
    showDiscounts()
    clearInputs()
}
window.discountInfoHandler = discountInfoHandler
let targetDiscountId = null
async function discountInfoHandler(e) {
    e.preventDefault()
    targetDiscountId = e.currentTarget.id
    if (e.target.classList.contains("remove")) {
        showSwal('آیا از حذف کد تخفیف مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                console.log(targetDiscountId);
                await removeTarget(targetDiscountId, "offs", "کد تخفیف")
                cleanAndGetInfo()
            }
        })
    }
}