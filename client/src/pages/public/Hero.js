import React from "react";
import "../../assets/css/public/Hero.css";
import { useValudasData } from "../../context/Storage";

function Hero() {
  const { slider } = useValudasData();

  // const sliderImgs = [
  //   { img: require("../../assets/images/awc.png") },
  //   { img: require("../../assets/images/forolly 1.png") },
  //   { img: require("../../assets/images/mumezshop.png") },
  //   { img: require("../../assets/images/microface.png") },
  //   { img: require("../../assets/images/awc.png") },
  //   { img: require("../../assets/images/forolly 1.png") },
  //   { img: require("../../assets/images/nandolia.png") },
  // ];

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
            {slider.concat(slider).map((slide, index) => (
              <div className="slide" key={index}>
                <img
                  // src={slide.img}  this is for static
                  src={`/upload/${slide.image}`} //this is for dynamic
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
