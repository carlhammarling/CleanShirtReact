import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Products.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import GalleryProductCard from "../../components/Cards/GalleryProductCard/GalleryProductCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import SelectedProduct2 from "../../components/Cards/SelectedProduct2/SelectedProduct2";
const Products = () => {


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filteredResults = useSelector((state) => state.search);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("");
  const [gender, setGender] = useState(false);


  //Fetching all the products and storing them localy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);




  //If there are no results of the filtering, Show error message and otherproducts instead
  useEffect(() => {
    if (filteredResults.length > 0) {
      setFilteredProducts(filteredResults);
    } else {
      const randomProducts = [...products];
      randomProducts.sort(() => Math.random() - 0.5);
      setFilteredProducts(randomProducts);
    }
  }, [filteredResults]);



//Sorting products nasem on date or price.
  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSelectedSort(sortOption);

    let sortedProducts = [...filteredProducts];
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

    setFilteredProducts(sortedProducts);
  };


  //Displaying products basen on weather you have pushed Women or Men
  useEffect(() => {
    if (!gender) {
      const womenProducts = products.filter((product) =>
        product.category.includes("Women")
      );
      setFilteredProducts(womenProducts);
    } else {
      const menProducts = products.filter((product) =>
        product.category.includes("Men")
      );
      setFilteredProducts(menProducts);
    }
  }, [gender, products]);

  if (!filteredProducts) {
    return <Loading />;
  }
  return (
    <main className="products">
      <ProductsBanner />
      <article className="categorySelect">
        <button className={`editBtn ${!gender ? 'active' : ''}`} onClick={() => setGender(false)}>Women</button>
        <button className={`editBtn ${gender ? 'active' : ''}`} onClick={() => setGender(true)}>Men</button>
        <div className="editBtn sortDropdown">
          <select
            id="sortSelect"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option disabled value="">Sort</option>
            <option value="ascending">Price (Low to High)</option>
            <option value="descending">Price (High to Low)</option>
            <option value="createdAtAscending">Date (Old to New)</option>
            <option value="createdAtDescending">Date (New to Old)</option>
          </select>
        </div>
      </article>
      {filteredResults === undefined || filteredResults.length === 0 && (
        <div className="errorMsg">
          <p>
            Could not find any products from your search, but here are some
            things you might like.
          </p>
        </div>
     
      )}

      {/* Grid system for products */}
      {isLoading ? (
        <Loading />
      ) : (
        <article className="prodWrap">
          {filteredProducts &&
            filteredProducts
              .slice(0, 6)
              .map((product) => (
                <GalleryProductCard key={product._id} product={product} />
              ))}
        </article>
      )}
      {filteredProducts.length >= 6 ? (
        <SelectedProduct2 gender={gender} setGender={setGender} />
      ): <></>}
      {/* Grid system for products */}
      
        <article className="prodWrap">
          {filteredProducts &&
            filteredProducts
              .slice(6, 12)
              .map((product) => (
                <GalleryProductCard key={product._id} product={product} />
              ))}
        </article>
      
    </main>
  );
};

export default Products;
