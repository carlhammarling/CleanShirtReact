import React from 'react'
import './GalleryProductCard.scss'

const GalleryProductCard = ({ product }) => {
  return (
    <div className="prodCard">
          <a href="./references.html">
            <img
            //   src="./styles/images/pexels-spencer-selover-428311.jpg"
              src={product.imgURL}
              alt="Clean blue."
            />
          </a>
          <div className="prodBot">
            <h2>CLEAN SHiRT - {product.name}.</h2>
            {/* <h2>{CLEAN SHiRT - Clean blue}.</h2> */}
            <div className="buy">
              <p>{product.price}.99€</p>
              {/* <p>34.99$</p> */}
              <button className="addBtn">
                ADD <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
  )
}

export default GalleryProductCard