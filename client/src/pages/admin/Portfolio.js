import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { DeleteModal, PhotosGallery } from "./layout/Modal";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openPhotoGallary, setOpenPhotoGallery] = useState(false);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [PortfolioId, setPortfolioId] = useState(null);
  const {
    portfolio,
    setPortfolio,
    industries = [],
    serviceTechnology = [],
    portImages = [],
  } = useValudasData();

  const openInsertModal = () => setInsertModalOpen(true);
  const closeInsertModal = () => setInsertModalOpen(false);
  const closeUpdateModal = () => setUpdateModalOpen(false);
  const toggleSidebar = () => setSidebarHidden(!sidebarHidden);
  const openGalleryModal = () => setOpenPhotoGallery(true);
  const closeGalleryModal = () => setOpenPhotoGallery(false);

  const handleImageClick = (imageURL, imageId) => {
    setSelectedImage(imageURL);
    setInsertPortfolio((prevState) => ({
      ...prevState,
      portfolio_photos: imageId,
    }));
    setUpdatePortfolio((prevState) => ({
      ...prevState,
      portfolio_photos: imageId,
    }));
    closeGalleryModal();
  };

  const [insertPortfolio, setInsertPortfolio] = useState({
    thumbnail: null,
    title: "",
    short_description: "",
    company_name: "",
    portfolio_photos: "",
    service_id: "",
    industry_id: "",
  });

  const [updatePortfolio, setUpdatePortfolio] = useState({
    thumbnail: null,
    title: "",
    short_description: "",
    company_name: "",
    portfolio_photos: "",
    service_id: "",
    industry_id: "",
  });

  // insertig data
  const insertData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", insertPortfolio.thumbnail);
    formData.append("title", insertPortfolio.title);
    formData.append("short_description", insertPortfolio.short_description);
    formData.append("company_name", insertPortfolio.company_name);
    formData.append("portfolio_photos", insertPortfolio.portfolio_photos);
    formData.append("service_id", insertPortfolio.service_id);
    formData.append("industry_id", insertPortfolio.industry_id);

    console.log("Form Data:", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(`${API}/insertportfolio`, formData);

      console.log(response.data);
      if (response.status === 200) {
        const portfolioResponse = await axios.get(`${API}/getportfolio`);
        setPortfolio(portfolioResponse.data);
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
        console.error("Error inserting new portfolio");
        toast.error("Portfolio insertion failed due to some reason");
      }
    } catch (error) {
      console.error("Portfolio Insert Error", error.message);
      toast.error("Portfolio insertion failed due to some error");
    }
  };

  // insert handler
  const handleInputChange = (e, setState) => {
    const { name, value, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // delete portfolio
  const deletePortfolio = async () => {
    try {
      const response = await axios.delete(
        `${API}/deleteportfolio/${PortfolioId}`
      );
      if (response.status === 200) {
        const response = await axios.get(`${API}/getportfolio`);
        const finelData = response.data;
        setPortfolio(finelData);
        closeDeleteModal();
        toast.success("Portfolio Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Open Delete modal
  const openDeleteModal = (PortfolioId) => {
    setDeleteModalOpen(true);
    setPortfolioId(PortfolioId);
  };

  // Close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPortfolioId(null);
  };

  // upadate portfolio data
  const updateData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", updatePortfolio.thumbnail);
    formData.append("title", updatePortfolio.title);
    formData.append("short_description", updatePortfolio.short_description);
    formData.append("company_name", updatePortfolio.company_name);
    formData.append("portfolio_photos", updatePortfolio.portfolio_photos);
    formData.append("service_id", updatePortfolio.service_id);
    formData.append("industry_id", updatePortfolio.industry_id);

    try {
      const response = await axios.put(
        `${API}/updateportfolio/${updatePortfolio.id}`,
        formData
      );
      if (response.status === 200) {
        const response = await axios.get(`${API}/getportfolio`);
        const finelData = response.data;
        setPortfolio(finelData);
        setUpdatePortfolio({
          thumbnail: "",
          title: "",
          short_description: "",
          company_name: "",
          portfolio_photos: "",
          service_id: "",
          industry_id: "",
        });
        closeUpdateModal();
        toast.success("data updated Success fully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // update modal
  const openUpdateModal = (portfolio) => {
    setUpdateModalOpen(true);
    setUpdatePortfolio({
      thumbnail: portfolio.thumbnail,
      title: portfolio.title,
      short_description: portfolio.short_description,
      company_name: portfolio.company_name,
      portfolio_photos: portfolio.portfolio_photos,
      service_id: portfolio.service_id,
      industry_id: portfolio.industry_id,
      id: portfolio.id,
    });
  };

  // darkmode handler
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
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deletePortfolio}
        itemId={PortfolioId}
      />
      <PhotosGallery
        isGalleryOpen={openPhotoGallary}
        onGalleryClose={closeGalleryModal}
        onSelectImage={handleImageClick}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="adminleft">
              <h1>Portfolio Page</h1>
            </div>
            <NavLink className="btn-download" onClick={openInsertModal}>
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
                    <th>Company name</th>
                    <th>Portfolio</th>
                    <th>Service</th>
                    <th>Industry</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio && portfolio.length > 0 ? (
                    portfolio.map((port, index) => {
                      const industry =
                        industries &&
                        industries.find(
                          (industry) => industry.id === port.industry_id
                        );
                      const service =
                        serviceTechnology &&
                        serviceTechnology.find(
                          (service) => service.service_id === port.service_id
                        );
                      const portImage =
                        portImages &&
                        portImages.find(
                          (portImage) => portImage.id === port.portfolio_photos
                        );
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={`/upload/${port.thumbnail}`}
                              alt="thumbnail"
                              style={{
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "0",
                              }}
                            />
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
                            {portImage ? (
                              <img
                                src={`/upload/${portImage.portfolio_photo}`}
                                alt="portfolio_img"
                                style={{
                                  width: "4rem",
                                  height: "4rem",
                                  borderRadius: "0",
                                }}
                              />
                            ) : (
                              "No image"
                            )}
                          </td>
                          <td>
                            <p>{service ? service.service_name : "unknown"}</p>
                          </td>
                          <td>
                            <p>
                              {industry ? industry.industry_name : "unknown"}
                            </p>
                          </td>
                          <td>
                            <button
                              style={{
                                fontSize: "1.2rem",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#FD7238",
                                padding: "0.5rem",
                                cursor: "pointer",
                              }}
                              onClick={() => openDeleteModal(port.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                            <button
                              style={{
                                fontSize: "1.2rem",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#52a01f",
                                padding: "0.5rem",
                                cursor: "pointer",
                              }}
                              onClick={() => openUpdateModal(port)}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ color: "red" }}>
                        No portfolio data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>

      {/* insert modal */}
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
          overflowY: "auto",
          overflowX: "hidden",
          left: "480px",
          width: "35%",
          height: "30rem",
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
            {/* <X /> */}
          </button>

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
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail Photo
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="file"
                className="form-control"
                id="thumbnail"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
                name="thumbnail"
                placeholder="Enter Industry name Here"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title" className="form-label">
                Portfolio Title
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={insertPortfolio.title}
                id="title"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
                name="title"
                placeholder="Enter Portfolio Title Here"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="short_description " className="form-label">
                Short Description
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={insertPortfolio.short_description}
                id="short_description"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
                name="short_description"
                placeholder="Enter Short Description Here"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="company_name " className="form-label">
                Company Name
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={insertPortfolio.company_name}
                id="company_name"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
                name="company_name"
                placeholder="Enter Company Name Here"
              />
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="portfolio_photos" className="form-label">
                Choose Portfolio Image
              </label>
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
                onClick={openGalleryModal}
              >
                Choose Portfolio Image
              </button>
              {selectedImage && (
                <img
                  src={`/upload/${selectedImage}`}
                  alt="Selected Portfolio"
                  style={{ width: "15rem", marginTop: "10px" }}
                />
              )}
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="service_id" className="form-label">
                Choose Service
              </label>
              <select
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={insertPortfolio.service_id}
                id="service_id"
                name="service_id"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
              >
                <option value="">Select Service</option>
                {serviceTechnology &&
                  serviceTechnology.map((service) => {
                    return (
                      <option key={service.id} value={service.service_id}>
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
              <label htmlFor="industry_id" className="form-label">
                Choose Industry
              </label>
              <select
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={insertPortfolio.industry_id}
                id="industry_id"
                name="industry_id"
                onChange={(e) => handleInputChange(e, setInsertPortfolio)}
              >
                <option value="">Select Industry</option>
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
      {/* insert modal */}

      {/* update modal */}
      <div
        style={{
          display: updateModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflowY: "auto",
          overflowX: "hidden",
          left: "480px",
          width: "35%",
          height: "35rem",
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
            onClick={closeUpdateModal}
          >
            {/* <X /> */}
          </button>

          <h2>Update Portfolio</h2>
          <br />
          <form
            method="post"
            encType="multipart/form-data"
            name="edit form"
            onSubmit={updateData}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail Photo
              </label>
              <input
                style={{ fontSize: "15px" }}
                type="file"
                className="form-control"
                id="thumbnail"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
                name="thumbnail"
                placeholder="Enter Industry name Here"
              />
              <img
                src={`/upload/${updatePortfolio.thumbnail}`}
                alt="thumbnail"
                style={{ width: "15rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title" className="form-label">
                Portfolio Title
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={updatePortfolio.title}
                id="title"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
                name="title"
                placeholder="Enter Portfolio Title Here"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="short_description " className="form-label">
                Short Description
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={updatePortfolio.short_description}
                id="short_description"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
                name="short_description"
                placeholder="Enter Short Description Here"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="company_name " className="form-label">
                Company Name
              </label>
              <input
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={updatePortfolio.company_name}
                id="company_name"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
                name="company_name"
                placeholder="Enter Company Name Here"
              />
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="portfolio_photos" className="form-label">
                Update Portfolio Image
              </label>
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
                onClick={openGalleryModal}
              >
                Update Portfolio Image
              </button>
              {selectedImage && (
                <img
                  src={`/upload/${selectedImage}`}
                  alt="Selected Portfolio"
                  style={{ width: "15rem", marginTop: "10px" }}
                />
              )}
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="service_id" className="form-label">
                Choose Service
              </label>
              <select
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={updatePortfolio.service_id}
                id="service_id"
                name="service_id"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
              >
                <option value="">Select Service</option>
                {serviceTechnology &&
                  serviceTechnology.map((service) => {
                    return (
                      <option key={service.id} value={service.service_id}>
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
              <label htmlFor="industry_id" className="form-label">
                Choose Industry
              </label>
              <select
                style={{ padding: "12px 5px", fontSize: "15px" }}
                type="text"
                className="form-control"
                value={updatePortfolio.industry_id}
                id="industry_id"
                name="industry_id"
                onChange={(e) => handleInputChange(e, setUpdatePortfolio)}
              >
                <option value="">Select Industry</option>
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
                onClick={closeUpdateModal}
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
      {/* update modal */}
    </>
  );
};

export default Portfolio;
