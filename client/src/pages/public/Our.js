import React, { useState, useEffect } from "react";
import "../../assets/css/public/Our.css";
import { useValudasData } from "../../context/Storage";

const CustomSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + length) % length);
  };

  if (length <= 1) return <div className="slid">{children}</div>;

  return (
    <div className="slid">
      <div
        className="slick-prev"
        style={{
          display: "block",
          backgroundColor: "darkgray",
          color: "black",
        }}
        onClick={prevSlide}
      />
      <div className="slick-slide">{children[currentIndex]}</div>
      <div
        className="slick-next"
        style={{
          display: "block",
          backgroundColor: "darkgray",
          color: "black",
        }}
        onClick={nextSlide}
      />
    </div>
  );
};

const Our = () => {
  const { portfolio, serviceTechnology } = useValudasData();
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    if (serviceTechnology && serviceTechnology.length > 0) {
      setSelectedServiceId(serviceTechnology[0].service_id);
    }
  }, [serviceTechnology]);

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  const filteredPortfolio = portfolio.filter(
    (port) => port.service_id === selectedServiceId
  );

  return (
    <>
      <div className="our_first_page">
        <div className="empo_pera">
          <span>Transforming Ideas into Reality</span>
        </div>

        <div className="service_header">
          <h1>
            <span>Our Work</span>: Showcasing Excellence
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

      <div className="our_sec_page">
        <div className="portfolio">
          {serviceTechnology &&
            serviceTechnology.map((tech) => (
              <div
                className="port_details"
                key={tech.service_id}
                onClick={() => handleServiceClick(tech.service_id)}
              >
                <details className="custom_details">
                  <summary className="summary">
                    <img
                      src={require("../../assets/images/cmshub.png")}
                      alt="summary"
                    />
                    <p id="cm">{tech.service_name}</p>
                  </summary>
                  <div className="details">
                    <p id="hub_line">
                      {tech.technologies}
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                  </div>
                </details>
              </div>
            ))}
        </div>
        <CustomSlider>
          {filteredPortfolio.map((port) => (
            <div className="proud_page" id="proud2" key={port.id}>
              <div className="proud_img">
                <img src={`/upload/${port.thumbnail}`} alt="summary" />
              </div>
              <div className="weed_details">
                <h5>{port.title}</h5>
                <p>{port.short_description}</p>
              </div>
            </div>
          ))}
        </CustomSlider>
      </div>
    </>
  );
};

export default Our;
