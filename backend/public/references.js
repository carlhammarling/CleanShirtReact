const id = new URLSearchParams(window.location.search).get('id')
const output = document.querySelector('#output')
const selectForm = document.querySelector('#selectForm') 
const addBtn = document.querySelector('#selectForm button')
const likesQty = document.querySelector('#likesQty')

const likes = () => {
    if(shoppingCart.length < 1) {
        likesQty.classList.add('d-none');
    }
    else {
        likesQty.classList.remove('d-none')
        likesQty.innerText = shoppingCart.length.toString()
    }
}

//Skapar Shoppingcart, hämtar hem om det finns nåt i local storage.
const shoppingCart = []
const getLocalCart = () => {
    const localCart = JSON.parse(localStorage.getItem('shoppingCart'))
    if(!localCart) { 
        return 
    }
    localCart.forEach(item => shoppingCart.push(item))
    likes()
}
getLocalCart()


//Get products
const getOneProduct = async () => {
    const res = await fetch('./api/products/' + id)
    const data = await res.json()

    listProduct(data)
}

getOneProduct()

const listProduct = (data) => {

    const img = document.querySelector('#productImg')
    img.setAttribute('src', data.imgURL)
    
    addBtn.id = data._id

    const productInfo = document.querySelector('#productInfo')
    
    const name = document.createElement('h2')
    name.innerText = `${data.name.toUpperCase()} - ${data.description}`

    const price = document.createElement('span')
    price.className = 'price'
    price.innerText = data.price
   
    //Likes
    const ratingArray = [];
    data.comments.forEach(comment => {
        ratingArray.push(comment.rating)
    })
    const ratingSum = Math.ceil(ratingArray.reduce((total, num) => total + num, 0) / ratingArray.length)
    console.log(ratingSum)

    const solidStars = '<i class="fa-solid fa-star"></i>'.repeat(ratingSum)
    const regularStars = '<i class="fa-regular fa-star"></i>'.repeat(5-ratingSum)
    console.log(ratingArray.length)
    const commentCount = ratingArray.length
    const stars = document.createElement('h3')
    stars.innerHTML = solidStars + regularStars + ` (Out of ${commentCount} reviews)`


    productInfo.append(name, stars)

    //Build reviews

    data.comments.forEach(comment => {
        const reviewList = document.querySelector('#reviewList')

        const review = document.createElement('div')
        review.className = 'review'

        const rating = comment.rating;
        const solidStars = '<i class="fa-solid fa-star"></i>'.repeat(rating)
        const regularStars = '<i class="fa-regular fa-star"></i>'.repeat(5-rating)
        const userName = document.createElement('h4')
        userName.innerHTML = `${comment.userId.firstName} ${comment.userId.lastName} ${solidStars}${regularStars}`

        const reviewText = document.createElement('p')
        reviewText.innerText = comment.comment


        review.append(userName, reviewText)
        reviewList.append(review)
    })
}



selectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const size = document.querySelector('#size')

    if(size.value === "") {
        return
    }

    shoppingCart.push({
        id: addBtn.id,
        size: size.value
    })
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    likes()
})





