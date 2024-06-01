import React from "react";
import "../../assets/css/public/Service.css";
import joomla from "../../assets/images/joomla.png";
import mern from "../../assets/images/Mern.png";
function Service() {
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
            <div className="dev_Page">
              <span className="cms_i" id="dev">
                <i class="fa-solid fa-code"></i>
              </span>
              <span className="cms_Pera">
                <p>Your Digital Presence, Perfected</p>
                <h5>CMS development</h5>
              </span>
            </div>

            <div className="dev_Page">
              <span className="cms_i" id="mob">
                <i class="fa-solid fa-mobile"></i>
              </span>
              <span className="cms_Pera">
                <p>Innovative Solutions for Every Industry</p>
                <h5>custom Web Development</h5>
              </span>
            </div>

            <div className="dev_Page">
              <span className="cms_i">
                <i class="fa-solid fa-screwdriver-wrench"></i>
              </span>
              <span className="cms_Pera">
                <p>Crafting Engaging User Experiences</p>
                <h5>Front-end Development</h5>
              </span>
            </div>

            <div className="dev_Page">
              <span className="cms_i">
                <i class="fa-solid fa-screwdriver-wrench"></i>
              </span>
              <span className="cms_Pera">
                <p>Crafting Engaging User Experiences</p>
                <h5>Mobile App Development</h5>
              </span>
            </div>
          </div>

          <div className="cms_devlopment">
            <div className="cms">
              <span>CMS development </span>
              <p>
                Get custom HubSpot themes, landing pages, and more with our
                expert development services. Enhance user experience and drive
                conversions with tailored, responsive designs integrated with
                HubSpot's marketing tools. Transform your digital presence
                efficiently and effectively.
              </p>
            </div>
            <div className="all_language_boxes">
              <div className="language_box">
                <i class="fa-brands fa-node-js"></i>
                <p>Node.js</p>
              </div>
              <div className="language_box" id="laravel">
                <i class="fa-brands fa-laravel"></i>
                <p>Laravel</p>
              </div>
              <div className="language_box" id="wordpress">
                <i class="fa-brands fa-wordpress"></i>
                <p>Wordpress</p>
              </div>
              <div className="language_box">
                <i class="fa-brands fa-shopify"></i>
                <p>Shopify</p>
              </div>{" "}
              <div className="language_box" id="hub_icon">
                <i class="fa-brands fa-hubspot"></i>
                <p>HubSpot</p>
              </div>
              <div className="language_box" id="joomla">
                <img src={joomla} alt="joomal" />
                <p>Joomla</p>
              </div>
              <div className="language_box" id="mern">
                <img src={mern} alt="mern" />
                <p>Mern</p>
              </div>
              <div className="language_box" id="drupal">
                <i class="fa-brands fa-drupal"></i>
                <p>Drupal</p>
              </div>
            </div>
          </div>
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
}

export default Service;
