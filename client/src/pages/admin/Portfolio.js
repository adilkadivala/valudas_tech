import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";

const Portfolio = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { portfolio, setPortfolio } = useValudasData();

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
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Portfolio Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Short description</th>
                    <th>Company name Name</th>
                    <th>Portfolio</th>
                    <th>Service</th>
                    <th>Industry</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio &&
                    portfolio.map((port, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{port.thumbnail}</p>
                            </td>
                            <td>
                              <p>{port.title}</p>
                            </td>
                            <td>
                              <p>{port.short_description}</p>
                            </td>
                            <td>
                              <p>{port.company_name}</p>
                            </td>
                            <td>
                              <p>{port.portfolio_photos}</p>
                            </td>
                            <td>
                              <p>{port.service_id}</p>
                            </td>
                            <td>
                              <p>{port.industry_id}</p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Portfolio;
