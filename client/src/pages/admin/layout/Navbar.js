import React, { useState, useEffect } from "react";
import "../../../assets/css/admin/navbar.css";
import { NavLink } from "react-router-dom";
import { Menu, ScanSearch, X } from "lucide-react";

const Navbar = ({ toggleSidebar, toggleDarkMode }) => {
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSearchForm = (e) => {
    e.preventDefault();
    setSearchFormVisible(!isSearchFormVisible);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <>
      <section id="content">
        <nav>
          <Menu onClick={toggleSidebar} />
          <form>
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button
                type="submit"
                className="search-btn"
                onClick={toggleSearchForm}
              >
                {isSearchFormVisible ? <X /> : <ScanSearch />}
              </button>
            </div>
          </form>
          <input
            type="checkbox"
            id="switch-mode"
            hidden
            onChange={toggleDarkMode}
          />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <NavLink to="/dashboard" className="profile">
            <img
              src={require("../../../assets/images/people.png")}
              alt="user"
            />
          </NavLink>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
