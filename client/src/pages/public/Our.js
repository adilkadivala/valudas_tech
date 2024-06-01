import React, { useEffect } from "react";
import "../../assets/css/public/Our.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

const Our = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  useEffect(() => {
    const detailsElements = document.querySelectorAll("details.custom_details");

    detailsElements.forEach((el) => {
      el.addEventListener("toggle", () => {
        if (el.open) {
          detailsElements.forEach((otherEl) => {
            if (otherEl !== el) {
              otherEl.removeAttribute("open");
            }
          });
        }
      });
    });
  }, []);

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
          <div className="port_details">
            <details className="custom_details">
              <summary className="summary">
                <img
                  src={require("../../assets/images/cmshub.png")}
                  alt="summury"
                />
                <p id="cm">CMS</p>
              </summary>
              <div className="details">
                <p id="hub_line">
                  Hubspot CMS <i className="fa-solid fa-arrow-right"></i>
                </p>
                <p>Wordpress</p>
                <p>Opencart</p>
              </div>
            </details>
          </div>
          <div className="port_details">
            <div className="port_detail">
              <details className="custom_details">
                <summary className="summary">
                  <img
                    src={require("../../assets/images/vs.png")}
                    alt="summury"
                  />
                  <p>Custom Web Development</p>
                </summary>
                <div className="details">
                  <p id="hub_line">
                    Hubspot CMS <i className="fa-solid fa-arrow-right"></i>
                  </p>
                  <p>Wordpress</p>
                  <p>Opencart</p>
                </div>
              </details>
            </div>
          </div>
          <div className="port_details">
            <details className="custom_details">
              <summary className="summary">
                <img
                  src={require("../../assets/images/Vector.png")}
                  alt="summury"
                />
                <p>hubSpot Development</p>
              </summary>
              <div className="details">
                <p id="hub_line">
                  Hubspot CMS <i className="fa-solid fa-arrow-right"></i>
                </p>
                <p>Wordpress</p>
                <p>Opencart</p>
              </div>
            </details>
          </div>
          <div className="port_details">
            <details className="custom_details">
              <summary className="summary">
                <img
                  src={require("../../assets/images/android.png")}
                  alt="summury"
                />
                <p>Mobile Application</p>
              </summary>
              <div className="details">
                <p id="hub_line">
                  Hubspot CMS <i className="fa-solid fa-arrow-right"></i>
                </p>
                <p>Wordpress</p>
                <p>Opencart</p>
              </div>
            </details>
          </div>
        </div>
        <Slider {...settings} className="slid">
          <div className="proud_page" id="proud2">
            <div className="proud_img">
              <img
                src={require("../../assets/images/real.png")}
                alt="summury"
              />
            </div>
            <div className="weed_details">
              <h5>WeedMat</h5>
              <p>
                Insight Experience offers a suite of experiential business
                simulation and leadership development and developing new
                leaders.
              </p>
            </div>
          </div>
          <div className="proud_page_f">
            <div className="proud_img">
              <img
                src={require("../../assets/images/image 79.png")}
                alt="summury"
              />
            </div>
            <div className="proud_details">
              <h5>Proud Punch</h5>
              <p>
                Insight Experience offers a suite of experiential business
                simulation and leadership development and developing new
                leaders.
              </p>
            </div>
          </div>
        </Slider>
      </div>

      <div className="Experience_page">
        <div className="exp_first_Page">
          <div className="empo_pera">
            <span id="proj">
              Experience, Projects, Clients, and a Cup of Coffee
            </span>
          </div>

          <div className="service_header">
            <h1>
              <span id="line">Valudas in Numbers</span>: One Cup at a Time
            </h1>
          </div>

          <div className="service_pera">
            <p>
              At Valudas Tech Park, our journey is defined by five years of
              industry experience, 155+ successful projects, 80 repeated
              clients, and the energy of a good cup of coffee, ensuring
              personalized attention and exceptional service delivery.
            </p>
          </div>
        </div>

        <div className="experience_boxes_Page">
          <div className="experience_box" id="fir_box">
            <span>5+</span>

            <h5>Years Experience</h5>

            <p>
              Leveraging half a decade of industry expertise to deliver
              unparalleled solutions.
            </p>
          </div>

          <div className="experience_box">
            <span>155+</span>

            <h5>Successful Projects</h5>

            <p>
              Our track record speaks for itself, with over 155 successful
              projects completed to date.
            </p>
          </div>

          <div className="experience_box">
            <span>80+</span>

            <h5>Repeated Clients</h5>

            <p>
              Building lasting partnerships with 80 satisfied clients who
              continue to trust us with their projects.
            </p>
          </div>

          <div className="experience_box">
            <span>15+</span>

            <h5>Cups of Coffee</h5>

            <p>
              Our dedicated team, fueled by the energy of a good cup of coffee,
              ensures personalized attention and exceptional service delivery.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Our;
