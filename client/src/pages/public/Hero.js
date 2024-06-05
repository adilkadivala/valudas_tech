import React, { useEffect, useState } from "react";
import "../../assets/css/public/Hero.css";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderImgs = [
    {
      img: require("../../assets/images/awc.png"),
    },
    {
      img: require("../../assets/images/forolly 1.png"),
    },
    {
      img: require("../../assets/images/mumezshop.png"),
    },
    {
      img: require("../../assets/images/microface.png"),
    },
    {
      img: require("../../assets/images/awc.png"),
    },
    {
      img: require("../../assets/images/forolly 1.png"),
    },
    {
      img: require("../../assets/images/nandolia.png"),
    },
  ];

  const handleNext = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % sliderImgs.length);
  };

  const handlePrevious = () => {
    setActiveSlide((prevIndex) =>
      prevIndex === 0 ? sliderImgs.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSlidesToDisplay = () => {
    let slides = [];
    for (let i = 0; i < 7; i++) {
      slides.push(sliderImgs[(activeSlide + i) % sliderImgs.length]);
    }
    return slides;
  };

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
        <div className="left">
          <button onClick={handlePrevious}>
            <i className="fas fa-angle-left"></i>
          </button>
        </div>

        <div className="hero_end">
          {getSlidesToDisplay().map((slide, index) => (
            <img
              key={index}
              src={slide.img}
              alt="Testimonial user"
              style={{
                width: "7rem",
                transition: "opacity 0.5s ease",
              }}
            />
          ))}
        </div>

        <div className="right">
          <button onClick={handleNext}>
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
