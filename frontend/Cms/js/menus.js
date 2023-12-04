import { createHeader } from "./funcs/header.js"
import { getMenus } from "./funcs/shared.js"

const $ = document;
let menusInfo = null
window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getMenus().then(data => {
        menusInfo = data

    })

    getMenusTable()
})
const menusTable = $.querySelector(".menus__table tbody")
const getMenusTable = () => {
    console.log(menusInfo);
    menusTable.innerHTML = `
    ${menusInfo.map((item, index) => {
        return `
 
        <tr class="">
        <th scope="col" class="">
          <input
            type="checkbox"
            class="rounded-[5px] focus:drop-shadow"
          />
        </th>
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${item.title}</td>
        <td class="px-5 py-5">${item.href.split('.')[0]}</td>
        <td class="px-5 py-5">__</td>

        <td class="px-4 py-5">
          <a href="#" class="edit">ویرایش</a>
        </td>
        <td class="px-4 py-5">
          <a href="#" class="remove">حذف</a>
        </td>
      </tr>

      ${item.submenus.map(sub => {
            return `
    <tr class="">
        <th scope="col" class="">
          <input
            type="checkbox"
            class="rounded-[5px] focus:drop-shadow"
          />
        </th>
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${sub.title}</td>
        <td class="px-5 py-5">${sub.href.split('.')[0]}</td>
        <td class="px-5 py-5">${item.title}</td>

        <td class="px-4 py-5">
          <a href="#" class="edit">ویرایش</a>
        </td>
        <td class="px-4 py-5">
          <a href="#" class="remove">حذف</a>
        </td>
      </tr>
    `
        }).join('')}
  `

    }).join('')}
    
    `
}