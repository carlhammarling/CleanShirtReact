import React, { useEffect, useState } from "react";
import "./productDetails.scss";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OneReview from "../../components/Cards/OneReview/OneReview";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [oneProduct, setOneProduct] = useState();
  const [rating, setRating] = useState();
  const [stars, setStars] = useState([]);
  const [hollowStars, setHollowStars] = useState([]);
  //Loads the selected product to the page
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

  //Calcultating average rating.
  useEffect(() => {
    if (oneProduct && oneProduct.comments) {
      let totRating = 0;
      oneProduct.comments.forEach((comment) => {
        totRating += comment.rating;
      });
      setRating(Math.ceil(totRating / oneProduct.comments.length));
    }
  }, [oneProduct]);

  //Counter for average review
  useEffect(() => {
    const filledStars = [];
    const hollowStars = [];

    for (let i = 0; i < rating; i++) {
      filledStars.push(<i key={i} className="fa-solid fa-star totRating"></i>);
    }

    for (let i = 0; i < 5 - rating; i++) {
      hollowStars.push(<i key={rating + i} className="fa-regular fa-star totRating"></i>);
    }

    setStars([...filledStars, ...hollowStars]);
  }, [rating]);

  const [selectedSize, setSelectedSize] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  //submitHandler
  const addProductToCart = (e) => {
    e.preventDefault();

    if (selectedSize == "") {
      setShowMsg(true);
      return;
    }

    setShowMsg(false);
    dispatch(addToCart({ ...oneProduct, size: selectedSize }));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/products')
    }, 1000);
  };

  //Prevent site to load if there is no product
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
          <h3>{stars} (Out of {oneProduct.comments.length} reviews)</h3>
        </section>

        {/* SIZE */}

        <section id="selectToCart">
          <form id="selectForm" onSubmit={addProductToCart}>
            <div className="input-group">
              <label className="label" htmlFor="size">
                Size:
              </label>
              <select
                className="input"
                name="size"
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
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
            {showMsg ? (
              <div className="chooseSize">
                <p>Please choose a size before adding to cart.</p>
              </div>
            ) : (
              <></>
            )}
            {success ? (
              <button>
                ADDED <i className="fa-solid fa-circle-check"></i>
              </button>
            ) : (
              <button>
                ADD TO CART <i className="fa-solid fa-cart-shopping"></i>
              </button>
            )}
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
