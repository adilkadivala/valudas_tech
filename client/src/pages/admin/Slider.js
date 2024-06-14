import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { DeleteModal } from "./layout/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const Slider = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { slider, setSlider } = useValudasData();
  const [sliderId, setSliderId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertSliderImg, setInsertSliderImg] = useState({
    image: null,
  });

  const [updateSliderImg, setUpdateSliderImg] = useState({
    image: null,
  });

  // Inserting data in photos
  const insertPhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", insertSliderImg.image);

    try {
      const response = await axios.post(`${API}/setslider`, formData);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getslider`);
        const finalData = response.data;
        setSlider(finalData);
        setInsertSliderImg(null);
        toast.success("Photos Inserted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // updating data in photos
  const updatePhotos = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", updateSliderImg.image);

    try {
      const response = await axios.put(
        `${API}/updateslider/${updateSliderImg.id}`,
        formData
      );

      if (response.status === 200) {
        const response = await axios.get(`${API}/getslider`);
        const finalData = response.data;
        setSlider(finalData);
        setUpdateSliderImg({
          image: null,
        });
        closeEditModal();
        toast.success("image updated successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //  input handler
  const handleInputChange = (e, setState) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // open update modal
  const openEditModal = (slider) => {
    setEditModalOpen(true);
    setUpdateSliderImg({
      id: slider.id,
      image: slider.image,
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
      const response = await axios.delete(`${API}/deleteslider/${sliderId}`);
      if (response.status === 200) {
        const response = await axios.get(`${API}/getslider`);
        const finalData = response.data;
        setSlider(finalData);
        closeDeleteModal();
        toast.success("Portfolio Image Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Open Delete modal
  const openDeleteModal = (sliderId) => {
    setDeleteModalOpen(true);
    setSliderId(sliderId);
  };

  // Close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSliderId(null);
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
        itemId={sliderId}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="adminleft">
              <h1>Portfolio Images</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Images </h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Slider Image</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {slider && slider.length > 0 ? (
                    slider.map((image, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={`/upload/${image.image}`}
                              alt="slider"
                              style={{
                                width: "2rem",
                                borderRadius: "0",
                                height: "2rem",
                              }}
                            />
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
                              onClick={() => openDeleteModal(image.id)}
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
                              onClick={() => openEditModal(image)}
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

            <div className="todo">
              <div className="head">
                <h3>Insert Slider</h3>
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
                    <label htmlFor="image" className="form-label">
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
                      id="image"
                      onChange={(e) => handleInputChange(e, setInsertSliderImg)}
                      name="image"
                      placeholder="Enter sldier Image Here"
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
                        backgroundColor: "#52a01f",
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
                        backgroundColor: "#fd7238",
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
                  backgroundColor: "#fd7238",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  cursor: "pointer",
                  padding: "7px 10px",
                  right: "0",
                  borderRadius: "0 0 0 0.2rem",
                }}
                onClick={closeEditModal}
              >
                <i className="fa-solid fa-xmark"></i>
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
                  <label htmlFor="image" className="form-label">
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
                    id="image"
                    onChange={(e) => handleInputChange(e, setUpdateSliderImg)}
                    name="image"
                    placeholder="Enter sldier Image Here"
                  />
                  <img
                    src={`/upload/${updateSliderImg.image}`}
                    alt="slider"
                    style={{ width: "10rem" }}
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
                      backgroundColor: "#52a01f",
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
                      backgroundColor: "#fd7238",
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

export default Slider;
