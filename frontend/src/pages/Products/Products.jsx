import React, { useEffect, useState } from "react";
import "./Products.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import GalleryProductCard from "../../components/Cards/GalleryProductCard/GalleryProductCard";
import axios from 'axios'

const Products = () => {

  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
        // console.log(res.data)
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  if(!products) {
    return <p>Loading...</p>
  }
  return (
    
    <main className="products">
      <ProductsBanner />

      {/* Grid system for products */}
      <article className="prodWrap">
        {
          products && products.map(product => (
            <GalleryProductCard key={product._id} product={product} />
          ))
        }
       
        {/* <GalleryProductCard />
        <GalleryProductCard />
        <GalleryProductCard /> */}

      </article>
    </main>
  );
};

export default Products;
