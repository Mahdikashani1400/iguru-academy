import { createHeader } from "./funcs/header.js"
import { getTarget, addTargetFormData, removeTarget, changePriceNumberToFa, ckEditorHandler, removeLoader } from "./funcs/shared.js"
import { showSwal } from "./funcs/utils.js"


const $ = document;
let productsInfo = null
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
const productsTable = $.querySelector(".products__table tbody")
let counter = null
const getProductsTable = () => {
    counter = 0

    productsTable.innerHTML = `
    ${productsInfo.map((product, index) => {
        if (product.categoryID.title === 'product') {
            return `
  
      <tr class="" id="${product._id}"
      onclick="productInfoHandler(event)">   
      <th scope="col" class="px-6 py-3">
      <input
          type="checkbox"
          class="rounded-[5px] focus:drop-shadow"
      />
      </th>
      <th scope="row" class="">${++counter}</th>
      <td class="px-5 py-5">${product.name}</td>
      <td class="px-5 py-5">${product.categoryID.name}</td>
      <td class="px-5 py-5">${product.courseAverageScore}</td>
      <td class="px-5 py-5">${product.registers}</td>
      <td class="px-5 py-5">${changePriceNumberToFa(product.price)}</td>
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


const productCategory = $.getElementById("productCategory")
const selectCategory = () => {
    productCategory.innerHTML = `
    ${categoriesInfo.map(cat => {
        return cat.title === "product" && `
<option value="${cat._id}">${cat.name}</option>
`
    }).join("")}
    `
}
const titleProduct = $.getElementById("title")
const priceProduct = $.getElementById("price")
const fileInputProduct = $.getElementById("file_input")
const destProduct = $.getElementById("dest")
let descProduct = $.getElementById("descProduct")

const createProduct = async (e) => {
    e.preventDefault()

    await ckEditorBody.then(editor => {

        descProduct = editor.getData()
    })
    const categoryID = productCategory.value

    const newProduct = new FormData()
    newProduct.append("name", titleProduct.value.trim())
    newProduct.append("description", descProduct.trim())
    newProduct.append("cover", productCover)
    newProduct.append("shortName", destProduct.value.trim())
    newProduct.append("price", priceProduct.value.trim())
    newProduct.append("status", "start")
    newProduct.append("categoryID", categoryID)
    await addTargetFormData("courses", "محصول", newProduct).then(res => {
        res?.name && cleanAndGetInfo()

    })



}
const addProductBtn = $.getElementById('addProductBtn')
addProductBtn.addEventListener('click', createProduct)

let productCover = null
fileInputProduct.addEventListener('change', (e) => {
    productCover = fileInputProduct.files[0]

})





window.productInfoHandler = productInfoHandler
let targetProductId = null

function productInfoHandler(e) {
    e.preventDefault()
    targetProductId = e.currentTarget.id
    if (e.target.classList.contains('remove')) {
        showSwal('آیا از حذف محصول مورد نظر اطمینان دارید؟', "error", ["بله", "خیر"], async (res) => {
            if (res.isConfirmed) {
                await removeTarget(targetProductId, "courses", "محصول")
                productsInfo = [...productsInfo].filter(product => product._id !== targetProductId)
                getProductsTable()

            }
        })

    }
}







async function cleanAndGetInfo() {
    titleProduct.value = ''
    priceProduct.value = ''
    fileInputProduct.value = ''
    destProduct.value = ''
    const loader = $.querySelector('.loader_container')

    await ckEditorBody.then(editor => {
        editor.setData('')

    })

    await getTarget("courses").then(data => {
        productsInfo = data[0] ? data : []
        removeLoader(loader)
    })
    getProductsTable()
    selectCategory()
}
