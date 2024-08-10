import React from 'react';
import '../css/starrating.css'; // Import the CSS file for styling

const StarRating = ({ rating }) => {
  const maxRating = 10;
  const fullStars = Math.floor(rating);
  const starPercentage = (rating - fullStars) * 100;

  return (
    <div className="star-rating-container">
      <span className="rating-number">{rating.toFixed(1)}</span>
      <div className="star-rating">
        {Array.from({ length: maxRating }, (_, i) => {
          if (i < fullStars) {
            return <span key={i} className="star full">&#9733;</span>;
          } else if (i === fullStars && starPercentage > 0) {
            return (
              <span key={i} className="star half">
                <span className="star-background">&#9733;</span>
                <span className="star-overlay" style={{ width: `${starPercentage}%` }}>
                  &#9733;
                </span>
              </span>
            );
          } else {
            return <span key={i} className="star empty">&#9733;</span>;
          }
        })}
      </div>
    </div>
  );
};

export default StarRating;
