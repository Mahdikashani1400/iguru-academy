import { createHeader } from "./funcs/header.js"
import { getTarget, addTargetFormData, removeTarget, minuteToTimer, timerToNum, removeLoader } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"
const $ = document;
let coursesInfo = null
let sessionsInfo = null

window.addEventListener("load", async () => {
    createHeader()
    await getTarget("courses").then(data => {
        coursesInfo = data[0] ? data.reverse() : []
    })
    cleanAndGetInfo()
})
const sessionsTable = $.querySelector(".sessions__table tbody")
let counter = null
const getSessionsTable = () => {
    counter = 0
    sessionsTable.innerHTML = `
    ${sessionsInfo.map((session, index) => {
        return `
            
            <tr class="" id="${session._id}"
            onclick="sessionInfoHandler(event)">
            <th scope="col" class="">
              <input
                type="checkbox"
                class="rounded-[5px] focus:drop-shadow"
              />
            </th>
            <th scope="row" class="">${++counter}</th>
            <td class="px-5 py-5">${session.title.split("/")[1]}</td>
            <td class="px-5 py-5">${session.title.split("/")[0]}</td>
            <td class="px-5 py-5">${minuteToTimer(session.time)}</td>
            <td class="px-5 py-5">${session.course.name}</td>
            <td class="px-5 py-5">${session.free ? "رایگان" : "غیر رایگان"}</td>

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
}

const coursesSelection = $.getElementById("coursesSelection")
const selectCategory = () => {
    coursesSelection.innerHTML = `
    ${coursesInfo.map(cat => {
        return cat.categoryID.title === "course" ? `
<option value="${cat.shortName}">${cat.name}</option>
`
            : ""
    }).join("")}
    `
}


const titleSession = $.getElementById("title")
const timeSession = $.getElementById("time")
const fileInputSession = $.getElementById("fileInputSession")
const sessionStateContainer = $.querySelectorAll(".session__state input")

const createSession = async (e) => {
    e.preventDefault()
    const courseID = coursesInfo.find(course => {
        return course.shortName === coursesSelection.value
    })?._id
    const sessionState = Array.from(sessionStateContainer).find(input => {
        return input.checked
    }).value
    const newSession = new FormData()
    newSession.append("video", sessionVideo)
    newSession.append("title", titleSession.value.trim())
    newSession.append("time", timerToNum(timeSession.value.trim()))
    newSession.append("free", +sessionState)

    await addTargetFormData(`courses/${courseID}/sessions`, "قسمت", newSession)
    cleanAndGetInfo()

}
const addSessionBtn = $.getElementById('addSessionBtn')
addSessionBtn.addEventListener('click', createSession)

let sessionVideo = null
fileInputSession.addEventListener('change', (e) => {
    e.preventDefault()
    sessionVideo = fileInputSession.files[0]

})





window.sessionInfoHandler = sessionInfoHandler
let targetSessionId = null

function sessionInfoHandler(e) {
    e.preventDefault()
    targetSessionId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف قسمت مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetSessionId, `courses/sessions`, "دوره")
                sessionsInfo = [...sessionsInfo].filter(session => session._id !== targetSessionId)
                getSessionsTable()

            }
        })

    }

}


async function cleanAndGetInfo() {
    const loader = $.querySelector('.loader_container')

    await getTarget("courses/sessions").then(data => {
        sessionsInfo = data[0] ? data.reverse() : []
        removeLoader(loader)
    })
    titleSession.value = ''
    timeSession.value = ''
    fileInputSession.value = ''
    getSessionsTable()
    selectCategory()
}
