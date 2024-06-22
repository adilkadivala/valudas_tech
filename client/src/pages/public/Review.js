import React, { useState, useEffect } from "react";
import "../../assets/css/public/Review.css";
import star from "../../assets/images/star.png";

function Review() {
  const reviewSlider = [
    {
      text: "I've worked with Valuda's on a number of project and could not recommend them enough. Extremely professional and pleasant staff who always deliver beyond my expectations.",
      name: "Shradha Gaikwad",
    },
    {
      text: "This is really best company as well. Great communication - timely delivered. I am using his service for all my opencart issue. Thank you once again",
      name: "KD Hamim",
    },
    {
      text: "One of the best services i had ever received. my first and last stop to get all IT services. Very friendly and trustworthy",
      name: "Muqarab Hussain",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % reviewSlider.length);
  };

  const handlePrevious = () => {
    setActiveSlide(
      (prevIndex) => (prevIndex - 1 + reviewSlider.length) % reviewSlider.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
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
        {reviewSlider
          .slice(
            activeSlide,
            activeSlide +
              (window.innerWidth <= 768
                ? window.innerWidth <= 426
                  ? 1
                  : 2
                : 3)
          )
          .concat(
            activeSlide +
              (window.innerWidth <= 768
                ? window.innerWidth <= 426
                  ? 1
                  : 2
                : 3) >
              reviewSlider.length
              ? reviewSlider.slice(
                  0,
                  (activeSlide +
                    (window.innerWidth <= 768
                      ? window.innerWidth <= 426
                        ? 1
                        : 2
                      : 3)) %
                    reviewSlider.length
                )
              : []
          )
          .map((review, index) => (
            <div className="review_box" key={index}>
              <div className="review_icon">
                <i className="fa-solid fa-quote-left"></i>
                <img src={star} alt="star" />
              </div>
              <p>{review.text}</p>
              <h5>{review.name}</h5>
            </div>
          ))}
      </div>

      <div className="review_box_icon">
        <div className="review_arrow" onClick={handlePrevious}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="line">|</div>
        <div className="review_arrow" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </>
  );
}

export default Review;
