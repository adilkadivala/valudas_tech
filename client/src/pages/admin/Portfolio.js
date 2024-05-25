import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const {
    portfolio,
    setPortfolio,
    industries,
    setIndustries,
    services,
    setServices,
  } = useValudasData();
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [insertPortfolio, setInsertPortfolio] = useState({
    thumbnail: null,
    title: "",
    short_description: "",
    company_name: "",
    portfolio_photos: null,
    service_id: "",
    industry_id: "",
  });

  // insert portfolio data
  const insertData = async () => {
    try {
      const response = await axios.post(
        `${API}/insertportfolio`,
        insertPortfolio
      );

      if (response.status === 200) {
        const response = axios.get(`${API}/getportfolio`);
        const finelData = response.data;
        setPortfolio(finelData);
        setInsertPortfolio({
          thumbnail: null,
          title: "",
          short_description: "",
          company_name: "",
          portfolio_photos: null,
          service_id: "",
          industry_id: "",
        });
        closeInsertModal();
        toast.success("Portfolio Inserted successfully");
      } else {
        console.error("error form inserting new industry");
        toast.error("industry failed due to some reason");
      }
    } catch (error) {
      console.error("Skill Update", error.message);
    }
  };

  // insert input handler
  const insertInputhandler = (e) => {
    if (e.target.name === "thumbnail") {
      setInsertPortfolio({
        ...insertPortfolio,
        thumbnail: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;
      setInsertPortfolio({
        ...insertPortfolio,
        [name]: value,
      });
    }
  };

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
                      const industry = industries.find(
                        (industry) => industry.id === portfolio.industry_id
                      );
                      const service = services.find(
                        (service) => service.id === portfolio.service_id
                      );
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
                              <p>
                                {service ? service.service_name : "unknown"}
                              </p>
                            </td>
                            <td>
                              <p>
                                {industry ? industry.industry_name : "unknow"}
                              </p>
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
                onSubmit={insertData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="thumbnail " className="form-label">
                    Thumbnail Photo
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="thumbnail "
                    onChange={insertInputhandler}
                    name="thumbnail "
                    placeholder="Enter Industry name Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="title " className="form-label">
                    Portfolio Title
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertPortfolio.title}
                    id="title "
                    onChange={insertInputhandler}
                    name="title"
                    placeholder="Enter Portfolio Title Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="short_description " className="form-label">
                    short_description
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertPortfolio.short_description}
                    id="short_description"
                    onChange={insertInputhandler}
                    name="short_description"
                    placeholder="Enter short_description Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="company_name " className="form-label">
                    company_name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertPortfolio.company_name}
                    id="company_name"
                    onChange={insertInputhandler}
                    name="company_name"
                    placeholder="Enter company_name Here"
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="portfolio_photos " className="form-label">
                    portfolio_photos
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="portfolio_photos"
                    onChange={insertInputhandler}
                    name="portfolio_photos"
                    placeholder="Enter portfolio_photos  Here"
                  />
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="service_id" className="form-label">
                    Choose service
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertPortfolio.service_id}
                    id="service_id"
                    name="service_id"
                    onChange={insertInputhandler}
                    placeholder="Enter City name Here"
                  >
                    <option value="">Select service</option>

                    {services &&
                      services.map((service) => {
                        return (
                          <option key={service.id} value={service.id}>
                            {service.service_name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="service_id" className="form-label">
                    Choose Industry
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertPortfolio.service_id}
                    id="service_id"
                    name="service_id"
                    onChange={insertInputhandler}
                    placeholder="Enter City name Here"
                  >
                    <option value="">Select service</option>

                    {industries &&
                      industries.map((industry) => {
                        return (
                          <option key={industry.id} value={industry.id}>
                            {industry.industry_name}
                          </option>
                        );
                      })}
                  </select>
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
