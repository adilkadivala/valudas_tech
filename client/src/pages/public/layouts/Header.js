import { useState } from "react";
import "../../../assets/css/public/Header.css";
import valudas from "../../../assets/images/valuda_logo.png";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <div className="nawbar">
        <div className="logo">
          <img src={valudas} alt="brand" />
        </div>

        <div className={`nawbar_pages ${isNavActive ? "active" : ""}`}>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Our Approach</li>
            <li>Our Work</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="toggal_bt" onClick={toggleNav}>
          <div className="toggle">
            <i
              className={`fas ${isNavActive ? "fa-times" : "fa-bars"} menu`}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
