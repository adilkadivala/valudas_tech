import React from "react";
import "../../assets/css/public/Hero.css";

function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero_page">
          <span id="empowering">Empowering Your Success, Seamlessly</span>
          <h1>
            Discover <span>Valudas Tech Park</span>: Your Digital Partner
          </h1>
          <p>
            Embark on your digital journey with Valudas Tech Park. We're here to
            simplify and amplify your online presence, offering tailored
            solutions that propel your success. Ready to get started? Simply
            fill out the form below for a free quote.
          </p>
          <button>Get Your Free Quote</button>
        </div>

        <div className="hero_second">
          <div className="left">
            <i class="fa-solid fa-angle-left"></i>
          </div>

          <div className="hero_end">
            <div id="awc">
              <img src={require("../../assets/images/awc.png")} alt="awc" />
            </div>
            <div id="forolly">
              <img
                src={require("../../assets/images/forolly 1.png")}
                alt="forlly"
              />
            </div>
            <div id="mumez">
              <img
                src={require("../../assets/images/mumezshop.png")}
                alt="mumez"
              />
            </div>
            <div id="nandolia">
              <img
                src={require("../../assets/images/Big 1.png")}
                alt="nandolia"
              />
            </div>
            <div id="micro">
              <img
                src={require("../../assets/images/microface.png")}
                alt="micro"
              />
            </div>
          </div>

          <div className="right">
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
