import { createHeader } from "./funcs/header.js"
import { getTarget, addTargetFormData, removeTarget, changePriceNumberToFa, ckEditorHandler, removeLoader } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"
const $ = document;
let articlesInfo = null
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

const articlesTable = $.querySelector(".articles__table tbody")
const getArticlesTable = () => {
    articlesTable.innerHTML = `
    ${articlesInfo.map((article, index) => {
        return `
        <tr class="" id="${article._id}"
        onclick= "articleInfoHandler(event)">
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${article.title}</td>
        <td class="px-5 py-5">${categoriesInfo.map(cat => {
            if (cat._id == article.categoryID) {
                return cat.name
            }
        }).join('')}</td>
        <td class="px-5 py-5">${article.publish ? "منتشر شده" : "پیش نویس"}</td>
        <td class="px-5 py-5">${article.updatedAt.split("T")[0]}</td>
        <td class="px-5 py-5">${article.creator?.name}</td>
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


const articleCategory = $.getElementById("articleCategory")
const selectCategory = () => {
    articleCategory.innerHTML = `
    ${categoriesInfo.map(cat => {
        return cat.title === "article" ? `
<option value="${cat._id}">${cat.name}</option>
`: ""
    }).join("")}
    `
}

const titleArticle = $.getElementById("title")
const fileInputArticle = $.getElementById("file_input")
const destArticle = $.getElementById("dest")
let descArticle = $.getElementById("descArticle")
let bodyArticle = null

const createArticle = async (e) => {
    e.preventDefault()
    await ckEditorBody.then(editor => {
        bodyArticle = editor.getData()

    })
    const categoryID = articleCategory.value


    const newArticle = new FormData()
    newArticle.append("title", titleArticle.value.trim())
    newArticle.append("description", descArticle.value.trim())
    newArticle.append("body", bodyArticle.trim())
    newArticle.append("cover", articleCover)
    newArticle.append("shortName", destArticle.value.trim())
    newArticle.append("categoryID", categoryID)
    e.target.id === "addArticleBtn" ? await addTargetFormData("articles", "مقاله", newArticle) : await addTargetFormData("articles/draft", "مقاله", newArticle).then(res => {
        res?.title && cleanAndGetInfo()
    })



}
const addArticleBtn = $.getElementById('addArticleBtn')
addArticleBtn.addEventListener('click', createArticle)
const draftArticleBtn = $.getElementById('draftArticleBtn')
draftArticleBtn.addEventListener('click', createArticle)

let articleCover = null
fileInputArticle.addEventListener('change', (e) => {
    e.preventDefault()
    articleCover = fileInputArticle.files[0]

})






window.articleInfoHandler = articleInfoHandler
let targetArticleId = null

function articleInfoHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    targetArticleId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف مقاله مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetArticleId, "articles", "مقاله")
                articlesInfo = [...articlesInfo].filter(article => article._id !== targetArticleId)
                getArticlesTable()
            }
        })

    }
}







async function cleanAndGetInfo() {
    const loader = $.querySelector('.loader_container')
    titleArticle.value = ''
    fileInputArticle.value = ''
    destArticle.value = ''
    descArticle.value = ''
    await ckEditorBody.then(editor => {
        bodyArticle = editor.setData("")
    })

    await getTarget("articles").then(data => {
        articlesInfo = data[0] ? data : []
        removeLoader(loader)
    })
    getArticlesTable()
    selectCategory()

}
