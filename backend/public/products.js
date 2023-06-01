const prodWrap = document.querySelector('.prodWrap')
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

const productsArray = []

//GET PRODUCTS

const products = async () => {
    const res = await fetch('./api/products');
    const data = await res.json()

    data.forEach(product => productsArray.push(product))

    buildProducts()
}

products();

const buildProducts = () => {
    //Tömmer hårdkodat innehåll från produkt-diven.
    prodWrap.innerHTML = ''

    productsArray.forEach(product => {
        const prodCard = document.createElement('div')
        prodCard.id = product._id
        prodCard.className = 'prodCard'

        const a = document.createElement('a')
        a.setAttribute('href', './references.html?id=' + prodCard.id)

        const img = document.createElement('img')
        img.setAttribute('src', product.imgURL)
        img.setAttribute('alt', product.name)
        a.append(img)

        const prodBot = document.createElement('div')
        prodBot.className = 'prodBot'

        const name = document.createElement('h2')
        name.innerText = product.name

        const buy = document.createElement('div')
        buy.className = 'buy'

        const price = document.createElement('p')
        price.innerText = product.price + '€'

        const addBtn = document.createElement('button')
        addBtn.className = 'addBtn'
        //Kolla om man kan göra det här på annat sätt
        addBtn.innerHTML = 'ADD <i class="fa-solid fa-cart-shopping"></i>'
        addBtn.addEventListener('click', (e) => {
            e.preventDefault()

            shoppingCart.push({
                id: prodCard.id
            })
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
            likes()
        })

        buy.append(price, addBtn)

        prodBot.append(name, buy)

        prodCard.append(a, prodBot)
        prodWrap.append(prodCard)




    })

}








