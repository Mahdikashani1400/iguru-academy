import { createHeader } from "./funcs/header.js"
import { getTarget, addTarget, removeTarget, removeLoader } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"


const $ = document;
let messagesInfo = null

window.addEventListener("load", () => {

    createHeader()
    cleanAndGetInfo()

})

const messagesTable = $.querySelector(".messages__table tbody")
const getMessagesTable = () => {
    messagesTable.innerHTML = `
    ${messagesInfo.map((message, index) => {
        return `
            
            <tr id="${message._id}" onclick="messageInfoHandler(event)">
           
            <th scope="col" class="${message.answer ? "attention" : "no__attention"}">${++index}</th>
            <td scope="col" class="px-5 py-5">${message.name}</td>
            <td scope="col" class="px-5 py-5">${message.email}</td>
            <td scope="col" class="px-5 py-5">${message.phone}</td>
            <td scope="col" class="px-5 py-5">${message.updatedAt.split("T")[0]}</td>
            <td class="px-4 py-5">
            <a href="javascript:void(0)" class="see">مشاهده</a>
          </td>
          <td class="px-4 py-5">
            <a href="javascript:void(0)" class="answer">پاسخ</a>
          </td>
          <td class="px-4 py-5">
            <a href="javascript:void(0)" class="remove">حذف</a>
          </td>
          </tr>
  `

    }).join('')}
    
    `
}

async function cleanAndGetInfo() {
    const loader = $.querySelector('.loader_container')

    await getTarget("contact").then(data => {
        messagesInfo = data[0] ? data.reverse() : []
        removeLoader(loader)
    })
    getMessagesTable()

}


window.messageInfoHandler = messageInfoHandler

let targetMessageId = null
async function messageInfoHandler(e) {
    e.preventDefault()
    targetMessageId = e.currentTarget.id

    const messageTargetInfo = messagesInfo.find(message => message._id === targetMessageId)
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف پیام مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetMessageId, "contact", "پیام")

                cleanAndGetInfo()
            }
        })

    } else if (e.target.classList.contains('answer')) {

        await swal.fire({
            title: "ارسال پاسخ برای پیام",
            html:
                `<div class="contain-input-swal"> <textarea class="swal2-input py-2 scrollbar-customize" name="" id="answerContent" rows="8"></textarea></div>`,
            confirmButtonText: 'ارسال پاسخ',
            showCancelButton: true,
            cancelButtonText: 'لغو',

            preConfirm: async () => {
                const answerContent = $.getElementById('answerContent').value

                const answerInfo = {
                    email: messageTargetInfo.email,
                    answer: answerContent
                }
                await addTarget(
                    `contact/answer`,
                    "پاسخ",
                    answerInfo,
                    "author"
                )

            }

        });
    } else if (e.target.classList.contains('see')) {
        await swal.fire({
            title: "متن پیام",
            html:
                `<div class="contain-input-swal"> <p class="text-justify scrollbar-customize">${messageTargetInfo.body}</p></div>`,
            confirmButtonText: 'حله',
        });
    }
    cleanAndGetInfo()

}