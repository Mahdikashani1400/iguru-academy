import { createHeader } from "./funcs/header.js"
import { getCourses, getCategoryOfCourses } from "./funcs/shared.js"


const $ = document;
let coursesInfo = null
let categoriesInfo = null
window.addEventListener("load", async () => {
    // sizeOfMenuHandler()
    createHeader()
    await getCourses().then(data => {
        coursesInfo = data

    })
    await getCategoryOfCourses().then(data => {
        categoriesInfo = data

    })
    getCoursesTable()
})
const coursesTable = $.querySelector(".courses__table tbody")
let numId = 20110
const getCoursesTable = () => {
    console.log(coursesInfo);
    coursesTable.innerHTML = `
    ${coursesInfo.map((course, index) => {
        if (course.categoryID.title === 'course') {
            return `
  
      <tr class="">   
      <th scope="col" class="px-6 py-3">
      <input
          type="checkbox"
          class="rounded-[5px] focus:drop-shadow"
      />
      </th>
      <th scope="row" class="">${++numId}</th>
      <td class="px-5 py-5">${course.name}</td>
      <td class="px-5 py-5">${course.categoryID.name}</td>
      <td class="px-5 py-5">${course.status === 'start' ? "شروع شده" : ""}</td>
      <td class="px-5 py-5">${course.registers}</td>
      <td class="px-5 py-5">${course.price}</td>
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