import React from 'react'
import './ProductsBanner.scss'
import cleanShirtLogo from "../../../styles/images/cleanShirtLogo.png";


const ProductsBanner = () => {

  return (
    <article className="productsBanner">
        <section className="title">
          <h1 className="light">T-SHIRTS</h1>
        </section>
        <section className="bottom">
          <img
            id="prodBg"
            src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Shirt"
            style={{ width: "100%" }}
          />
          <img
            className="slogan"
            src={cleanShirtLogo}
            alt="CLEAN SHiRT logo"
            style={{ width: "60%" }}
          />
        </section>
      </article>
  )
}

export default ProductsBanner