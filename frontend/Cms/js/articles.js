import { createHeader } from "./funcs/header.js"
import { getArticles, getCategoryOfCourses } from "./funcs/shared.js"

const $ = document;
let articlesInfo = null
let categoriesInfo = null
window.addEventListener("load", async () => {
    createHeader()
    await getArticles().then(data => {
        articlesInfo = data

    })
    await getCategoryOfCourses().then(data => {
        categoriesInfo = data

    })
    getArticlesTable()
})

const articlesTable = $.querySelector(".articles__table tbody")
const getArticlesTable = () => {
    articlesTable.innerHTML = `
    ${articlesInfo.map((article, index) => {
        return `
        <tr class=" ">
        <th scope="row" class="">${++index}</th>
        <td class="px-5 py-5">${article.title}</td>
        <td class="px-5 py-5">${categoriesInfo.map(cat => {
            if (cat._id == article.categoryID) {
                return cat.name
            }
        }).join('')}</td>
        <td class="px-5 py-5">${article.updatedAt.split("T")[0]}</td>
        <td class="px-5 py-5">${article.creator.name}</td>
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
}
