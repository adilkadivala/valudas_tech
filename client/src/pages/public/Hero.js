import React from "react";
import "../../assets/css/public/Hero.css";

function Hero() {
  const sliderImgs = [
    { img: require("../../assets/images/awc.png") },
    { img: require("../../assets/images/forolly 1.png") },
    { img: require("../../assets/images/mumezshop.png") },
    { img: require("../../assets/images/microface.png") },
    { img: require("../../assets/images/awc.png") },
    { img: require("../../assets/images/forolly 1.png") },
    { img: require("../../assets/images/nandolia.png") },
  ];

  return (
    <div className="hero">
      <div className="hero_page">
        <span id="empowering">Empowering Your Success, Seamlessly</span>
        <h1>
          Discover <span>Valudas Tech Park</span>: Your Digital Partner
        </h1>
        <p>
          Embark on your digital journey with Valudas Tech Park. We're here to
          simplify and amplify your online presence, offering tailored solutions
          that propel your success. Ready to get started? Simply fill out the
          form below for a free quote.
        </p>
        <button>Get Your Free Quote</button>
      </div>

      <div className="hero_second">
        <div className="slider">
          <div className="slide-track">
            {sliderImgs.concat(sliderImgs).map((slide, index) => (
              <div className="slide" key={index}>
                <img
                  src={slide.img}
                  alt="Testimonial user"
                  style={{ width: "50%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
