import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Products.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import GalleryProductCard from "../../components/Cards/GalleryProductCard/GalleryProductCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const filteredResults = useSelector((state) => state.search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [noResults]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      setProducts(filteredResults);
      setNoResults(false);
    } else {
      setNoResults(true);
    }
  }, [filteredResults]);

  if (!products) {
    return <Loading />;
  }
  return (
    <main className="products">
      <ProductsBanner />
      {noResults && filteredResults ? (
        <div className="errorMsg">
          <p>
            Could not find any products from your search, but here are some
            things you might like.
          </p>
        </div>
      ) : (
        <></>
      )}

      {/* Grid system for products */}
      {isLoading ? (
        <Loading />
      ) : (
        <article className="prodWrap">
          {products &&
            products.map((product) => (
              <GalleryProductCard key={product._id} product={product} />
            ))}
        </article>
      )}
    </main>
  );
};

export default Products;
