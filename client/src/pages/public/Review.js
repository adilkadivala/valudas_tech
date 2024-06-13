import React, { useState, useEffect } from "react";
import "../../assets/css/public/Review.css";
import star from "../../assets/images/star.png";

const reviews = [
  {
    text: "I've worked with Valuda's on a number of project and could not recommend them enough. Extremely professional and pleasant staff who always deliver beyond my expectations.",
    author: "Shradha Gaikwad",
  },
  {
    text: "This is really best company as well. Great communication - timely delivered. I am using his service for all my opencart issue. Thank you once again.",
    author: "KD Hamim",
  },
  {
    text: "One of the best services i had ever received. my first and last stop to get all IT services. Very friendly and trustworthy.",
    author: "Muqarab Hussain",
  },
  // Add more reviews here as needed
];

function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="review_first_page">
        <div className="empo_pera">
          <span>Our Clients Speak, and They Speak Highly</span>
        </div>

        <div className="service_header">
          <h1>
            <span>Great Reviews</span> with Positive Feedback
          </h1>
        </div>

        <div className="service_pera">
          <p>
            Experience the satisfaction of our clients firsthand. With 100% of
            them awarding us Five Star Ratings on Google and every online
            platform, our track record speaks volumes about our commitment to
            excellence.
          </p>
        </div>
      </div>

      <div className="review_page">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="review_box"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div className="review_icon">
              <i className="fa-solid fa-quote-left"></i>
              <img src={star} alt="star" />
            </div>
            <p>{review.text}</p>
            <h5>{review.author}</h5>
          </div>
        ))}
      </div>

      <div className="review_box_icon">
        <div className="review_arrow" onClick={prevReview}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="line">|</div>
        <div className="review_arrow" onClick={nextReview}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </>
  );
}

export default Review;
