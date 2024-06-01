import React from "react";
import "../../assets/css/public/Review.css";
import star from "../../assets/images/star.png";

function Review() {
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
        <div className="review_box" id="fir_page">
          <div className="review_icon">
            <i class="fa-solid fa-quote-left"></i>
            <img src={star} alt="star" />
          </div>
          <p>
            I've worked with Valuda's on a number of project and could not
            recommend them enough. Extremely professional and pleasant staff who
            always deliver beyond my expectations.
          </p>
          <h5>Shradha Gaikwad</h5>
        </div>

        <div className="review_box">
          <div className="review_icon">
            <i class="fa-solid fa-quote-left"></i>
            <img src={star} alt="star" />
          </div>
          <p>
            This is really best company as well. Great communication - timely
            delivered. I am using his service for all my opencart issue. Thank
            you once again
          </p>
          <h5 id="kd">KD Hamim</h5>
        </div>

        <div className="review_box">
          <div className="review_icon">
            <i class="fa-solid fa-quote-left"></i>
            <img src={star} alt="star" />
          </div>
          <p>
            One of the best services i had ever received. my first and last stop
            to get all IT services. Very friendly and trustworthy
          </p>
          <h5 id="Muqarab">Muqarab Hussain</h5>
        </div>
      </div>
    </>
  );
}

export default Review;
