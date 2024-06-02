import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { DeleteModal } from "./layout/Modal";

import { toast } from "react-toastify";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const TechStack = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { technology, setTechnology } = useValudasData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [techStackId, setTechStackId] = useState(null);
  const [insertTechStack, setInsertTechStack] = useState({
    technology_name: "",
  });
  const [updatetTechStack, setUpdateTechStack] = useState({
    technology_name: "",
  });

  // inserting tech stack data
  const InsertData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/poststack`, insertTechStack);
      if (response.status === 200) {
        const response = await axios.get(`${API}/getstack`);
        const finelData = response.data;
        setTechnology(finelData);
        setInsertTechStack({
          technology_name: "",
        });
        toast.success("insertd successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // insert input handler
  const inserHandler = async (e) => {
    const { name, value } = e.target;

    setInsertTechStack({
      ...insertTechStack,
      [name]: value,
    });
  };

  // update data
  const UpdateData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API}/updatestack/${updatetTechStack.id}`,
        updatetTechStack
      );
      if (response.status === 200) {
        const response = await axios.get(`${API}/getstack`);
        const refreshData = await response.data;
        setTechnology(refreshData);
        closeEditModal();
        setUpdateTechStack({
          technology_name: "",
        });
        toast.success("updated successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // update input handler
  const updateHandler = (e) => {
    const { name, value } = e.target;
    setUpdateTechStack({
      ...updatetTechStack,
      [name]: value,
    });
  };

  // open update modal
  const openEditModal = (techStack) => {
    setEditModalOpen(true);
    console.log(techStack.id);
    setUpdateTechStack({
      id: techStack.id,
      technology_name: techStack.technology_name,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // delete Techstack
  const deleteStack = async () => {
    try {
      const response = await axios.delete(`${API}/deletestack/${techStackId}`);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getstack`);
        const finelData = response.data;
        setTechnology(finelData);
        closeDeleteModal();
        toast.success("deleted successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // open Delete modal
  const openDeleteModal = (techStackId) => {
    setDeleteModalOpen(true);
    setTechStackId(techStackId);
  };
  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTechStackId(null);
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
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteStack}
        itemId={techStackId}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="adminleft">
              <h1>Technology Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Technology Data</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Technology Name</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {technology && technology.length > 0 ? (
                    technology.map((tech, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{tech.technology_name}</p>
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
                                onClick={() => openDeleteModal(tech.id)}
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
                                onClick={() => openEditModal(tech)}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ color: "red" }}>
                        No portfolio data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Insert Technology</h3>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  onSubmit={InsertData}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="technology_name" className="form-label">
                      Technology Name
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertTechStack.technology_name}
                      id="technology_name"
                      onChange={inserHandler}
                      name="technology_name"
                      placeholder="Enter Technology name Here"
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

      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "15rem",
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
                {/* <X /> */}
              </button>
            </div>

            <div>
              <p>Update Technology</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                onSubmit={UpdateData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="technology_name" className="form-label">
                    Technology Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updatetTechStack.technology_name}
                    id="technology_name"
                    onChange={updateHandler}
                    name="technology_name"
                    placeholder="Enter Technology name Here"
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
                    onClick={closeEditModal}
                  >
                    CANCEL
                  </button>
                  <button
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

export default TechStack;
