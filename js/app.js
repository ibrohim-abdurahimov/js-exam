const category = document.querySelector(".category__wrapper")
const wrapper = document.querySelector(".product__wrapper")
const btn = document.querySelector(".btn")
const loading = document.querySelector(".loading")
const all = document.querySelector(".category__card all")


const base_url = "https://fakestoreapi.com"

let limit = 4
let offset = 1

async function getData(endpoint, count) {
    const response = await fetch(`${base_url}/${endpoint}?limit=${limit * count}`)
    response
        .json()
        .then(res=> createProduct(res))
        .catch(er => console.log(er))
        .finally(()=> {
            loading.style.display = "none"
        })
    
}
getData("products", offset)

function createProduct(data){
    console.log(data)
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.forEach(product => {
        const card = document.createElement("div")
        card.dataset.id = product.id
        card.className = "product__card"
        card.innerHTML = `
            <img src=${product.image} class="product__card_image" alt="${product.title}">
            
            <h3>${product.title}</h3>
            <div class="product__card_price">
                <strong>${product.price}$</strong>
                <button>Buy</button>
            </div>
        `;
        wrapper.appendChild(card)
    })
}

async function getCategory(endpoint) {
    const response = await fetch(`${base_url}/${endpoint}`)
    response.json().then(res=> createCategory(res))
}
getCategory("products/categories")

let categoryType = "products"
function createCategory(data){
    data.forEach((item)=>{
        const div = document.createElement("p")
        const data = document.createElement("data")
        div.className = "category__card"
        data.innerHTML = item
        data.setAttribute("value", `/category/${item}`)
        data.addEventListener("click", (e)=>{
            categoryType = "products/" + e.target.value
            getData(categoryType,offset)
            div.style.backgroundColor = "#DB4444"
            div.style.border = "none"
            div.style.color = "#fff"
        })
        console.log(data)
        div.appendChild(data)
        category.appendChild(div)
    })
}
btn.addEventListener("click",()=>{
    offset++
    getData(categoryType, offset)
    if(offset >4){
        btn.style.display = "none"
    }

})
wrapper.addEventListener("clic",(event)=>{
    if(event.target.className === "product__card_image"){
        let id  = event.target.closest(".product__card").dataset.id
        open(`/pages/product,html?q=${id}`, "_self")
    }
})