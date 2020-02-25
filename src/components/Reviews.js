import React from "react";
import PropTypes from "prop-types";
import "../styles/review.css";

class Reviews extends React.Component {
  render() {
    return (
      <div className="reviews">
        <h2>
          {`${this.props.reviews.length} `}
          Reviews
        </h2>
        {this.props.reviews.map((review, i) => {
          return (
            <div className="card review" key={i}>
              <div className="content">
                <div className="user">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${review.author.avatar})`
                    }}
                  ></div>
                  <div className="name">
                    <span>{review.author.name}</span>
                    <small>{review.author.location}</small>
                  </div>
                </div>
                <div className="rating">
                  {[...Array(review.rating)].map(star => (
                    <i className="fas fa-star"></i>
                  ))}
                  {[...Array(5 - review.rating)].map(star => (
                    <i className="far fa-star"></i>
                  ))}
                </div>
                <p>{review.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Reviews;
