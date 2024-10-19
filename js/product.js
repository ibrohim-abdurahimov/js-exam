const content = document.querySelector(".content")
const review = document.querySelector(".review")

const base_url = "https://fakestoreapi.com"

async function getData() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("q")
    const response = await fetch(`${base_url}/products/${id}`)
    response
        .json()
        .then(res => createContent(res))
    
}
getData()

function createContent(data){
    console.log(data)
    content.innerHTML = `
        <div>
            <div class="img">
                <img class="main__image" src=${data.images} alt="">
            </div>
            <div class="img__item">
                ${data.images.map(i => `<img class="image__item" src=${i} alt="">`)}
            </div>
            
        </div>
        <div class="text">
            <h1 class="title">${data.title}</h1>
            <h2 class="price">${data.price} USD</h2>
            <p class="desc">${data.description}</p>
            <button class="btn">Buy</button>
            <ul class="info">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quos quisquam, culpa commodi, maxime ex nostrum, nulla asperiores officia omnis illum. Quidem necessitatibus dolores fuga? Iusto pariatur asperiores itaque molestias</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio architecto iure dignissimos aliquid tenetur soluta</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, laboriosam!</li>
            </ul>
        </div>
    `
    data.reviews.forEach(item => {
        const divEl = document.createElement("div")
        divEl.className = "review__item"
        divEl.innerHTML= `
        <h3>${item.comment}</h3>
        <p>${item.reviewerName}</p>
        <div>
            ${'<i class="fa-solid fa-star"></i>'.repeat(item.rating)}
            ${'<i class="fa-regular fa-star"></i>'.repeat(5-item.rating)}
        </div>
    `
    review.appendChild(divEl)
    });
}