import React, { useContext, useEffect, useState } from "react";
import "./ReviewProduct.scss";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const ReviewProduct = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext)
  const navigate = useNavigate()

  //Makes sure that you are logged in before you can access the review section.
  if(!token) {
    return <Navigate to='/login' />
  }

  const [oneProduct, setOneProduct] = useState();

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

  const [formData, setFormData] = useState({
    productId: id,
    rating: "",
    comment: ""
})
 
const handleChange = (e) => {
  e.preventDefault()

  setFormData({...formData, [e.target.name]: e.target.value })
}

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
      const res = await axios.post('http://localhost:8080/api/comments', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(res.data) {
        navigate('/products/' + id)
      }
    } catch (err) {
      console.log(err)
    }



    setShowMsg(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  //Prevent site to load if there is no product
  if (!oneProduct) {
    return <Loading />;
  }

  return (
    // <!-- MAIN CONTENT  -->
    <main className="reviewProduct">
      <article id="output">
        <img id="productImg" src={oneProduct.imgURL} alt={oneProduct.name} />
        {/* <!-- CONTENT --> */}
        <section id="productInfo">
          <h2>{`${oneProduct.name.toUpperCase()} - ${
            oneProduct.description
          }`}</h2>
        </section>

        {/* Review form */}

        <section className="leaveReview">
          <form onSubmit={postReview}>
            {/* Rating input */}
            <div className="input-group">
              <label className="label" htmlFor="rating">
                How many stars would you like to give this product?
              </label>
              <select
                className="input"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option defaultValue disabled value="">
                  Choose a rating
                </option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
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
                Submitted <i className="fa-solid fa-circle-check"></i>
              </button>
            ) : (
              <button>Submit review</button>
            )}
          </form>
        </section>
      </article>
    </main>
  );
};

export default ReviewProduct;
