import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Pencil, Trash2, X } from "lucide-react";
import { DeleteModal } from "./layout/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const PortImages = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { portImages, setPortImages, portfolio } = useValudasData();
  const [imageId, setImageId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertPortImg, setInsertPortImg] = useState({
    portfolio_photo: null,
    port_id: "",
  });

  const [updatePortImg, setUpdatePortImg] = useState({
    portfolio_photo: null,
    port_id: "",
  });

  // Inserting data in photos
  const insertPhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("portfolio_photo", insertPortImg.portfolio_photo);
    formData.append("port_id", insertPortImg.port_id);

    try {
      const response = await axios.post(`${API}/insertphotos`, formData);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getphotos`);
        const finalData = response.data;
        setPortImages(finalData);
        setInsertPortImg({
          portfolio_photo: "",
          port_id: "",
        });
        toast.success("Photos Inserted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Insert input handler
  const insertHandler = (e) => {
    const { name, value, files } = e.target;
    setInsertPortImg({
      ...insertPortImg,
      [name]: name === "portfolio_photo" ? files[0] : value,
    });
  };

  // updating data in photos
  const updatePhotos = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("portfolio_photo", updatePortImg.portfolio_photo);
    formData.append("port_id", updatePortImg.port_id);
    try {
      const response = await axios.put(
        `${API}/updatephotos/${updatePortImg.id}`,
        formData
      );

      if (response.status === 200) {
        const response = await axios.get(`${API}/getphotos`);
        const finelData = response.data;
        setPortImages(finelData);
        setUpdatePortImg({
          portfolio_photo: "",
          port_id: "",
        });
        closeEditModal();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Update input handler
  const updateHandler = (e) => {
    const { name, value, files } = e.target;
    setUpdatePortImg({
      ...updatePortImg,
      [name]: name === "portfolio_photo" ? files[0] : value,
    });
  };

  // open update modal
  const openEditModal = (port) => {
    setEditModalOpen(true);
    setUpdatePortImg({
      id: port.id,
      portfolio_photo: port.portfolio_photo,
      port_id: port.port_id,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // Delete photos
  const deletePhoto = async () => {
    try {
      const response = await axios.delete(`${API}/deletephotos/${imageId}`);
      if (response.status === 200) {
        const response = await axios.get(`${API}/getphotos`);
        const finalData = response.data;
        setPortImages(finalData);
        closeDeleteModal();
        toast.success("Portfolio Image Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Open Delete modal
  const openDeleteModal = (imageId) => {
    setDeleteModalOpen(true);
    setImageId(imageId);
  };

  // Close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setImageId(null);
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
        onDelete={deletePhoto}
        itemId={imageId}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Services Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Portfolio Image</th>
                    <th>Portfolio ID</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {portImages && portImages.length > 0 ? (
                    portImages.map((image, index) => {
                      const portfolioData = portfolio.find(
                        (port_data) => port_data.id === image.port_id
                      );
                      return (
                        <tr key={index}>
                          <td>
                            <p>{`/public/upload/${image.portfolio_photo}`}</p>
                          </td>
                          <td>
                            <p>
                              {portfolioData ? portfolioData.title : "unknown"}
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
                              onClick={() => openDeleteModal(image.id)}
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
                              onClick={() => openEditModal(image)}
                            >
                              <Pencil />
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

            <div className="todo">
              <div className="head">
                <h3>Insert Industry</h3>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  onSubmit={insertPhoto}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="portfolio_photo" className="form-label">
                      Drop Image
                    </label>
                    <input
                      style={{
                        padding: "4rem 18px",
                        fontSize: "15px",
                        border: "1px solid #000",
                        width: "50%",
                        backgroundColor: "gainsboro",
                      }}
                      type="file"
                      className="form-control"
                      id="portfolio_photo"
                      onChange={insertHandler}
                      name="portfolio_photo"
                      placeholder="Enter Industry name Here"
                    />
                  </div>

                  <div
                    className="mb-3"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="port_id" className="form-label">
                      Choose Portfolio
                    </label>
                    <select
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      className="form-control"
                      value={insertPortImg.port_id}
                      id="port_id"
                      name="port_id"
                      onChange={insertHandler}
                      placeholder="Select Portfolio Here"
                    >
                      <option value="">Select Portfolio</option>
                      {portfolio &&
                        portfolio.map((port) => {
                          return (
                            <option key={port.id} value={port.id}>
                              {port.title}
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
        </main>
      </section>

      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "10rem",
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
                onClick={closeEditModal}
              >
                <X />
              </button>
            </div>

            <div>
              <p>Update Portfolio Image</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                onSubmit={updatePhotos}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="portfolio_photo" className="form-label">
                    Drop Image
                  </label>
                  <input
                    style={{
                      padding: "4rem 18px",
                      fontSize: "15px",
                      border: "1px solid #000",
                      width: "50%",
                      backgroundColor: "gainsboro",
                    }}
                    type="file"
                    className="form-control"
                    id="portfolio_photo"
                    onChange={updateHandler}
                    name="portfolio_photo"
                    placeholder="Enter Industry name Here"
                  />
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="port_id" className="form-label">
                    Choose Portfolio
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    className="form-control"
                    value={updatePortImg.port_id}
                    id="port_id"
                    name="port_id"
                    onChange={updateHandler}
                    placeholder="Select Portfolio Here"
                  >
                    <option value="">Select Portfolio</option>
                    {portfolio &&
                      portfolio.map((port) => {
                        return (
                          <option key={port.id} value={port.id}>
                            {port.title}
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
                    onClick={closeEditModal}
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
    </>
  );
};

export default PortImages;
