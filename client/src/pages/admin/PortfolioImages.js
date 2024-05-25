import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteModal } from "./layout/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

const PortImages = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { portImages, setPortImages } = useValudasData();
  const [imageId, setImageId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // delete photos
  const deletephoto = async () => {
    console.log(imageId);
    try {
      const response = await axios.delete(`${API}/deletephotos/${imageId}`);

      console.log(imageId, 36);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getphotos`);
        const finelData = response.data;
        setPortImages(finelData);
        closeDeleteModal();
        toast.success("Portfolio Image Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // open Delete modal
  const openDeleteModal = (imageId) => {
    setDeleteModalOpen(true);
    setImageId(imageId);
    console.log(imageId);
  };

  // close Delete modal
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
        onDelete={deletephoto}
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
                    <th>portfolio Image</th>
                    <th>Portfolio id</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {portImages &&
                    portImages.map((image, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{image.portfolio_photo}</p>
                            </td>
                            <td>
                              <p>{image.port_id}</p>
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
                                // onClick={() => openEditModal(industry)}
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

            <div className="todo">
              <div className="head">
                <h3>Insert Industry</h3>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  // onSubmit={insertIndustry}
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
                      type="file"
                      className="form-control"
                      // value={insertIndustryData.industry_name}
                      id="industry_name"
                      // onChange={insertInputHandler}
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
    </>
  );
};

export default PortImages;
