import React, { useState, useEffect } from "react";
import "../../assets/css/public/Our.css";
import { useValudasData } from "../../context/Storage";

const Portfolio = () => {
  const { portfolio, serviceTechnology } = useValudasData();

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (serviceTechnology && serviceTechnology.length > 0) {
      setSelectedServiceId(serviceTechnology[0].service_id);
    }
  }, [serviceTechnology]);

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setSelectedTechnologyId(null);
    setCurrentIndex(0);
  };

  const handleTechnologyClick = (technologyId) => {
    setSelectedTechnologyId(technologyId);
    setCurrentIndex(0);
  };

  const filteredPortfolio = portfolio.filter((port) => {
    if (selectedServiceId !== null && port.service_id !== selectedServiceId) {
      return false;
    }
    if (
      selectedTechnologyId !== null &&
      port.technology_id !== selectedTechnologyId
    ) {
      return false;
    }
    return true;
  });

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % filteredPortfolio.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length
    );
  };

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
                    {tech.technologies.split(", ").map((technology, index) => (
                      <p key={technology} style={{ marginBottom: "10px" }}>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTechnologyClick(
                              parseInt(tech.technology_ids.split(", ")[index])
                            );
                          }}
                          className={
                            selectedTechnologyId ===
                            parseInt(tech.technology_ids.split(", ")[index])
                              ? "selected-technology"
                              : ""
                          }
                        >
                          {technology}
                        </span>
                      </p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
        </div>
        {filteredPortfolio.length > 0 && (
          <div className="slid">
            {filteredPortfolio.length > 1 && (
              <div className="slick-prev" onClick={prevSlide}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            )}
            <div className="slierMain">
              <div
                className="sliderTrack"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 1.5)}%)`,
                }}
              >
                {filteredPortfolio.map((port) => (
                  <div className="sliderContent" key={port.id}>
                    <div className="proud_page" id="proud2">
                      <div className="proud_img">
                        <img src={`/upload/${port.thumbnail}`} alt="summary" />
                      </div>
                      <div className="weed_details">
                        <h5>{port.title}</h5>
                        <p>{port.short_description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {filteredPortfolio.length > 1 && (
              <div className="slick-next" onClick={nextSlide}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
