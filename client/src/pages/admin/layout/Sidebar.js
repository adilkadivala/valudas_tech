import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/admin/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <section id="sidebar" className={isOpen ? "" : "hide"}>
        {isOpen ? (
          <>
            <Link to="/dashboard" className="brand">
              <i className="fa-brands fa-squarespace"></i>
              <span className="text">AdminHub</span>
            </Link>
            <ul className="side-menu top">
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <Link to="/dashboard">
                  <i className="fa-solid fa-layer-group"></i>
                  <span className="text">Dashboard</span>
                </Link>
              </li>
              <li className={location.pathname === "#" ? "active" : ""}>
                <div className="dropdown" onClick={handleDropdownClick}>
                  <Link to="#">
                    <i className="fa-solid fa-folder-open"></i>
                    <span className="text">Pages</span>
                    <i
                      className={
                        dropdownOpen
                          ? "fa-solid fa-chevron-up"
                          : "fa-solid fa-chevron-down"
                      }
                    ></i>
                  </Link>
                  {dropdownOpen && (
                    <div className="dropdown-container">
                      <li
                        className={
                          location.pathname === "/dashboard/users"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/users">
                          <i className="fa-solid fa-users"></i>
                          <span className="text">Users</span>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/dashboard/industries"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/industries">
                          <i className="fa-solid fa-industry"></i>
                          <span className="text">Industries</span>
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/dashboard/services"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/services">
                          <i className="fa-solid fa-briefcase"></i>
                          <span className="text">Services</span>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/dashboard/users"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/portfolio">
                          <i className="fa-brands fa-product-hunt"></i>
                          <span className="text">Portfolio</span>
                        </Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/dashboard/techstack"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/technologies">
                          <i className="fa-brands fa-slack"></i>
                          <span className="text">Technologies</span>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/dashboard/portimage"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/portimage">
                          <i className="fa-solid fa-image"></i>
                          <span className="text">Portfolio Image</span>
                        </Link>
                      </li>
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <ul className="side-menu">
              <li>
                <Link to="/settings">
                  <i className="fa-solid fa-gear"></i>
                  <span className="text">Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="logout">
                  <i className="fa-solid fa-arrow-left"></i>
                  <span className="text">Logout</span>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="brand">
              <i className="fa-brands fa-squarespace"></i>
            </Link>
            <ul className="side-menu top">
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <Link to="/dashboard">
                  <i className="fa-solid fa-layer-group"></i>
                </Link>
              </li>
              <li className={location.pathname === "#" ? "active" : ""}>
                <div className="dropdown" onClick={handleDropdownClick}>
                  <Link to="#">
                    <i className="fa-solid fa-folder-open"></i>
                  </Link>
                  {dropdownOpen && (
                    <div className="dropdown-container">
                      <Link to="/dashboard/users">
                        <i className="fa-solid fa-users"></i>
                      </Link>
                      <Link to="/dashboard/industries">
                        <i className="fa-solid fa-industry"></i>
                      </Link>
                      <Link to="/dashboard/services">
                        <i className="fa-solid fa-briefcase"></i>
                      </Link>
                      <Link to="/dashboard/portfolio">
                        <i className="fa-brands fa-product-hunt"></i>
                      </Link>
                      <Link to="/dashboard/technologies">
                        <i className="fa-brands fa-slack"></i>
                      </Link>
                      <Link to="/dashboard/portimage">
                        <i className="fa-solid fa-image"></i>
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <ul className="side-menu">
              <li>
                <Link to="/settings">
                  <i className="fa-solid fa-gear"></i>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="logout">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </li>
            </ul>
          </>
        )}
      </section>
      {/* <Outlet /> */}
    </>
  );
};
export default Sidebar;
