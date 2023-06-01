import React from "react";
import './OneReview.scss'

const OneReview = ({ comment }) => {




  return (
    <div key={comment._id} className="review">
      <h4>
        {`${comment.userId.firstName} ${comment.userId.lastName} `}
        {Array(comment.rating)
          .fill(null)
          .map((_, index) => (
            <i key={index} className="fa-solid fa-star"></i>
          ))}
        {Array(5 - comment.rating)
          .fill(null)
          .map((_, index) => (
            <i key={index} className="fa-regular fa-star"></i>
          ))}
      </h4>
      <p>{comment.comment}</p>
    </div>
  );
};

export default OneReview;
