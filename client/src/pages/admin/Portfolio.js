import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Portfolio = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { portfolio, setPortfolio } = useValudasData();
  const [insertModalOpen, setInsertModalOpen] = useState(false);

  // insert modal
  const openInsertModal = () => {
    setInsertModalOpen(true);
  };
  // closing insert modal
  const closeInsertModal = () => {
    setInsertModalOpen(false);
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
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Portfolio Page</h1>
            </div>
            <NavLink className="btn-download" onClick={openInsertModal}>
              <Plus />
              <span className="text">Add New</span>
            </NavLink>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Portfolio data</h3>
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
                    <th>Operation</th>
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
                            <td>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#FD7238",
                                  marginLeft: "0.5rem",
                                  cursor: "pointer",
                                }}
                                // onClick={() => openDeleteModal(port.id)}
                              >
                                <Trash2 />
                              </button>

                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#3C91E6",
                                  cursor: "pointer",
                                }}
                                // onClick={() => openEditModal(port)}
                              >
                                <Pencil />
                              </button>
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

      {/* insert Modal */}

      <div
        style={{
          display: insertModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflow: "hidden",
          left: "480px",
          width: "35%",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: "15px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <button
                type="button"
                style={{
                  backgroundColor: "#db504a",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  cursor: "pointer",
                  padding: "7px 10px",
                  right: "0",
                }}
                onClick={closeInsertModal}
              >
                <X />
              </button>
            </div>

            <div>
              <h2>Insert Portfolio</h2>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                // onSubmit={updateIndustry}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    // value={editIndustryData.industry_name}
                    id="industry_name"
                    // onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#3c91e6",
                      border: "none",
                      color: "#FFF",
                      marginRight: "5px",
                      padding: "7px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onClick={closeInsertModal}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                    // onClick={updateIndustry}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* insert Modal */}
    </>
  );
};

export default Portfolio;
