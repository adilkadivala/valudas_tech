import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/admin/sidebar.css";
import {
  DatabaseZap,
  LayoutDashboard,
  FileInput,
  ChevronUp,
  ChevronDown,
  Users,
  LandPlot,
  BookUser,
  Cpu,
  ShowerHead,
  ArrowLeftFromLine,
  Cog,
  Images,
} from "lucide-react";
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
              <DatabaseZap />
              <span className="text">AdminHub</span>
            </Link>
            <ul className="side-menu top">
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <Link to="/dashboard">
                  <LayoutDashboard />
                  <span className="text">Dashboard</span>
                </Link>
              </li>
              <li className={location.pathname === "#" ? "active" : ""}>
                <div className="dropdown" onClick={handleDropdownClick}>
                  <Link to="#">
                    <FileInput />
                    <span className="text">Pages</span>

                    {dropdownOpen ? <ChevronUp /> : <ChevronDown />}
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
                          <Users />
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
                          <LandPlot />
                          <span className="text">Industries</span>
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
                          <BookUser />
                          <span className="text">Portfolio</span>
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
                          <ShowerHead />
                          <span className="text">Services</span>
                        </Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/dashboard/techstack"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/dashboard/techstack">
                          <Cpu />
                          <span className="text">Tech_stack</span>
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
                          <Images />
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
                  <Cog />
                  <span className="text">Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="logout">
                  <ArrowLeftFromLine />
                  <span className="text">Logout</span>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="brand">
              <DatabaseZap />
            </Link>
            <ul className="side-menu top">
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <Link to="/dashboard">
                  <LayoutDashboard />
                </Link>
              </li>
              <li className={location.pathname === "#" ? "active" : ""}>
                <div className="dropdown" onClick={handleDropdownClick}>
                  <Link to="#">
                    <FileInput />
                  </Link>
                  {dropdownOpen && (
                    <div className="dropdown-container">
                      <Link to="/dashboard/users">
                        <Users />
                      </Link>
                      <Link to="/dashboard/industries">
                        <LandPlot />
                      </Link>
                      <Link to="/dashboard/portfolio">
                        <BookUser />
                      </Link>
                      <Link to="/dashboard/services">
                        <ShowerHead />
                      </Link>
                      <Link to="/dashboard/techstack">
                        <Cpu />
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <ul className="side-menu">
              <li>
                <Link to="/settings">
                  <Cog />
                </Link>
              </li>
              <li>
                <Link to="/logout" className="logout">
                  <ArrowLeftFromLine />
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
