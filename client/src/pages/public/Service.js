import React, { useState, useEffect } from "react";
import "../../assets/css/public/Service.css";
import { useValudasData } from "../../context/Storage";

const Service = () => {
  const { serviceTechnology } = useValudasData();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (serviceTechnology && serviceTechnology.length > 0) {
      setSelectedService(serviceTechnology[0]);
    }
  }, [serviceTechnology]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div className="Service">
        <div className="ser_first_page">
          <div className="empo_pera">
            <span>Empowering Growth, Fuelling Innovation</span>
          </div>
          <div className="service_header">
            <h1>
              <span>Services</span>: Transformative Web & Mobile Solutions
            </h1>
          </div>
          <div className="service_pera">
            <p>
              Valuda’s offers premier Web & Mobile development services, turning
              your app visions into realities. We're more than exceptional
              developers; we're strategic partners guiding your business towards
              success.
            </p>
          </div>
        </div>

        <div className="service_sec_page">
          <div className="devlopment_page">
            {serviceTechnology && serviceTechnology.length > 0
              ? serviceTechnology.map((service, index) => (
                  <div
                    className="dev_Page"
                    key={index}
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="cms_i" id="dev">
                      <i className="fa-solid fa-code"></i>
                    </span>
                    <span className="cms_Pera">
                      <p>{service.service_tagline}</p>
                      <h5>{service.service_name}</h5>
                    </span>
                  </div>
                ))
              : "N/A"}
          </div>

          {selectedService && (
            <div className="cms_devlopment">
              <div className="cms">
                <span>{selectedService.service_name} </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedService.service_description,
                  }}
                />
              </div>
              <div className="all_language_boxes">
                {selectedService.technologies.split(", ").map((tech, index) => {
                  const tech_photo = selectedService.tech_photos[index];
                  return (
                    <div className="language_box" key={index}>
                      <img src={`/upload/${tech_photo}`} alt="thumbnail"></img>
                      <p>{tech}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="service_third">
          <div className="third_header">
            <h1>Pioneering Exceptional Digital Experiences!</h1>
            <p>
              We are passionate about delivering world-class digital products
              and ensuring client satisfaction. Are you eager to achieve
              success? If so, let's get started.
            </p>
          </div>
          <div className="lets_bt">
            <button>Let’s Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
