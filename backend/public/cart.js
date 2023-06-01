const cartList = document.querySelector('#cartList')


//Gets data from localStorage
const localStorageData = localStorage.getItem('shoppingCart')
//Turns it into a JS-array
const shoppingCart = JSON.parse(localStorageData)


let cartArray = []

//GET PRODUCTS
const products = async (id, size) => {
    const res = await fetch('./api/products/' + id);
    const data = await res.json()

    data.size = size;
    quantity = 1
    cartArray.push(data)
    
}

//Väntar på att alla promises ska bli klara
const fillCart = () => {
    const promises = shoppingCart.map((product) => products(product.id, product.size));
    return Promise.all(promises)
  };


const listProducts = () => {
    fillCart()
    .then(() => {
      sumCalculator()

      //Tömmer innehåll
      cartList.innerHTML = ''
        //HÄR BYGGER VI CONTENT
      cartArray.forEach(data => {
        const cartItem = document.createElement('div')
        cartItem.className = 'cartItem'

        const img = document.createElement('img')
        img.setAttribute('src', data.imgURL)
        img.setAttribute('alt', data.name)

        //RIGHT SIDE
        const itemRight = document.createElement('div')
        itemRight.className = 'itemRight'

        const name = document.createElement('h3')
        name.innerText = data.name

        const description = document.createElement('p')
        description.innerText = 'T-SHIRT - ' + data.description

        const price = document.createElement('p')
        price.innerText = 'Price: ' + data.price + '€'

        const size = document.createElement('p')
        size.innerText = 'Size: ' + data.size

        const qty = document.createElement('p')
        qty.innerText = 'Quantity: ' + quantity

        const trash = document.createElement('i')
        trash.className = 'fa-solid fa-trash-can'

        itemRight.append(name, description, price, size, qty)
        cartItem.append(img, itemRight, trash)
        cartList.append(cartItem)
        
      })
    });
  };

listProducts()


const sumCalculator = () => {
    const subTotal = cartArray.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
    document.querySelector('#subTotal').innerText = subTotal + '.00€'
    const deliveryCost = document.querySelector('#deliveryCost')
   //If the order is at least 40€ delivery is free.
   if(subTotal >= 40) {
    deliveryCost.value = 0
    }
   else {
     deliveryCost.value = 5
    }
  deliveryCost.innerText = deliveryCost.value + '.00€'

  document.querySelector('#totalSum').innerText = subTotal + deliveryCost.value + '.00€'
}






