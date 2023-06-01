import React from 'react'
import './GalleryProductCard.scss'
import { Link } from 'react-router-dom'

const GalleryProductCard = ({ product }) => {
  return (
    <div className="prodCard">
          <Link to={`/products/${product._id}`}>
            <img
            //   src="./styles/images/pexels-spencer-selover-428311.jpg"
              src={product.imgURL}
              alt="Clean blue."
            />
          </Link>
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