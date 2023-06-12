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
  const [selectedSort, setSelectedSort] = useState(""); // Track selected sort option

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

  //sorting
  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSelectedSort(sortOption);

    let sortedProducts = [...products];
    if (sortOption === "ascending") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "descending") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "createdAtAscending") {
      sortedProducts = sortedProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
    } else if (sortOption === "createdAtDescending") {
      sortedProducts = sortedProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    }

    setProducts(sortedProducts);
  };

  if (!products) {
    return <Loading />;
  }
  return (
    <main className="products">
      <ProductsBanner />
      <div className="sortDropdown">
        <select
          id="sortSelect"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="">Sort products</option>
          <option value="ascending">Price (Low to High)</option>
          <option value="descending">Price (High to Low)</option>
          <option value="createdAtAscending">Date (Old to New)</option>
          <option value="createdAtDescending">Date (New to Old)</option>
        </select>
      </div>
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
