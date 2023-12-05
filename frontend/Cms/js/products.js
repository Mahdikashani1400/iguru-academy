import { createHeader } from "./funcs/header.js"
import { getCourses, getCategoryOfCourses, changePriceNumberToFa } from "./funcs/shared.js"


const $ = document;
let productsInfo = null
let categoriesInfo = null
window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getCourses().then(data => {
        productsInfo = data

    })
    await getCategoryOfCourses().then(data => {
        categoriesInfo = data

    })
    getProductsTable()
})
const coursesTable = $.querySelector(".products__table tbody")
let numId = 20110
const getProductsTable = () => {
    console.log(productsInfo);
    coursesTable.innerHTML = `
    ${productsInfo.map((product, index) => {
        if (product.categoryID.title === 'product') {
            return `
  
      <tr class="">   
      <th scope="col" class="px-6 py-3">
      <input
          type="checkbox"
          class="rounded-[5px] focus:drop-shadow"
      />
      </th>
      <th scope="row" class="">${++numId}</th>
      <td class="px-5 py-5">${product.name}</td>
      <td class="px-5 py-5">${product.categoryID.name}</td>
      <td class="px-5 py-5">${product.status === 'start' ? "موجود" : ""}</td>
      <td class="px-5 py-5">${product.registers}</td>
      <td class="px-5 py-5">${changePriceNumberToFa(product.price)}</td>
      <td class="px-4 py-5">
      <a href="#" class="edit">ویرایش</a>
      </td>
      <td class="px-4 py-5">
      <a href="#" class="remove">حذف</a>
      </td>
      </tr>
  `

        }
    }).join('')}
    
    `
}