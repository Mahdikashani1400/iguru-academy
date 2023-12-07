import { createHeader } from "./funcs/header.js"
import { getTarget, addCourse, changePriceNumberToFa } from "./funcs/shared.js"


const $ = document;
let coursesInfo = null
let categoriesInfo = null
window.addEventListener("load", async () => {
    createHeader()
    await getTarget("courses").then(data => {
        coursesInfo = data[0] ? data.reverse() : []


    })
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data.reverse() : []
    })
    getCoursesTable()
    selectCategory()
})
const coursesTable = $.querySelector(".courses__table tbody")
let numId = 20110
const getCoursesTable = () => {
    coursesTable.innerHTML = `
    ${coursesInfo.map((course, index) => {
        if (course.categoryID?.title === 'course') {
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
      <td class="px-5 py-5">${course.courseAverageScore}</td>
      <td class="px-5 py-5">${course.registers}</td>
      <td class="px-5 py-5">${changePriceNumberToFa(course.price)}</td>
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
$.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from submitting and the page from reloading 
    // Your custom logic here 
});
const courseCategory = $.getElementById("courseCategory")
const selectCategory = () => {
    courseCategory.innerHTML = `
    ${categoriesInfo.map(cat => {
        return cat.title === "course" && `
<option value="${cat.title}">${cat.name}</option>
`
    }).join("")}
    `
}

const titleCourse = $.getElementById("title")
const priceCourse = $.getElementById("price")
const fileInputCourse = $.getElementById("file_input")
const destCourse = $.getElementById("dest")
const descCourse = $.getElementById("descCourse")

const createCourse = async (e) => {
    e.preventDefault()
    const categoryID = categoriesInfo.find(cat => {
        return cat.title === courseCategory.value
    })?._id
    const newCourse = new FormData()
    newCourse.append("name", titleCourse.value.trim())
    newCourse.append("description", descCourse.value.trim())
    newCourse.append("cover", courseCover)
    newCourse.append("shortName", destCourse.value.trim())
    newCourse.append("price", priceCourse.value.trim())
    newCourse.append("status", "start")
    newCourse.append("categoryID", categoryID)

    await addCourse(newCourse)

    cleanAndGetInfo()
}
const addCourseBtn = $.getElementById('addCourseBtn')
addCourseBtn.addEventListener('click', createCourse)

let courseCover = null
fileInputCourse.addEventListener('change', (e) => {
    courseCover = e.target.files[0]
})
async function cleanAndGetInfo() {
    await getTarget("courses").then(data => {
        coursesInfo = data[0] ? data.reverse() : []

    })
    getCoursesTable()
    clearInputs()
}
function clearInputs() {
    titleCourse.value = ''
    priceCourse.value = ''
    destCourse.value = ''
    descCourse.value = ''
}