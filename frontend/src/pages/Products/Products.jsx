import React, { useEffect, useState } from "react";
import "./Products.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import GalleryProductCard from "../../components/Cards/GalleryProductCard/GalleryProductCard";
import axios from 'axios'
import Loading from "../../components/Loading/Loading";

const Products = () => {

  const [products, setProducts] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
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
    return <Loading />
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
