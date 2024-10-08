import { createHeader } from "./funcs/header.js"
import { getTarget, addTargetFormData, removeTarget, changePriceNumberToFa, ckEditorHandler, removeLoader } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"


const $ = document;
let coursesInfo = null
let categoriesInfo = null
let ckEditorBody = null
window.addEventListener("load", async () => {
    createHeader()
    await getTarget("category").then(data => {
        categoriesInfo = data[0] ? data : []
    })

    ckEditorBody = ckEditorHandler()

    cleanAndGetInfo()

})
const coursesTable = $.querySelector(".courses__table tbody")
let counter = null
const getCoursesTable = () => {
    counter = 0
    coursesTable.innerHTML = `
    ${coursesInfo.map((course, index) => {
        if (course.categoryID?.title === 'course') {
            return `
            
            <tr class="" id="${course._id}"
      onclick="courseInfoHandler(event)">   
      <th scope="col" class="px-6 py-3">
      <input
          type="checkbox"
          class="rounded-[5px] focus:drop-shadow"
      />
      </th>
      <th scope="row" class="">${++counter}</th>
      <td class="px-5 py-5">${course?.name}</td>
      <td class="px-5 py-5">${course.categoryID?.name}</td>
      <td class="px-5 py-5">${course.courseAverageScore}</td>
      <td class="px-5 py-5">${course.registers}</td>
      <td class="px-5 py-5">${changePriceNumberToFa(course.price)}</td>
      <td class="px-4 py-5">
      <a href="javascript:void(0)" class="edit">ویرایش</a>
      </td>
      <td class="px-4 py-5">
      <a href="javascript:void(0)" class="remove">حذف</a>
      </td>
      </tr>
  `

        }
    }).join('')}
    
    `
}

const courseCategory = $.getElementById("courseCategory")
const selectCategory = () => {
    courseCategory.innerHTML = `
    ${categoriesInfo.map(cat => {
        return cat.title === "course" ? `
<option value="${cat._id}">${cat.name}</option>
`: ""
    }).join("")}
    `
}

const titleCourse = $.getElementById("title")
const priceCourse = $.getElementById("price")
const fileInputCourse = $.getElementById("file_input")
const destCourse = $.getElementById("dest")
let descCourse = null

const createCourse = async (e) => {
    e.preventDefault()


    await ckEditorBody.then(editor => {
        descCourse = editor.getData()

    })
    const categoryID = courseCategory.value

    const newCourse = new FormData()
    newCourse.append("name", titleCourse.value.trim())
    newCourse.append("description", descCourse.trim())
    newCourse.append("cover", courseCover)
    newCourse.append("shortName", destCourse.value.trim())
    newCourse.append("price", priceCourse.value.trim())
    newCourse.append("status", "start")
    newCourse.append("categoryID", categoryID)


    await addTargetFormData("courses", "دوره", newCourse).then(res => {
        res?.name && cleanAndGetInfo()

    })



}
const addCourseBtn = $.getElementById('addCourseBtn')
addCourseBtn.addEventListener('click', createCourse)

let courseCover = null
fileInputCourse.addEventListener('change', (e) => {
    e.preventDefault()
    courseCover = fileInputCourse.files[0]

})






window.courseInfoHandler = courseInfoHandler
let targetCourseId = null

function courseInfoHandler(e) {
    targetCourseId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف دوره مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetCourseId, "courses", "دوره")
                coursesInfo = [...coursesInfo].filter(course => course._id !== targetCourseId)
                getCoursesTable()

            }
        })

    }
}






async function cleanAndGetInfo() {
    titleCourse.value = ''
    priceCourse.value = ''
    fileInputCourse.value = ''
    destCourse.value = ''
    const loader = $.querySelector('.loader_container')

    await ckEditorBody.then(editor => {
        editor.setData('')

    })
    await getTarget("courses").then(data => {
        coursesInfo = data[0] ? data : []
        removeLoader(loader)
    })
    getCoursesTable()
    selectCategory()

}
