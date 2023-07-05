import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../contexts/Context";
import "./Products.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import GalleryProductCard from "../../components/Cards/GalleryProductCard/GalleryProductCard";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import SelectedProduct2 from "../../components/Cards/SelectedProduct2/SelectedProduct2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSortingInitialized, setIsSortingInitialized] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filteredResults = useSelector((state) => state.search);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedSort, setSelectedSort, gender, setGender } = useContext(Context);

  //Fetching all the products and storing them localy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        // const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //If there are no results of the filtering/search, Show error message and otherproducts instead
  useEffect(() => {
    if (filteredResults.length > 0) {
      setFilteredProducts(filteredResults);
    } else {
      const randomProducts = [...products];
      randomProducts.sort(() => Math.random() - 0.5);
      setFilteredProducts(randomProducts);
    }
  }, [filteredResults]);

  //Runs the sorting when selecting an option in the dropdown
  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSelectedSort(sortOption);
  };

  // Sorting products names on date or price, checks for initial value
  useEffect(() => {
    if (isSortingInitialized) {
      let sortedProducts = [...filteredProducts];
      if (selectedSort === "ascending") {
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedSort === "descending") {
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      } else if (selectedSort === "createdAtAscending") {
        sortedProducts = sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
      } else if (selectedSort === "createdAtDescending") {
        sortedProducts = sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      }

      setFilteredProducts(sortedProducts);
    } else {
      setIsSortingInitialized(true);
    }
  }, [selectedSort, filteredProducts.length, isSortingInitialized]);

  //Displaying products based on weather you have pushed Women or Men
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
        <div className="sortDropdown">
          <select
            id="sortSelect"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option disabled value="">
              Sort Products 
            </option>
            <option value="ascending">Price (Low to High)</option>
            <option value="descending">Price (High to Low)</option>
            <option value="createdAtAscending">Date (Old to New)</option>
            <option value="createdAtDescending">Date (New to Old)</option>
          </select>
        </div>
        <button
          className={`editBtn ${!gender ? "active" : ""}`}
          onClick={() => {
            setGender(false);
            setSelectedSort("");
          }}
        >
          Women
        </button>
        <button
          className={`editBtn ${gender ? "active" : ""}`}
          onClick={() => {
            setGender(true);
            setSelectedSort("");
          }}
        >
          Men
        </button>
        <button
          className="editBtn"
        >
          More
        </button>
        <button
          className="editBtn"
        >
          Categories
        </button>
        <button
          className="editBtn"
        >
          Here
        </button>
       
        
      </article>
      {filteredResults === undefined ||
        (filteredResults.length === 0 && (
          <div className="errorMsg">
            <p>
              Could not find any products from your search, but here are some
              things you might like.
            </p>
          </div>
        ))}

      {/* Grid system for products */}
      {isLoading ? (
        <Loading />
      ) : (
        <article className="prodWrap">
          {filteredProducts &&
            filteredProducts
              .map((product) => (
                <GalleryProductCard key={product._id} product={product} />
              ))}
        </article>
      )}
     
    </main>
  );
};

export default Products;
