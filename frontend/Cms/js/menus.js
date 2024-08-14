import { createHeader } from "./funcs/header.js"
import { getTarget, addTarget, removeTarget, removeLoader } from "./funcs/shared.js"
import { showSwal, showToast } from "./funcs/utils.js";

const $ = document;
let menusInfo = null
window.addEventListener("load", async () => {
  createHeader()
  cleanAndGetInfo()
})
const menusTable = $.querySelector(".menus__table tbody")
let count = null
const getMenusTable = async () => {
  count = 0
  menusTable.innerHTML = `
    ${menusInfo.map((item) => {
    return `
 
        <tr class="" id="${item._id}" onclick="ItemInfoHandler(event)">
        <th scope="col" class="">
          <input
            type="checkbox"
            class="rounded-[5px] focus:drop-shadow"
          />
        </th>
        <th scope="row" class="">${++count}</th>
        <td class="px-5 py-5">${item.title}</td>
        <td class="px-5 py-5">${item.href.split('.')[0]}</td>
        <td class="px-5 py-5">__</td>

        <td class="px-4 py-5">
          <a href="javascript:void(0)" class="edit">ویرایش</a>
        </td>
        <td class="px-4 py-5">
          <a href="javascript:void(0)" class="remove">حذف</a>
        </td>
      </tr>

      ${item.submenus.map((sub) => {
      return `
    <tr class="" id="${item._id}"
    onclick="ItemInfoHandler(event)">
        <th scope="col" class="">
          <input
            type="checkbox"
            class="rounded-[5px] focus:drop-shadow"
          />
        </th>
        <th scope="row" class="">${++count}</th>
        <td class="px-5 py-5">${sub.title}</td>
        <td class="px-5 py-5">${sub.href.split('.')[0]}</td>
        <td class="px-5 py-5">${item.title}</td>

        <td class="px-4 py-5">
          <a href="javascript:void(0)" class="edit">ویرایش</a>
        </td>
        <td class="px-4 py-5">
          <a href="javascript:void(0)" class="remove">حذف</a>
        </td>
      </tr>
    `
    }).join('')}
  `

  }).join('')}
    
    `
}
const itemParent = $.getElementById('itemParent')

const itemParentHandler = () => {
  itemParent.innerHTML = `
  <option value="__" selected>__</option>
  ${menusInfo.map(item => {
    return `<option value="${item.title}">${item.title}</option>`
  })}
  `

}

const title = $.getElementById('title')
const destination = $.getElementById('destination')
const createMenu = async (e) => {
  e.preventDefault()
  showToast("به دلایل امنیتی امکان افزودن آیتمی به منو وجود ندارد .", "error");
}
const addItemBtn = $.getElementById('addItemBtn')
addItemBtn.addEventListener('click', createMenu)


window.ItemInfoHandler = ItemInfoHandler
let targetItemId = null
async function ItemInfoHandler(e) {
  e.preventDefault()

  targetItemId = e.currentTarget.id
  if (e.target.classList.contains('remove')) {
    showToast("به دلایل امنیتی امکان حذف آیتمی از منو وجود ندارد .", "error");
  }

}
function clearInputs() {

  title.value = ''
  destination.value = ''
}

async function cleanAndGetInfo() {
  const loader = $.querySelector('.loader_container')

  await getTarget("menus").then(data => {
    menusInfo = data[0] ? data : []
    removeLoader(loader)
  })
  itemParentHandler()
  getMenusTable()
  clearInputs()
}