import React, { useContext, useEffect, useState } from "react";
import "./ReviewProduct.scss";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../contexts/Context";

const ReviewProduct = () => {
  const { id } = useParams();
  const { token } = useContext(Context);
  const navigate = useNavigate();

  //Makes sure that you are logged in before you can access the review section.
  if (!token) {
    return <Navigate to="/login" />;
  }

  const [oneProduct, setOneProduct] = useState();

  const [rating, setRating] = useState("");

  // Function to set the rating
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: selectedRating.toString(),
    }));
  };

  //Loads the selected product to the page
  useEffect(() => {
    axios
      // .get("/api/products/" + id)
      .get("http://localhost:8080/api/products/" + id)
      .then((res) => {
        setOneProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [formData, setFormData] = useState({
    productId: id,
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      rating: rating,
    });
    console.log(formData);
  };

  const [showMsg, setShowMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  //submitHandler
  const postReview = async (e) => {
    e.preventDefault();

    if (formData.rating == "" || formData.comment.length < 4) {
      setShowMsg(true);
      return;
    }

    try {
      const res = await axios.post(
        "/api/comments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        setShowMsg(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/products/" + id);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Prevent site to load if there is no product
  if (!oneProduct) {
    return <Loading />;
  }

  return (
    // <!-- MAIN CONTENT  -->
    <main className="reviewProduct">
      <article className="oneProduct">
        <img src={oneProduct.imgURL} alt={oneProduct.name} />
        {/* <!-- CONTENT --> */}
        <section className="productInfo">
          <h2>{`${oneProduct.name.toUpperCase()} - ${
            oneProduct.description
          }`}</h2>
        </section>

        {/* Review form */}

        <section className="leaveReview">
          <form onSubmit={postReview}>
            {/* Rating input */}
            <div className="input-group">
              {/* <label className="label" htmlFor="rating">
                How many stars would you like to give this product?
              </label> */}
              <h3 className="stars">
                <i
                  className={`fa-regular fa-star ${
                    rating >= 1 ? "fa-solid" : ""
                  }`}
                  onClick={() => handleRating(1)}
                ></i>
                <i
                  className={`fa-regular fa-star ${
                    rating >= 2 ? "fa-solid" : ""
                  }`}
                  onClick={() => handleRating(2)}
                ></i>
                <i
                  className={`fa-regular fa-star ${
                    rating >= 3 ? "fa-solid" : ""
                  }`}
                  onClick={() => handleRating(3)}
                ></i>
                <i
                  className={`fa-regular fa-star ${
                    rating >= 4 ? "fa-solid" : ""
                  }`}
                  onClick={() => handleRating(4)}
                ></i>
                <i
                  className={`fa-regular fa-star ${
                    rating >= 5 ? "fa-solid" : ""
                  }`}
                  onClick={() => handleRating(5)}
                ></i>
              </h3>
            </div>

            <div className="input-group">
              <label className="label" htmlFor="reviewMessage">
                Review:
              </label>
              <textarea
                className="input"
                id="msg"
                name="comment"
                rows="30"
                cols="10"
                onChange={handleChange}
                value={formData.comment}
              ></textarea>
            </div>
            {showMsg ? (
              <div className="chooseRating">
                <p>
                  Please choose a rating and write a review before submitting.
                </p>
              </div>
            ) : (
              <></>
            )}
            {success ? (
              <button>
                SUBMITTED <i className="fa-solid fa-circle-check"></i>
              </button>
            ) : (
              <button>
                SUBMIT REVIEW <i className="fa-solid fa-paper-plane"></i>
              </button>
            )}
          </form>
        </section>
      </article>
    </main>
  );
};

export default ReviewProduct;
