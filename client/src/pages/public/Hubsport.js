import React from "react";
import "../../assets/css/public/Hubsport.css";
import hubimg from "../../assets/images/hubsport.png";

function Hubsport() {
  return (
    <>
      <div className="hubsport">
        <div className="first_page">
          <span className="empowering_pera">
            Empowering Your Success, Seamlessly
          </span>

          <div className="hub_heding">
            <h1>
              Maximize Your Online Potential with HubSp<span>o</span>t Services
            </h1>
          </div>

          <div className="hub_pera">
            <p>
              Elevate your website's performance with our comprehensive suite of
              Husbpot services. From tailored marketing strategies to seamless
              integration solutions, we empower your online presence for
              success.
            </p>
          </div>

          <div className="hub_button">
            <div className="hub_bt">Know More About Hubspot</div>
            <div className="hub_bt" id="hire">
              Hire HubSpot Developer
            </div>
          </div>
        </div>

        <div className="hub_img_page">
          <img src={hubimg} alt="hub" />
        </div>
      </div>
    </>
  );
}

export default Hubsport;
