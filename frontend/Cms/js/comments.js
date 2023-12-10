import { createHeader } from "./funcs/header.js"
import { getTarget, addTarget, removeTarget, commentState } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"

const $ = document;
let commentsInfo = null

window.addEventListener("load", () => {
    createHeader()
    cleanAndGetInfo()
})

const commentsTable = $.querySelector(".comments__table tbody")
const getCommentsTable = () => {
    commentsTable.innerHTML = `
    ${commentsInfo.map((comment, index) => {
        return `
            
            <tr id="${comment._id}" onclick="commentInfoHandler(event)">
            <th scope="col" class="">
              <input
                type="checkbox"
                class="rounded-[5px] focus:drop-shadow"
              />
            </th>
            <th scope="col" class="${comment.answer ? "attention" : "no__attention"}">${++index}</th>
            <td scope="col" class="px-5 py-5">${comment.creator.name}</td>
            <td scope="col" class="px-5 py-5">${comment.creator.email}</td>
            <td scope="col" class="px-5 py-5">${comment.course}</td>
            <td scope="col" class="px-5 py-5">${comment.updatedAt.split("T")[0]}</td>
            <td class="px-4 py-5">
            <a href="#" class="see">مشاهده</a>
          </td>
          <td class="px-4 py-5">
            <a href="#" class="answer">پاسخ</a>
          </td>
          <td class="px-4 py-5">
            <a href="#" class="accept">تایید</a>
          </td>
          <td class="px-4 py-5">
            <a href="#" class="reject">رد</a>
          </td>
          <td class="px-4 py-5">
            <a href="#" class="remove">حذف</a>
          </td>
          </tr>
  `

    }).join('')}
    
    `
}

async function cleanAndGetInfo() {
    await getTarget("comments").then(data => {
        commentsInfo = data[0] ? data.reverse() : []

    })
    getCommentsTable()

}

window.commentInfoHandler = commentInfoHandler

let targetCommentId = null
async function commentInfoHandler(e) {
    e.preventDefault()
    targetCommentId = e.currentTarget.id

    const commentTargetInfo = commentsInfo.find(comment => comment._id === targetCommentId)
    console.log(commentTargetInfo);
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف کامنت مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetCommentId, "comments", "کامنت")

                cleanAndGetInfo()
            }
        })

    } else if (e.target.classList.contains('answer')) {

        await swal.fire({
            title: "ارسال پاسخ برای کامنت",
            html:
                `<div class="contain-input-swal"> <textarea class="swal2-input py-2 scrollbar-customize" name="" id="answerContent" rows="8"></textarea></div>`,
            confirmButtonText: 'ارسال پاسخ',
            showCancelButton: true,
            cancelButtonText: 'لغو',

            preConfirm: async () => {
                const answerContent = $.getElementById('answerContent').value

                const answerInfo = {
                    body: answerContent
                }
                await addTarget(
                    `comments/answer/${commentTargetInfo._id}`,
                    "پاسخ",
                    answerInfo,
                    "author"
                )

            }

        });
    } else if (e.target.classList.contains('see')) {
        await swal.fire({
            title: "متن کامنت",
            html:
                `<div class="contain-input-swal"> <p class="text-justify scrollbar-customize">${commentTargetInfo.body}</p></div>`,
            confirmButtonText: 'حله',
        });
    } else if (e.target.classList.contains('accept')) {
        console.log({ body: commentTargetInfo.body },
            `accept/${commentTargetInfo._id}`,
            "تایید");
        console.log(await commentState(
            { body: commentTargetInfo.body },
            `accept/${commentTargetInfo._id}`,
            "تایید"
        ));

    } else if (e.target.classList.contains('reject')) {
        await commentState(
            { body: commentTargetInfo.body },
            `reject/${commentTargetInfo._id}`,
            "رد"
        )
    }
    cleanAndGetInfo()
}