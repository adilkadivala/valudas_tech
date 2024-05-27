import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { NavLink } from "react-router-dom";
import { PhotosGallery } from "./layout/Modal";
import {
  CalendarDays,
  UsersRound,
  CircleDollarSign,
  CloudDownload,
  Search,
  EllipsisVertical,
  ListFilter,
  Plus,
} from "lucide-react";
import "../../assets/css/admin/main.css";

const Main = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [openPhotoGallary, setOpenPhotoGallery] = useState(false);

  // open Delete modal
  const openGalleryModal = () => {
    setOpenPhotoGallery(true);
  };

  // close Delete modal
  const closeGalleryModal = () => {
    setOpenPhotoGallery(false);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Sidebar isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <PhotosGallery
        isGalleryOpen={openPhotoGallary}
        onGalleryClose={closeGalleryModal}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <NavLink className="active" to="/">
                    Home
                  </NavLink>
                </li>
              </ul>
            </div>
            <button
              className="btn-download"
              style={{
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={openGalleryModal}
            >
              <CloudDownload />
              <span className="text">Open Gallery</span>
            </button>
          </div>

          <ul className="box-info">
            <li>
              <CalendarDays />
              <span className="text">
                <h3>1020</h3>
                <p>New Order</p>
              </span>
            </li>
            <li>
              <UsersRound />
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <CircleDollarSign />
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <Search />
                <ListFilter />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={require("../../assets/images/people.png")}
                        alt="user"
                      />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={require("../../assets/images/people.png")}
                        alt="user"
                      />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={require("../../assets/images/people.png")}
                        alt="user"
                      />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={require("../../assets/images/people.png")}
                        alt="user"
                      />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={require("../../assets/images/people.png")}
                        alt="user"
                      />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <Plus />
                <ListFilter />
              </div>
              <ul className="todo-list">
                <li className="completed">
                  <p>Todo List</p>
                  <EllipsisVertical />
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <EllipsisVertical />
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <EllipsisVertical />
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <EllipsisVertical />
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <EllipsisVertical />
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Main;
