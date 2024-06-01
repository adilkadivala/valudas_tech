import React from "react";
import "../../../assets/css/public/Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer_first">
          <div className="footer_first_page">
            <h3>About Us</h3>

            <p>
              Valuda’s Technology Park is an Emerging IT Company In India. We
              Provide Services including Website & Software Development,
              eCommerce Solution, Mobile Application, Web Hosting, Digital
              Marketing, ERP Solutions etc.
            </p>

            <ul className="footer_naw">
              <li id="about">About Us</li>
              <li>Our Services</li>
              <li>Our Approach</li>
              <li>Our Work</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="footer_second_page">
            <h3>Contact Us</h3>

            <ul>
              <li className="footer_contact">
                <p>
                  <span>Address:</span> C 111 - 112, 1st Floor, Orchid Complex,
                  Pirojpura Road, Chhapi Highway, Chhapi, Gujarat INDIA– 385210
                </p>
              </li>
              <li className="footer_contact">
                <p>
                  <span>Inquiry:</span> (+91)  91517 15158
                </p>
              </li>
              <li className="footer_contact">
                <p>
                  {" "}
                  <span>Email:</span> support@valudas.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        <hr id="footer_line" />

        <div className="footer_end">
          <div className="footerend_Page">
            <p>© 2024 Valuda’s Tech Park </p>{" "}
            <p id="space">Terms & Conditions</p> |{" "}
            <p className="sp2">Privacy </p>| <p className="sp2">Cookies</p>
          </div>

          <ul className="footer_icon">
            <li className="footer_icon_box" id="fb">
              <i class="fa-brands fa-facebook-f"></i>
            </li>
            <li className="footer_icon_box">
              <i class="fa-brands fa-instagram"></i>
            </li>
            <li className="footer_icon_box" id="yt">
              <i class="fa-brands fa-youtube"></i>
            </li>
            <li className="footer_icon_box">
              <i class="fa-brands fa-pinterest-p"></i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
