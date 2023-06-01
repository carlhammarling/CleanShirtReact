import React, { useEffect, useState } from "react";
import "./productDetails.scss";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";
import OneReview from "../../components/Cards/OneReview/OneReview";

const ProductDetails = () => {
  const { id } = useParams();

  const [oneProduct, setOneProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/" + id)
      .then((res) => {
        setOneProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(oneProduct);
  }, [oneProduct]);


  if (!oneProduct) {
    return <Loading />;
  }

  return (
    // <!-- MAIN CONTENT  -->
    <main className="productDetails">
      <article id="output">
        <img id="productImg" src={oneProduct.imgURL} alt={oneProduct.name} />
        {/* <!-- CONTENT --> */}
        <section id="productInfo">
          <h2>{`${oneProduct.name.toUpperCase()} - ${
            oneProduct.description
          }`}</h2>

          
          <span className="price">{oneProduct.price}.99 €</span>
        </section>

        {/* SIZE */}

        <section id="selectToCart">
          <form id="selectForm">
            <div className="input-group">
              <label className="label" htmlFor="size">
                Category:
              </label>
              <select className="input" name="size" id="size">
                <option defaultValue disabled value="">
                  Choose a size
                </option>
                <option value="XXL">XXL</option>
                <option value="XL">XL</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="XS">XS</option>
              </select>
            </div>
            <button>
              ADD TO CART <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </form>
        </section>

        <section id="reviewList">
          <h1>Reviews </h1>
          {oneProduct &&
            oneProduct.comments.map((comment) => (
              <OneReview key={comment._id} comment={comment} />
            ))}
        </section>
      </article>
    </main>
  );
};

export default ProductDetails;
